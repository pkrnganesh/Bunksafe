import { styled, keyframes, createTheme } from '@mui/material/styles';
import { Paper, Button, IconButton } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
          main: '#42daf5',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: 'white',
        },
      },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;



export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '12px 24px',
  fontWeight: 600,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  boxShadow: `0 3px 5px 2px ${theme.palette.primary.light}`,
  color: 'white',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
    transform: 'scale(1.05)',
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

export const UploadIcon = styled('div')(({ theme }) => ({
  fontSize: 100,
  color: theme.palette.primary.main,
  animation: `${float} 3s ease-in-out infinite`,
}));

// export const StyledPaper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderRadius: 16,
//     width: '50%',
//     height: '300px',
//     textAlign: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     background: 'white',
//     boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
//     border: '1px solid rgba(255, 255, 255, 0.18)',
//     transition: 'all 0.3s ease-in-out',
//     '&:hover': {
//         transform: 'translateY(-5px)',
//         boxShadow: '0 15px 30px 0 rgba(31, 38, 135, 0.3)',
//     },
//     '@media (max-width: 768px)': {
//         width: '100%',
//     },
// }));


// export const StyledPaper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderRadius: 16,
//     width: '50%',
//     height: '300px',
//     textAlign: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     background: 'white',
//     boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
//     border: '1px solid rgba(255, 255, 255, 0.18)',
//     transition: 'all 0.3s ease-in-out',
//     '&:hover': {
//         transform: 'translateY(-5px)',
//         boxShadow: '0 15px 30px 0 rgba(31, 38, 135, 0.3)',
//     },
//     }));
