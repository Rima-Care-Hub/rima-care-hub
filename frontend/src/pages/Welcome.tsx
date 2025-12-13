import { Link } from "react-router-dom";
import { Heart, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      <div className="flex min-h-screen flex-col items-center justify-between px-6 py-12">
        {/* Logo/Brand Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-lg">
            <Heart className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            CareConnect
          </h1>
          <p className="mb-12 max-w-md text-lg text-muted-foreground">
            Empowering healthcare professionals to deliver exceptional care
          </p>

          {/* Features */}
          <div className="grid gap-6 w-full max-w-md mb-12">
            <div className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Secure & Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  HIPAA-compliant platform for your peace of mind
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Real-Time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Stay connected with instant shift notifications
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Verified Network</h3>
                <p className="text-sm text-muted-foreground">
                  Join thousands of trusted healthcare professionals
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-md space-y-4">
          <Link to="/signup-caregiver" className="block">
            <Button variant="gradient" size="lg" className="w-full h-14 text-base">
              Get Started
            </Button>
          </Link>
          
          <Link to="/login" className="block">
            <Button variant="outline" size="lg" className="w-full h-14 text-base">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
