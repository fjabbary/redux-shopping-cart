import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, changeQuantity, clearCart, getTotal } from '../features/cartSlice'

function Cart() {
    const cartItems = useSelector(state => state.cart.cartItems);
    const cart = useSelector(state => state.cart);
    const { cartTotalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id, productName) => {
        dispatch(removeFromCart({ id, productName }));
    }

    const handlechangeQuantity = (id, type) => {
        dispatch(changeQuantity({ id, type }))
    }

    const handleclearCart = () => {
        dispatch(clearCart())
    }

    useEffect(() => {
        dispatch(getTotal())
    }, [cart, dispatch])

    return (
        <div className="cart">
            <h1 className="cart-page-title">Shopping Cart</h1>
            {
                cartItems.length === 0 ?
                    <div className="empty-cart">
                        <h3>No Item found in the Cart <Link to="/">Start Shopping <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg></Link></h3>
                    </div>
                    : (
                        <div className="cart-items">
                            <div className="cart-headers">
                                <div>PRODUCT</div>
                                <div>PRICE</div>
                                <div>QUANTITY</div>
                                <div>TOTAL</div>
                            </div>
                            {cartItems.map(({ id, name, price, desc, image, cartQuantity }) => (

                                <div className="cart-item" key={id}>
                                    <div className="product-detail">
                                        <div className="product-img">
                                            <img src={image} alt={name} />
                                        </div>
                                        <div className="product-name">
                                            <p>{name} <br />{desc}</p>
                                            <button onClick={() => handleRemoveFromCart(id, name)}>Remove</button>
                                        </div>
                                    </div>

                                    <div className="product-price">${price}</div>
                                    <div className="product-qty">
                                        <div className="product-qty-btn">
                                            <button onClick={() => handlechangeQuantity(id, 'dec')}>-</button>
                                            <span>{cartQuantity}</span>
                                            <button onClick={() => handlechangeQuantity(id, 'inc')}>+</button>
                                        </div>
                                    </div>
                                    <div className="product-total">${cartQuantity * price}</div>
                                </div>
                            ))}

                            <div className="cart-cta">
                                <div><button className="clear-cart" onClick={handleclearCart}>Clear Cart</button></div>
                                <div>
                                    <h4 className="subtotal">
                                        <span>Subtotal:</span>
                                        <span> ${cartTotalAmount}</span>
                                    </h4>
                                    <p><small>Taxes and shipping calculated at checkout</small></p>
                                    <button className="btn-checkout">Check out</button>
                                    <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                    </svg> Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    )
}

export default Cart