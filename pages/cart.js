import EachItem from '../components/EachItem';
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

const Row = (props) => {
  const auth = useAuth();
  const [cartItem, setCartItem] = useState(props.cartItem);
  const cartAttributes = props.cartItem.cartAttributes;

  const handleChange = e => {
  e.preventDefault();
  const { name, value } = e.target;
  const temp = {
    ...cartItem,
    cartAttributes:{...cartAttributes, [name]: value}
  };
  setCartItem({...temp});
  auth.updateCartItems(temp);
  };

  return (
    <TableRow>
      <TableCell>
      <EachItem fullScreen={false} item={cartItem} key={cartItem.id} smSize={12} xsSize={12}/>
      </TableCell>
      <TableCell>
          {cartItem.varAttributes && Object.keys(cartItem.varAttributes).map(v => (
        <div key={cartItem.id + v}>{v}<br/><Select
        name={v}
        onChange={handleChange}
        style={{ height: `20px` }}
        value={cartItem.cartAttributes[v]}
        variant="outlined"
        >
        {cartItem.varAttributes[v].map(i => (
          <MenuItem key={cartItem.id + i} value={i}>{i}</MenuItem>
        ))}
        </Select><br/></div>
      ))}
      Qty<br/>
      <Select
        name="qty"
        onChange={handleChange}
        style={{ height: `20px` }}
        value={cartItem.cartAttributes.qty}
        variant="outlined"
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
      </TableCell>
      <TableCell> { cartItem.price } </TableCell>
      <TableCell> { cartItem.cartAttributes.qty * cartItem.price } </TableCell>
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
          <TableCell> Choice </TableCell>
          <TableCell> PPU </TableCell>
          <TableCell> Price </TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        { auth.cartItems && auth.cartItems.map(cartItem => (
          cartItem && Object.keys(cartItem).length > 0 &&
          <Row cartItem={cartItem} key={cartItem.hash} />
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
        <br/><br/>
        <small> Note: PPU means Price Per Unit.<br/>All prices are in Indian Rupees. </small>
      </>
      )}
    </Container>
    </Box>
  ): <Typography gutterBottom style={{ textAlign: `center`}} variant="h5"><br/>There are no items in your cart.</Typography>
  );
};

export default Cart;
