import { useOrder } from '../../../context/OrderContext'
import './Cart.css'
const URL = import.meta.env.VITE_SERVER_URL;

export const Cart = () => {

    const { cartMenu, order, total, TotalItems, finishOrder, clearCart, removeItem } = useOrder();

    return (
        <div className={`cart-wrapper ${cartMenu ? 'active' : ''}`}>
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
    )
}
