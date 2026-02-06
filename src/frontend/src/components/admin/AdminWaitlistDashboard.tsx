import { useEffect, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useWaitlistQuery } from '../../hooks/useQueries';
import { useActor } from '../../hooks/useActor';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Alert, AlertDescription } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';
import { Download, LogOut, AlertCircle, RefreshCw } from 'lucide-react';
import type { UserRole } from '@/backend';

export function AdminWaitlistDashboard() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { actor } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [adminCheckError, setAdminCheckError] = useState<string | null>(null);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Only fetch waitlist when admin status is confirmed
  const { data: waitlist, isLoading, error, isFetched } = useWaitlistQuery(isAdmin === true);

  // Bootstrap admin and check admin status after authentication
  useEffect(() => {
    async function bootstrapAndCheckAdmin() {
      if (actor && isAuthenticated && !bootstrapped) {
        setCheckingAdmin(true);
        setAdminCheckError(null);
        
        try {
          // First, try to bootstrap (set first login as admin)
          // This will only succeed if no admin exists yet
          try {
            await actor.assignCallerUserRole(identity!.getPrincipal(), 'admin' as UserRole);
          } catch (err) {
            // Ignore errors - admin might already be set
            console.log('Bootstrap attempt completed (admin may already exist)');
          }

          // Now check if caller is admin
          try {
            const adminStatus = await actor.isCallerAdmin();
            setIsAdmin(adminStatus);
            setBootstrapped(true);
          } catch (checkErr) {
            console.error('Admin status check failed:', checkErr);
            setAdminCheckError(
              checkErr instanceof Error 
                ? checkErr.message 
                : 'Failed to verify admin status. Please try again.'
            );
            setIsAdmin(false);
            setBootstrapped(true);
          }
        } catch (err) {
          console.error('Error in admin bootstrap flow:', err);
          setAdminCheckError('An unexpected error occurred. Please refresh and try again.');
          setIsAdmin(false);
          setBootstrapped(true);
        } finally {
          setCheckingAdmin(false);
        }
      }
    }
    bootstrapAndCheckAdmin();
  }, [actor, isAuthenticated, bootstrapped, identity]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    setIsAdmin(null);
    setBootstrapped(false);
    setAdminCheckError(null);
    window.location.hash = '';
  };

  const handleRetryAdminCheck = () => {
    setBootstrapped(false);
    setAdminCheckError(null);
    setIsAdmin(null);
  };

  const handleDownloadCSV = () => {
    if (!waitlist || waitlist.length === 0) return;

    // Create CSV content
    const headers = ['Name', 'Email'];
    const rows = waitlist.map(entry => [entry.name, entry.email]);
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Not authenticated - show login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>
              Please log in with Internet Identity to access the waitlist dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleLogin} 
              disabled={isLoggingIn}
              className="w-full"
            >
              {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.hash = ''}
              className="w-full"
            >
              Back to Landing Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Checking admin status
  if (checkingAdmin || (isAdmin === null && !adminCheckError)) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container max-w-6xl mx-auto py-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin check failed with error
  if (adminCheckError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle size={24} />
              Verification Error
            </CardTitle>
            <CardDescription>
              Unable to verify your admin status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                {adminCheckError}
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleRetryAdminCheck}
                className="flex-1"
              >
                <RefreshCw size={16} className="mr-2" />
                Retry
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.hash = ''}
                className="flex-1"
              >
                Back to Site
              </Button>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not admin - show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle size={24} />
              Access Denied
            </CardTitle>
            <CardDescription>
              You do not have administrator privileges to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                Only administrators can access the waitlist dashboard.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => window.location.hash = ''}
                className="flex-1"
              >
                Back to Landing Page
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex-1"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin view - show dashboard
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/rashidaai-logo.dim_512x512.png" 
              alt="RashidaAi Logo" 
              className="h-8 w-8"
            />
            <h1 className="font-display text-xl font-bold gradient-text">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.hash = ''}
            >
              Back to Site
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle>Waitlist Signups</CardTitle>
                <CardDescription>
                  View and export all waitlist entries for the bootcamp
                </CardDescription>
              </div>
              <Button 
                onClick={handleDownloadCSV}
                disabled={!waitlist || waitlist.length === 0}
                className="gap-2"
              >
                <Download size={16} />
                Download CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle size={16} />
                <AlertDescription>
                  {error instanceof Error ? error.message : 'Failed to load waitlist. Please refresh the page.'}
                </AlertDescription>
              </Alert>
            )}

            {isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}

            {!isLoading && isFetched && waitlist && waitlist.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No waitlist entries yet. Signups will appear here.
                </p>
              </div>
            )}

            {!isLoading && waitlist && waitlist.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waitlist.map((entry, index) => (
                      <TableRow key={entry.email}>
                        <TableCell className="font-medium text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {entry.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {entry.email}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {!isLoading && waitlist && waitlist.length > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                Total entries: <span className="font-semibold text-foreground">{waitlist.length}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
