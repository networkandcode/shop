import EachItem from '../components/EachItem';
import { useAuth } from '../hooks/useAuth';
import {
    Box,
    Grid,
} from '@material-ui/core';
import { useRouter } from 'next/router';

const Favorites = (props) => {
    const router = useRouter();
    const auth = useAuth();

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                {auth.items.map(item => (
                    auth.favs.includes(item.id) &&
                        <EachItem
                            fullScreen={false}
                            item={item}
                            key={item.id}
                            smSize={3}
                            xsSize={6}
                        />
                ))}
            </Grid>
        </Box>
  );
};

export default Favorites;
