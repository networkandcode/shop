import { Typography } from '@material-ui/core';
import Link from 'next/link';

const Copyright = () => (
    <Typography color="textSecondary" variant="body2" align="center">
        {'Copyright © '}
        <Link href="/">
            <a>
                www.safamarwa.store
            </a>            
        </Link>
        {' '}
        2020 - 
        {' '}
        {new Date().getFullYear()}
        {'.'}
        <br/>
        <br/>
    </Typography>
);

export default Copyright;
