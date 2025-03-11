// import React, { useState } from 'react';
// import { Box, Button, Container, TextField, Typography, Paper, Divider, IconButton } from '@mui/material';
// import { Google as GoogleIcon, GitHub as GithubIcon, Lock as LockIcon } from '@mui/icons-material';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.REACT_APP_SUPABASE_URL,
//   process.env.REACT_APP_SUPABASE_ANON_KEY
// );

// const AuthComponent = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [authMode, setAuthMode] = useState('login');

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     const { error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) console.error(error);
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const { error } = await supabase.auth.signUp({ email, password });
//     if (error) console.error(error);
//   };

//   const handleOAuthSignIn = async (provider) => {
//     const { error } = await supabase.auth.signInWithOAuth({ provider });
//     if (error) console.error(error);
//   };

//   return (
//     <Container maxWidth="xs">
//       <Paper
//         elevation={3}
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           padding: 4,
//           borderRadius: 2,
//           backgroundImage: 'linear-gradient(to bottom right, #87CEEB, #B0E0E6)',
//           color: 'white',
//         }}
//       >
//         <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
//           {authMode === 'login' ? 'Sign In' : 'Sign Up'}
//         </Typography>

//         <Box component="form" onSubmit={authMode === 'login' ? handleSignIn : handleSignUp} sx={{ mt: 1, width: '100%' }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Email Address"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             InputProps={{
//               startAdornment: <LockIcon fontSize="small" />,
//               sx: { backgroundColor: 'white', borderRadius: 1 },
//             }}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Password"
//             type="password"
//             autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             InputProps={{
//               startAdornment: <LockIcon fontSize="small" />,
//               sx: { backgroundColor: 'white', borderRadius: 1 },
//             }}
//           />

//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: 'black', '&:hover': { bgcolor: 'grey.800' } }}>
//             {authMode === 'login' ? 'Sign In' : 'Sign Up'}
//           </Button>

//           <Divider sx={{ my: 2, bgcolor: 'white' }} />

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
//             <Button
//               variant="outlined"
//               startIcon={<GoogleIcon />}
//               fullWidth
//               onClick={() => handleOAuthSignIn('google')}
//               sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'grey.200' } }}
//             >
//               Google
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<GithubIcon />}
//               fullWidth
//               onClick={() => handleOAuthSignIn('github')}
//               sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'grey.200' } }}
//             >
//               GitHub
//             </Button>
//           </Box>

//           <Button
//             fullWidth
//             sx={{ mt: 2, color: 'white' }}
//             onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
//           >
//             {authMode === 'login'
//               ? "Don't have an account? Sign Up"
//               : "Already have an account? Sign In"}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default AuthComponent;