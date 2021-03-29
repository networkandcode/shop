import { Typography } from '@material-ui/core';
import Link from 'next/link';

const Copyright = () => (
    <Typography color="textSecondary" variant="body2" align="center">
        {'Copyright © '}
        <Link href="/">
            <a>
                www.marebox.com
            </a>            
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
);

export default Copyright;