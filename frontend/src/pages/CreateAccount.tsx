import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Shield, Mail, Phone, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password.length < 8) {
      toast({
        title: "Weak password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Mock registration
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Welcome to CareConnect. Your account has been created successfully.",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <Link to="/sign-in" className="text-foreground">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold">Create Account</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 pt-4">
        {/* Shield Icon */}
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <Shield className="h-10 w-10 text-primary" />
        </div>

        {/* Secure Registration Badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full bg-accent px-4 py-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Secure Registration</span>
        </div>

        <p className="mb-6 text-center text-muted-foreground">
          Join thousands of verified healthcare professionals
        </p>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe, RN"
              value={formData.fullName}
              onChange={handleChange}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nurse@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-12 pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="h-12 pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="h-12 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Must be 8+ characters with numbers and symbols
            </p>
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full h-14 text-base mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="pt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
