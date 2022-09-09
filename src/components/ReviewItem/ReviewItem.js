import React from 'react';

const ReviewItem = (props) => {
    // destructing from product that send to reviewItem
    const {name, price, quantity, key} = props.product;
    const {handleRemove} = props;
    return (
        <div className="product">
            <div>
                <h2 className="product-name">{name}</h2>
                <p>{price}</p>
                <p>{quantity}</p>
                <button onClick={()=> handleRemove(key)} className="btn-regular">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;