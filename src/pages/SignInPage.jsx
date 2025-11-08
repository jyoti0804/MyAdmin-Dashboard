import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  // Only return dashboard if signed in
  return (
    <>
      <SignedIn>
        {/* dashboard UI */}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
