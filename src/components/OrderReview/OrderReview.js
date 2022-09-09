import React from 'react';
import { useHistory } from 'react-router';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import ReviewItem from '../ReviewItem/ReviewItem';


const OrderReview = () => {
    // exporting products and cart
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory();
    // removing item from reviewItem
    const handleRemove = key => {
        // filtering through cart and matching the key and setting the set cart
              const newCart = cart.filter(product => product.key !== key)
              setCart(newCart);
              deleteFromDb(key);
            }
    const handlePLaceOrder = () => {
        history.push('/placeorder');
        setCart([]);
        clearTheCart();
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            {/* sending selected product to review item */}
                 {
                     cart.map(product => <ReviewItem
                      product={product}
                      key={product.key}
                      handleRemove={handleRemove}
                      ></ReviewItem>)
                 }
            </div>
            <div className="cart-container">
                 <Cart cart={cart}>
                     <button onClick={handlePLaceOrder} className="btn-regular">Place Order</button>
                 </Cart>
            </div>
        </div>
    );
};

export default OrderReview;