import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let bootcampId = "fp-bootcamp-feb18-2026";

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type WaitlistEntry = {
    name : Text;
    email : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  let waitlist = Map.empty<Text, Text>();
  var userProfiles : Map.Map<Principal, UserProfile> = Map.empty<Principal, UserProfile>();

  // Waitlist functions
  public shared ({ caller }) func addToWaitlist(name : Text, email : Text) : async () {
    // Any user including guests can add to waitlist - no authorization check needed
    let normalizedEmail = email.toLower().trimEnd(#char(' ')).trimStart(#char(' '));
    switch (waitlist.get(normalizedEmail)) {
      case (null) {
        waitlist.add(normalizedEmail, name);
      };
      case (?_) {
        Runtime.trap("Email '" # normalizedEmail # "' is already in your waitlist.");
      };
    };
  };

  public query ({ caller }) func getWaitlist() : async [WaitlistEntry] {
    // Admin-only: viewing all emails is sensitive
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view the waitlist");
    };
    waitlist.entries().toArray().map(func((email, name)) { { name; email } });
  };

  // User profile functions (transient, not persistent)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
