// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

// export default function SignInPage() {
//   // Only return dashboard if signed in
//   return (
//     <>
//       <SignedIn>
//         {/* dashboard UI */}
//       </SignedIn>
//       <SignedOut>
//         <RedirectToSignIn />
//       </SignedOut>
//     </>
//   );
// }














// src/pages/SignInPage.jsx
import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  // Determine redirect URL based on environment
  const redirectUrl = import.meta.env.PROD
    ? "https://my-admin-dashboard-wb6u.vercel.app/" // production URL
    : "http://localhost:5173/"; // development URL

  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl={redirectUrl}
    />
  );
}
