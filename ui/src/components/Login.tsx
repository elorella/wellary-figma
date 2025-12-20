import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./ui/input-otp";
import { Card } from "./ui/card";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Logo } from "./Logo";

interface LoginProps {
  onLogin: (email: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // Mock sending code to email
    setTimeout(() => {
      setIsLoading(false);
      setStep("code");
      toast.success(`Verification code sent to ${email}`);
    }, 1000);
  };

  const handleCodeComplete = (value: string) => {
    setCode(value);
    
    if (value.length === 6) {
      // Accept any 6-digit code for now
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Login successful!");
        onLogin(email);
      }, 500);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setCode("");
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        {/* Logo/Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex mb-4">
            <Logo size="md" variant="main" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome to Wellary
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            {step === "email"
              ? "Enter your email to get started"
              : "Enter the verification code"}
          </p>
        </div>

        {/* Email Step */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 rounded-xl bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  autoFocus
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg transition-all hover:shadow-xl"
            >
              {isLoading ? "Sending code..." : "Continue"}
            </Button>
          </form>
        )}

        {/* Code Verification Step */}
        {step === "code" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-300 bg-slate-700/50 rounded-xl p-3">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Code sent to {email}</span>
              </div>

              <div className="space-y-3">
                <Label htmlFor="code" className="text-slate-300 text-center block">
                  Enter 6-digit code
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={handleCodeComplete}
                    disabled={isLoading}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot
                        index={0}
                        className="w-12 h-14 text-lg rounded-xl bg-slate-700 border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-12 h-14 text-lg rounded-xl bg-slate-700 border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-12 h-14 text-lg rounded-xl bg-slate-700 border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
                      />
                      <InputOTPSlot
                        index={3}
                        className="w-12 h-14 text-lg rounded-xl bg-slate-700 border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
                      />
                      <InputOTPSlot
                        index={4}
                        className="w-12 h-14 text-lg rounded-xl bg-slate-700 border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
                      />
                      <InputOTPSlot
                        index={5}
                        className="w-12 h-14 text-lg rounded-xl bg-slate-700 border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              {isLoading && (
                <p className="text-center text-sm text-slate-400">
                  Verifying...
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToEmail}
                className="w-full h-12 rounded-xl bg-slate-700 border border-slate-600 text-white hover:bg-slate-600 hover:text-slate-200"
                disabled={isLoading}
              >
                Use a different email
              </Button>

              <button
                type="button"
                onClick={handleEmailSubmit}
                className="w-full text-sm text-orange-400 hover:text-orange-300 transition-colors"
                disabled={isLoading}
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-slate-700 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  );
}