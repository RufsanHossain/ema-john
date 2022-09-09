import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  // calling useState for storing data
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);

  // for cart info
  const [cart, setCart] = useState([]);
  // console.log(products)

  // calling useEffect for fetching data and send it to useState
  useEffect(() => {
    fetch("./products.JSON")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setDisplayProducts(data);
      });
  }, []);
  // calling local storage from fakeDb
  useEffect(() => {
    if (products.length) {
      const savedCart = getStoredCart();
      const storedCart = [];
      for (const key in savedCart) {
        console.log(key, savedCart[key]);
        const addedProduct = products.find((product) => product.key === key);
        if (addedProduct) {
          const quantity = savedCart[key];
          addedProduct.quantity = quantity;
          storedCart.push(addedProduct);
        }
      }
      setCart(storedCart);
    }
  }, [products]);

  // creating event handler to pass info to product

  const handleAddToCart = (product) => {
    // finding the product if exists
    const exists = cart.find(pd => pd.key === product.key);
    let newCart = [];
    if(exists) {
      // getting all products except exists
      const rest = cart.filter(pd => pd.key !== product.key)
      // adding the product quantity
      exists.quantity = exists.quantity + 1
      newCart = [...rest, product]
    }

    else {
      product.quantity = 1;
      newCart = [...cart, product]
    }
    // coping cart and adding product in click and send it to setCart
    // const newCart = [...cart, product];
    setCart(newCart);

    // adding to fake data to save to local storage
    addToDb(product.key);
    // console.log(newCart.name)
    // console.log(product.name);
  };
  // search products
  const handleSearch = (event) => {
    const searchText = event.target.value;
    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayProducts(matchedProducts);
  };

  return (
    <div>
      <div className="search-container">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search Product"
        ></input>
      </div>
      <div className="shop-container">
        {/* to show product*/}
        <div className="product-container">
          <h2>product: {products.length} </h2>
          {/* mapping through products to send the item via props to product component */}
          {displayProducts.map((product) => (
            <Product
              key={product.key}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        {/* to show the buyers ordered item*/}
        <div className="cart-container">
          <Cart cart={cart}>
            {/* children declear */}
            <Link to='/review'>
              <button className="btn-regular">
                    Review Your Order
              </button>
            </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
