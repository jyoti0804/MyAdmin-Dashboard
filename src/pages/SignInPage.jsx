
import React, { useState } from "react";
import { SignIn } from "@clerk/clerk-react";
import { SignInSkeleton } from "../components/signInSkeleton/SignInSkeleton";

export default function SignInPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for sign-in events (use Clerk events or monkey-patch as needed)
  // Here’s a minimal concept: overlay skeleton on button click
  const handleStartSubmit = () => setIsSubmitting(true);
  const handleEndSubmit = () => setIsSubmitting(false);

  const redirectUrl = import.meta.env.PROD
    ? "https://my-admin-dashboard-wb6u.vercel.app/"
    : "http://localhost:5173/";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(243,244,246, 0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl={redirectUrl}
          appearance={{
            elements: {
              // Optional: style sign-in card itself via Clerk appearance prop
            }
          }}
          // Optionally listen for Clerk events to trigger loading state!
        />
        {isSubmitting && (
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 10,
              pointerEvents: "none" // Don't block clicks
            }}
          >
            <SignInSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
