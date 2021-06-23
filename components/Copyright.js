import { Typography } from '@material-ui/core';
import Link from 'next/link';

const Copyright = () => (
    <Typography color="textSecondary" variant="body2" align="center">
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
);

export default Copyright;
