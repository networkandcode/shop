import { useAuth } from '../hooks/useAuth';
import { Box, Typography } from '@material-ui/core';
import Link from 'next/link';

const Copyright = () => {

  const auth = useAuth();

  return (
    <Box style={{ backgroundColor: `${auth.themeBgColor}` }} pt={2}>
      <Typography
        style={{ color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }}
        variant="body2"
        align="center"
      >
        {'Copyright © '}
        <Link href="/">
            <a>
                { process.env.NEXT_PUBLIC_MY_DOMAIN }
            </a>
        </Link>
        {' '}
        2021 -
        {' '}
        {new Date().getFullYear() + 1}
        {'.'}
        <br/>
        <br/>
      </Typography>
    </Box>
  );
}

export default Copyright;
