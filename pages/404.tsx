import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayout } from "../components/layouts";

export const Custom404Page = () => {
  return (
    <ShopLayout title='Page not found' pageDescription="No se ha encontrado la página">
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <Typography 
                variant='h1' 
                component='h1' 
                fontWeight={300}
                sx={{ fontSize: { xs: '6rem', sm: '7rem' } }}

            >404</Typography>

            <Typography 
                variant='h1' 
                component='h1' 
                fontSize={60} 
                fontWeight={300}
                marginRight={2}
                marginLeft={2}
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >|</Typography>

            <Typography 
                variant='h3' 
                component='h3' 
                fontWeight={100}
                sx={{ fontSize: { xs: '2rem', sm: '2rem' } }}
            >Page not found</Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404Page;