import React from 'react';

const Cart = (props) => {
    // destructing cart from props
    const { cart } = props;
    
    console.log(cart.name)
    console.log(props.children)

    // calculating price and other stuff 

    // const totalReducer = (previous, product) => previous + product.price;
    // const total = cart.reduce(totalReducer,0)

    let total = 0;
    let totalQuantity = 0;
    // looping through cart 
    for( const product of cart){
        // if quantity not there then set quantity to 1
        if(!product.quantity){
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    // console.log(totalQuantity);

    const shipping = total > 0 ? 15 : 0;
    const tax = (total + shipping) * 0.10;
    const grandTotal = total + shipping + tax;

    return (
        <div>
            <h2>Order Summary</h2>
            <p>item ordered: {totalQuantity}</p>
            <p>Price: {total.toFixed(2)}</p>
            <p>shipping: {shipping}</p>
            <p>tax: {tax.toFixed(2)}</p>
            <p>grandTotal: {grandTotal.toFixed(2)}</p>
            {/* <p>price: {cart.price}</p> */}
            <p>{props.children}</p>
        </div>
    );
};

export default Cart;