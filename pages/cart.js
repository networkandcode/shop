import ItemImage from '../components/ItemImage';
import { useAuth } from '../hooks/useAuth';
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
}  from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Row = ({ cartItem }) => {
    const auth = useAuth();
    const [ qty, setQty ] = useState(0);
    const handleChange = e => {
        e.preventDefault();
        setQty(e.target.value);
        localStorage.setItem(cartItem.id, e.target.value);
        auth.updateCartItems();
    };
    useEffect(() => {
        setQty(localStorage.getItem(cartItem.id) || 0);
    },[]);

    return (
        <TableRow>
            <TableCell>
                <ItemImage item={cartItem}/>
                <br/>
                { cartItem.name } { cartItem.description }
            </TableCell>
            <TableCell><select onChange={handleChange} value={qty}>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
            </select></TableCell>
            <TableCell> { cartItem.price } </TableCell>
            <TableCell> { qty * cartItem.price } </TableCell>                              
        </TableRow>
    );
};

const Cart = () => {
    const auth = useAuth();
    const router = useRouter();
 
    return (
            auth.totalPrice > 0 ?(
        <div>
        <TableContainer component={ Paper } style={{ padding: `auto`, margin: `auto`, marginTop: `0`, maxWidth: `600px`}}>
            <Typography style={{ padding: `10px` }} variant="h6">
                Please review your order.
            </Typography>
            <small style={{ padding: `10px` }}>
                Note: The item will be removed from the cart if the quantity is set to 0.
            </small>
            <Container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Item </TableCell>
                            <TableCell> Qty </TableCell>
                            <TableCell> PPU </TableCell>
                            <TableCell> Price </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { auth.cartItems && auth.cartItems.map( (cartItem, idx) => (
                              cartItem &&
                              <Row cartItem={cartItem} key={idx} />
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </TableContainer>
        <br/>
        <Container>
            { auth.totalPrice > 0 && (
            <Typography style={{ textAlign: `center` }} variant="subtitle1">
            <Link href={`/checkout?p=${auth.totalPrice}`}>
                <a>
                    <Button color="primary" variant="outlined">
                        Proceed to pay Rs. { auth.totalPrice }
                    </Button>
                </a>
            </Link>
            <br/>
            <small> Note: All price are in Indian Rupees. </small>
            </Typography>
            )}
        </Container>
        </div>
            ): <Typography gutterBottom style={{ textAlign: `center`}} variant="h5"><br/>There are no items in your cart.</Typography>
    );
};

export default Cart;
