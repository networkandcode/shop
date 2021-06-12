import ItemImage from '../components/ItemImage';
import { useAuth } from '../hooks/useAuth';
import {
    Box,
    Button,
    Container,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
}  from '@material-ui/core';
import axios from 'axios';
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
            <TableCell><Select onChange={handleChange} style={{ height: `20px` }} value={qty} variant="outlined">
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
            </Select></TableCell>
            <TableCell> { cartItem.price } </TableCell>
            <TableCell> { qty * cartItem.price } </TableCell>
        </TableRow>
    );
};

const Cart = () => {
    const auth = useAuth();
    const router = useRouter();

    const handlePay = async(e) => {
        e.preventDefault();
        const res = await axios.post("/api/stripe", auth.cartItems);
        const { status, data } = res;
        if(status === 200){
            const sessionId = data.session.id;
            router.push(`/checkout?sessionId=${sessionId}`);
        }
    }

    return (
            auth.totalPrice > 0 ?(
        <Box mt={3}>
        <TableContainer component={ Paper } style={{ padding: `auto`, margin: `auto`, marginTop: `0`, maxWidth: `600px`}}>
            <Typography style={{ padding: `10px` }} variant="h6">
                Please review your order.
                <br/>
                <small>
                    Note: The item will be removed from the cart if the quantity is set to 0.
                </small>
            </Typography>
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
        <Container style={{ textAlign: `center` }}>
            { auth.totalPrice > 0 && (
                <>
                    <Button color="primary" onClick={handlePay} variant="outlined">
                        <Typography variant="subtitle1">
                            Proceed to pay Rs. { auth.totalPrice }
                        </Typography>
                    </Button>
                    <br/>
                    <small> Note: All price are in Indian Rupees. </small>
                </>
            )}
        </Container>
        </Box>
            ): <Typography gutterBottom style={{ textAlign: `center`}} variant="h5"><br/>There are no items in your cart.</Typography>
    );
};

export default Cart;
