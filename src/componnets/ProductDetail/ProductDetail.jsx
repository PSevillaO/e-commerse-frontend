import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
const URL = import.meta.env.VITE_SERVER_URL;
const URLimg = URL + '/images/products/';
import defaulPicture from "../../assets/image/DefautProfile.png"
import './ProductDetail.css'
import { useOrder } from "../../context/OrderContext";

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setproduct] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const { order, total, TotalItems, finishOrder, clearCart, removeItem, addItem } = useOrder()



    useEffect(() => {
        getProductDetail();
    }, [id]);

    async function getProductDetail() {
        try {
            const response = await axios.get(`${URL}/products/${id}`)
            const prod = response.data.product

            setproduct(prod)

        } catch (error) {
            console.log(error)
        }
    }
    function addCantidad() {
        setCantidad(cantidad + 1);
    }
    function minusCantidad() {
        if (cantidad === 1) return
        setCantidad(cantidad - 1);
    }

    return (
        <div key={product._id}>
            <main className="main">
                <div className="main-class-detail">
                    <section className="main-section-detail">
                        <div className="div-detail-detail">
                            <div className="div-imagen">
                                <img className="img" src={product.image ? URLimg + product.image : defaulPicture} alt={product.name} />
                            </div>
                            <div className="div-info">
                                <div className="detail-descrption">
                                    <div className="datail-category" >
                                        <h3 className="info-category">Categoria : {product.category ? product.category.name : 'No category'}</h3>
                                    </div>
                                    <div className="detail-title">
                                        <h1 className="info-title">{product.title}</h1>
                                    </div>
                                    <div className="detail-info">
                                        <h3 className="info-info">{product.info} </h3>
                                    </div>
                                    <div className="detail-price">
                                        <h3 className="info-price">Precio $ {product.price}</h3>
                                    </div>

                                </div>
                                <div className="info-cant">
                                    <div className="count-detail">
                                        <p>Cantidad</p>
                                        <div className="info-selector">
                                            <button onClick={() => minusCantidad()}>-</button>
                                            <p>{cantidad}</p>
                                            <button onClick={() => addCantidad()}>+</button>
                                        </div>
                                    </div>
                                    <div className="info-button">
                                        <button className="card-btn" onClick={() => addItem(product)} >Añadir Carrito</button>
                                    </div>
                                </div>
                            </div>
                            <div className="div-orders">
                                <div className='list-container'>
                                    <h2>Orden Actual</h2>
                                    <ul className='order-list'>
                                        {
                                            order.map((prod, idx) => {
                                                return (
                                                    <li className='order-item' key={idx}>
                                                        <div className='order-container'>
                                                            <img className='order-image'
                                                                src={`${URL}/images/products/${prod.image}`}
                                                                alt={prod.title} />
                                                            <div className='order-name'>
                                                                {prod.productName}
                                                            </div>
                                                        </div>
                                                        <div className="order-quantity">
                                                            {prod.quantity}
                                                            <div className='order-delete-item'>
                                                                <i className='fa-solid fa-trash' onClick={() => removeItem(prod.productId)} />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='order-finish'>
                                    <div className='total'>
                                        <div className='total-count'>Items: {TotalItems}</div>
                                        <div className='total-price'>
                                            Total $ <span>{total}</span>
                                        </div>
                                    </div>
                                    <div className='order-purchase'>
                                        <a onClick={() => clearCart()}>Limpiar Carrito</a>
                                        <button className='btn-comprar' onClick={() => finishOrder()}>
                                            Comprar
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>
                    <section className="main-description">
                        <div className="div-description">
                            <h2>Descripcion:</h2>
                            <p>{product.descripcion}</p>
                        </div>
                    </section>
                </div>
            </main>



        </div>
    )
}
