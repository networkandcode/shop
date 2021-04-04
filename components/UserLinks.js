import { Breadcrumbs} from '@material-ui/core';
import Link from 'next/link';

const UserLinks = ({ address, profile, social }) => {    
    return(
        <Breadcrumbs aria-label="breadcrumb">        
            <Link href="/user/address">
                <a style={{color: address || `inherit`}}>
                    Address
                </a>                
            </Link>
            <Link href="/user/profile">
                <a style={{color: profile || `inherit`}}>
                    Profile
                </a>                
            </Link>
            <Link href="/user/social">
                <a style={{color: social || `inherit`}}>
                    Social
                </a>
            </Link>        
        </Breadcrumbs>
    );
};

export default UserLinks;