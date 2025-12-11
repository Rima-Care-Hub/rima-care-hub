/**
 * Dashboard Page
 * Protected page showing user info and logout functionality
 */

import { Shield, LogOut, User, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">CareConnect</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || 'Caregiver'}!
          </h1>
          <p className="text-muted-foreground">
            Here's your dashboard overview
          </p>
        </div>

        {/* User info card */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-elegant p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {user?.name || 'User Name'}
              </h2>
              <p className="text-muted-foreground text-sm">
                {user?.email || 'user@example.com'}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize">
                {user?.role || 'caregiver'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Upcoming Shifts</span>
              </div>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Hours This Week</span>
              </div>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-elegant p-6">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">View Schedule</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Clock In</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
