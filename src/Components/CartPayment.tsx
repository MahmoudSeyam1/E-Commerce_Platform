import React, { useEffect, useState } from 'react';
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from './FormattedPrice';
import { useSelector } from 'react-redux';
import { StateProps, StoreProduct } from '../../type';
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const CartPayment = () => {
    const {productData, userInfo} = useSelector(
        (state: StateProps) => state.next
    );
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        let amt= 0;
        productData.map((item: StoreProduct) => {
            amt += item.price * item.quantity;
            return 
        });
        setTotalAmount(amt);
    }, [productData]);
    // Striep payment
    const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    const { data: session } = useSession();

    const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: productData, email: session?.user?.email }),
    });
    const checkoutSession = await response.json();

    // Redirecting user/customer to Stripe Checkout
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.id,
    });
    if (result.error) {
        alert(result?.error.message);
    }
    };

    return (
        <div className='flex flex-col gap-4'>
        <div className='flex gap-2 items-center justify-center'>
            <span className='bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1'>
                <SiMediamarkt />
                </span>
                <p className='text-sm'>Your order qualifies for <span className='font-bold text-md'>FREE</span> shipping by chossing this option at checkout. see details...</p>
        </div>
        <p className='flex items-center justify-between px-2 font-semibold'>Total: <span className='font-bold text-xl'><FormattedPrice amount={totalAmount} /></span></p>
            {userInfo ? (
                    <div className='flex flex-col items-center'>
                    <button onClick={handleCheckout} className='w-[90%] h-10 text-sm font-semibold bg-amazon_gray bg-opacity-50 text-white rounded-lg hover:bg-amazon_yellow hover:text-black'>Proceed to Buy</button>
                </div>
            ) : (
                <div className='flex flex-col items-center'>
                <button className='w-[90%] h-10 text-sm font-semibold bg-amazon_gray bg-opacity-50 text-white rounded-lg cursor-not-allowed'>Proceed to Buy</button>
                <p className='text-xs mt-2 text-red-600 font-semibold animate-bounce '>Please, Login to Continue</p>
            </div>
            ) }
        </div>
    );
};

export default CartPayment;
