import { Button, Container, Typography } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Stripe from "stripe";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = ({ session }) => {
    const router = useRouter();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
        if(result.error){
            console.log(result.error.message);
        };
    };
    useEffect(() => {
        if(router.query && (localStorage.getItem('totalPrice') !== router.query.p)){
            router.push('/cart');
        }
    }, [])
    return(
        <Container>
            <br/>
            <form onSubmit={ handleSubmit }>
                    <Button color="primary" fullWidth type="submit" variant="outlined">
                      <Typography gutterBottom variant="h5">
                          Pay now
                      </Typography>
                    </Button>
            </form>
        </Container>
    );
};

export const getServerSideProps = async ctx => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Items bought at safamarwa.store',
          },
          unit_amount: ctx.query.p * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: process.env.STRIPE_SUCCESS_URL + "?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: process.env.STRIPE_CANCEL_URL
  });

  return {
    props: {
      session
    }
  };
};

export default CheckoutPage;
