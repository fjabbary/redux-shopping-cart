import React from 'react'
import { useGetAllProductsQuery } from '../features/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice'

function Home() {
    const { data, isLoading } = useGetAllProductsQuery();
    const dispatch = useDispatch();

    const handleAddToCart = product => {
        dispatch(addToCart(product));
    }

    return (
        <>
            <h1 className="heading-title">New Products</h1>
            <div className="products">
                {isLoading
                    ? (<p>Loading...</p>) :
                    data.map(product => (
                        <div key={product.id} className="product">
                            <h3>{product.name}</h3>
                            <div className="img-container">
                                <img src={product.image} className="image" alt="" />
                            </div>
                            <div className="product-info">
                                <p>{product.desc}</p>
                                <p><strong>${product.price}</strong></p>
                            </div>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>)
                    )
                }
            </div>
        </>
    )
}

export default Home