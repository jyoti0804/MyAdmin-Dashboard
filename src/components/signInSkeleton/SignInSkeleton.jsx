// import React from "react";
// import { Skeleton, Paper } from "@mui/material";

// export  function SignInSkeleton() {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "rgba(243,244,246, 0.85)",
//         zIndex: 9999,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           width: 400,
//           maxWidth: "90vw",
//           padding: 4,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <Skeleton variant="text" width="70%" height={30} sx={{ mb: 1 }} />
//         <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
//         <Skeleton variant="rectangular" width="90%" height={42} sx={{ mb: 2 }} />
//         <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
//         <Skeleton variant="rectangular" width="100%" height={42} sx={{ mb: 2 }} />
//         <Skeleton variant="text" width="60%" height={20} />
//       </Paper>
//     </div>
//   );
// }





import { Skeleton, Paper } from "@mui/material";

export function SignInSkeleton() {
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
        justifyContent: "center"
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 400,
          maxWidth: "90vw",
          height: 440,       
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 4,
        }}
      >
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="80%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={44} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="85%" height={18} />
        <Skeleton variant="rectangular" width="60%" height={32} sx={{ mt: 4 }} />
      </Paper>
    </div>
  );
}
