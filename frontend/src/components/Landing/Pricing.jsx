import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Container,
  Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
 
const PricingComponent = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 4, mt: 8 }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Flat and
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Simple
          </Typography>
          <Box
            sx={{
              bgcolor: '#ff7300',
              borderRadius: '15px',
              height: '50px',
              px: 2,
              py: 1,
              display: 'inline-flex',
              alignItems: 'center',
              border: '3px solid rgb(234, 187, 111)',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontWeight: 1000,
                fontSize: '2.25rem',
              }}
            >
              💸
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: '1.25rem',
              }}
            >
              pricing
            </Typography>
          </Box>
        </Stack>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            color: 'text.secondary',
            fontWeight: 400,
          }}
        >
          Use Hellotime for free or upgrade to Pro at a flat rate.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: -3,
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {/* Free Plan Card */}
        <Card
          sx={{
            maxWidth: 300,
            height: 250,
            width: '100%',
            borderRadius: 4,
            border: '1px solid rgb(114, 114, 114)',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
            mt: 10,
            mr: { xs: 0, md: -3 },
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Free
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon sx={{ color: '#9e9e9e' }} />
                <Typography>Unlimited people</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon sx={{ color: '#9e9e9e' }} />
                <Typography>Up to 5 active projects</Typography>
              </Box>
            </Stack>
            <Button
              variant="outlined"
              sx={{
                mt: 4,
                textTransform: 'none',
                borderRadius: 2,
                px: 4,
                py: 1,
              }}
            >
              Get started
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan Card */}
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            borderRadius: 4,
            border: '2px solid #f5a623',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              €49
              <Typography
                component="span"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  ml: 1,
                }}
              >
                / month
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                mb: 3,
              }}
            >
              Or €490 for a year and get 2 months for free.
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon sx={{ color: '#2e7d32' }} />
                <Typography>Flat, fixed pricing</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon sx={{ color: '#2e7d32' }} />
                <Typography>No per user-fees</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon sx={{ color: '#2e7d32' }} />
                <Typography>Unlimited people</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon sx={{ color: '#2e7d32' }} />
                <Typography>Up to 100 active projects</Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              sx={{
                mt: 4,
                textTransform: 'none',
                borderRadius: 2,
                px: 4,
                py: 1,
                bgcolor: '#1a1a1a',
                '&:hover': {
                  bgcolor: '#000000',
                },
              }}
            >
              Get started for free
            </Button>
            <Typography
              sx={{
                mt: 2,
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              30-day free trial. Tax excluded.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PricingComponent;
