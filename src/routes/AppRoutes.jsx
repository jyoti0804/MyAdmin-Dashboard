// import React, { lazy, Suspense } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { SignedIn, SignedOut, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
// import { Skeleton, Box } from "@mui/material";
// import DashboardLayout from "../layouts/DashboardLayout";
// import AuthLayout from "../layouts/AuthLayout";
// import Analytics from "../pages/Analytics";
// import Reports from "../pages/Reports";
// import { SignInSkeleton }  from "../components/signInSkeleton/SignInSkeleton";


// const Dashboard = lazy(() => import("../pages/Dashboard"));
// const Users = lazy(() => import("../pages/Users"));
// const Products = lazy(() => import("../pages/Products"));
// const Orders = lazy(() => import("../pages/Orders"));
// const Roles = lazy(() => import("../pages/Roles"));
// const Settings = lazy(() => import("../pages/Settings"));
// const Notifications = lazy(() => import("../pages/Notifications"));
// const Message = lazy(() => import("../pages/Message"));
// const Support = lazy(() => import("../pages/Support"));
// const Integrations = lazy(() => import("../pages/Integrations"));
// const Calendar = lazy(() => import("../pages/Calendar"));
// const Log = lazy(() => import("../pages/Log"));
// const SignInPage = lazy(() => import("../pages/SignInPage"));
// const SignUpPage = lazy(() => import("../pages/SignUpPage"));

// export default function AppRoutes() {
//   return (
//     <>
//       {/* <ClerkLoading>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100vh", p: 4 }}>
//           <Skeleton variant="rectangular" height={40} width="40%" />
//           <Skeleton variant="rectangular" height={30} width="60%" />
//           <Skeleton variant="rectangular" height={200} width="100%" />
//           <Skeleton variant="text" width="70%" />
//           <Skeleton variant="rectangular" height={150} width="100%" />
//         </Box>
//       </ClerkLoading> */}
//       <ClerkLoaded>
//         <Suspense fallback={
//           <Box sx={{ p: 3 }}>
//             <Skeleton variant="text" width="80%" height={40} sx={{ mb: 1 }} />
//             <Skeleton variant="rectangular" height={400} sx={{ mb: 2 }} />
//             <Skeleton variant="text" width="40%" />
//             <Skeleton variant="text" width="60%" />
//             <Skeleton variant="rectangular" height={150} />
//           </Box>
//         }>
//           <SignedIn>
//             <Routes>
//               <Route element={<DashboardLayout />}>
//                 <Route index element={<Dashboard />} />
//                 <Route path="users" element={<Users />} />
//                 <Route path="products" element={<Products />} />
//                 <Route path="orders" element={<Orders />} />
//                 <Route path="roles" element={<Roles />} />
//                 <Route path="settings" element={<Settings />} />
//                 <Route path="notifications" element={<Notifications />} />
//                 <Route path="messages" element={<Message />} />
//                 <Route path="support" element={<Support />} />
//                 <Route path="integrations" element={<Integrations />} />
//                 <Route path="calendar" element={<Calendar />} />
//                 <Route path="logs" element={<Log />} />
//                 <Route path="analytics" element={<Analytics />} />
//                 <Route path="reports" element={<Reports />} />
//               </Route>
//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//           </SignedIn>
//           <SignedOut>
//             {/* <Routes>
//               <Route element={<AuthLayout />}>
//                 <Route path="sign-in" element={<SignInPage />} />
//                 <Route path="sign-up" element={<SignUpPage />} />
//               </Route>
//               <Route path="*" element={<Navigate to="/sign-in" />} />
//             </Routes> */}
//              <Suspense fallback={<SignInSkeleton />}>
//     <Routes>
//       <Route element={<AuthLayout />}>
//         <Route path="sign-in" element={<SignInPage />} />
//         <Route path="sign-up" element={<SignUpPage />} />
//       </Route>
//       <Route path="*" element={<Navigate to="/sign-in" />} />
//     </Routes>
//   </Suspense>
//           </SignedOut>
//         </Suspense>
//       </ClerkLoaded>
//     </>
//   );
// }




// import React, { lazy, Suspense } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { SignedIn, SignedOut, ClerkLoaded } from "@clerk/clerk-react";
// import { Skeleton, Box } from "@mui/material";
// import DashboardLayout from "../layouts/DashboardLayout";
// import AuthLayout from "../layouts/AuthLayout";
// import Analytics from "../pages/Analytics";
// import Reports from "../pages/Reports";
// import { SignInSkeleton } from "../components/signInSkeleton/SignInSkeleton";

// const Dashboard = lazy(() => import("../pages/Dashboard"));
// const Users = lazy(() => import("../pages/Users"));
// const Products = lazy(() => import("../pages/Products"));
// const Orders = lazy(() => import("../pages/Orders"));
// const Roles = lazy(() => import("../pages/Roles"));
// const Settings = lazy(() => import("../pages/Settings"));
// const Notifications = lazy(() => import("../pages/Notifications"));
// const Message = lazy(() => import("../pages/Message"));
// const Support = lazy(() => import("../pages/Support"));
// const Integrations = lazy(() => import("../pages/Integrations"));
// const Calendar = lazy(() => import("../pages/Calendar"));
// const Log = lazy(() => import("../pages/Log"));
// const SignInPage = lazy(() => import("../pages/SignInPage"));
// const SignUpPage = lazy(() => import("../pages/SignUpPage"));

// export default function AppRoutes() {
//   return (
//     <ClerkLoaded>
//       <Suspense
//         fallback={
//           <Box sx={{ p: 3 }}>
//             <Skeleton variant="text" width="80%" height={40} sx={{ mb: 1 }} />
//             <Skeleton variant="rectangular" height={400} sx={{ mb: 2 }} />
//             <Skeleton variant="text" width="40%" />
//             <Skeleton variant="text" width="60%" />
//             <Skeleton variant="rectangular" height={150} />
//           </Box>
//         }
//       >
//         <SignedIn>
//           <Routes>
//             <Route element={<DashboardLayout />}>
//               <Route index element={<Dashboard />} />
//               <Route path="users" element={<Users />} />
//               <Route path="products" element={<Products />} />
//               <Route path="orders" element={<Orders />} />
//               <Route path="roles" element={<Roles />} />
//               <Route path="settings" element={<Settings />} />
//               <Route path="notifications" element={<Notifications />} />
//               <Route path="messages" element={<Message />} />
//               <Route path="support" element={<Support />} />
//               <Route path="integrations" element={<Integrations />} />
//               <Route path="calendar" element={<Calendar />} />
//               <Route path="logs" element={<Log />} />
//               <Route path="analytics" element={<Analytics />} />
//               <Route path="reports" element={<Reports />} />
//             </Route>
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </SignedIn>
//         <SignedOut>
//           <Suspense fallback={<SignInSkeleton />}>
//             <Routes>
//               <Route element={<AuthLayout />}>
//                 <Route path="sign-in" element={<SignInPage />} />
//                 <Route path="sign-up" element={<SignUpPage />} />
//               </Route>
//               <Route path="*" element={<Navigate to="/sign-in" />} />
//             </Routes>
//           </Suspense>
//         </SignedOut>
//       </Suspense>
//     </ClerkLoaded>
//   );
// }



import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, ClerkLoaded } from "@clerk/clerk-react";
import { SignInSkeleton } from "../components/signInSkeleton/SignInSkeleton";
import { DashboardSkeleton } from "../components/dashboardSkeleton/DashboardSkeleton";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import Analytics from "../pages/Analytics";
import Reports from "../pages/Reports";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Users = lazy(() => import("../pages/Users"));
const Products = lazy(() => import("../pages/Products"));
const Orders = lazy(() => import("../pages/Orders"));
const Roles = lazy(() => import("../pages/Roles"));
const Settings = lazy(() => import("../pages/Settings"));
const Notifications = lazy(() => import("../pages/Notifications"));
const Message = lazy(() => import("../pages/Message"));
const Support = lazy(() => import("../pages/Support"));
const Integrations = lazy(() => import("../pages/Integrations"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Log = lazy(() => import("../pages/Log"));
const SignInPage = lazy(() => import("../pages/SignInPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));

export default function AppRoutes() {
  return (
    <ClerkLoaded>
      <SignedIn>
        <Suspense fallback={<DashboardSkeleton />}>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="roles" element={<Roles />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="messages" element={<Message />} />
              <Route path="support" element={<Support />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="logs" element={<Log />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </SignedIn>
      <SignedOut>
        <Suspense fallback={<SignInSkeleton />}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Routes>
        </Suspense>
      </SignedOut>
    </ClerkLoaded>
  );
}
