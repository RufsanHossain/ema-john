import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating';
import './Product.css';
const Product = (props) => {
    // console.log(props.product)
    const { name, img, seller, price, stock, star } = props.product
    // console.log(props.product.name)
    return (
        <div className="product">
            <div>
            <img src={img} alt=""></img>
            </div>
            <div>
                <h3 className=" product-name">{name}</h3>
                <p><small>by: {seller} </small></p>
                <p>price: {price}</p>
                <p><small> only {stock} is available in stock -- order soon</small></p>
                {/* getting event handler via props */}
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star icon-color"
                    fullSymbol="fas fa-star icon-color"
                    readonly
                />
                <br/>
                <button onClick={() => props.handleAddToCart(props.product)} className="btn-regular">
                   <FontAwesomeIcon icon={faCartPlus} />
                add to cart</button>
            </div>
            
        </div>
    );
};

export default Product;