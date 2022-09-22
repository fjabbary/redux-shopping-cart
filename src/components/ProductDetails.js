import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useGetProductDetailQuery } from '../features/productsApi'
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice'


function ProductDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { data, isLoading } = useGetProductDetailQuery(id);
    const dispatch = useDispatch();
    const { product } = location.state;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        navigate("/cart")
    }


    return (
        <>
            {isLoading ? <h3>Loadding...</h3> : (
                <div className="product-details-page">
                    <div className="product-details-img">
                        <img src={data.image} alt={data.name} />
                    </div>
                    <div className="product-detail-desc">
                        <div>
                            <h1>{data.name}</h1>
                            <p>{data.desc}</p>
                        </div>
                        <div className="product-detail-row-bottom">
                            <h4><b>Price: ${data.price}</b></h4>
                            <button onClick={handleAddToCart}>Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductDetails