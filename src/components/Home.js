import React from 'react'
import { useGetAllProductsQuery } from '../features/productsApi';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

function Home() {
    const { data, isLoading } = useGetAllProductsQuery();

    return (
        <>
            <h1 className="heading-title">New Products</h1>
            <div className="products">
                {isLoading
                    ? (<p>Loading...</p>) :
                    data.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id} state={{ product: product }}>
                            <div className="product">
                                <h3>{product.name}</h3>
                                <div className="img-container">
                                    <img src={product.image} className="image" alt="" />
                                </div>
                                <div className="product-info">
                                    <p>{product.desc}</p>
                                    <p><strong>${product.price}</strong></p>
                                </div>
                            </div>
                        </Link>)
                    )
                }
            </div>
        </>
    )
}

export default Home