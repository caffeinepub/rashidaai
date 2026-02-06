import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  let waitlist = Map.empty<Text, Text>();
  let bootcampId = "fp-bootcamp-feb14-2026";
  type WaitlistEntry = {
    name : Text;
    email : Text;
  };

  public shared ({ caller }) func addToWaitlist(name : Text, email : Text) : async () {
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
    waitlist.entries().toArray().map(func((email, name)) { { name; email } });
  };
};
