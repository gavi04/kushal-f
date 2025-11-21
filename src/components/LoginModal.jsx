"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "./ui/icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginModal({ open, setOpen }) {
  // const [navOpen, setNavOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();


  // Clear recaptcha on unmount and when dialog closes
 

  useEffect(() => {
    if (!open) {

      setOtpSent(false);
      setConfirmation(null);
      setContact("");
      setOtp("");
      setError("");
    }
  }, [open]);

 
  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
 

  return (
    <>
      <div id="recaptcha-container"></div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Login to your profile</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleLogin}
              disabled={loading}
            >
              <Icons.google className="mr-2 h-4" />
              Google
            </Button>
          </div>
         </DialogContent>
        </Dialog> 

    </>
  );
}