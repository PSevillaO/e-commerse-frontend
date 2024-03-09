import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import './Orders.css'

const URL = import.meta.env.VITE_SERVER_URL;

export default function Orders() {
    const { user } = useUser();
    const [dbOrders, setDbOrders] = useState([])
    useEffect(() => {
        getOrders();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    async function getOrders() {
        try {
            const response = await axios.get(`${URL}/orders/${user._id}`);
            const orders = response.data.orders;
            setDbOrders(orders);

            console.log(dbOrders)

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "No se pudieron obtener las Ordenes",
                icon: 'error'
            })
        }
    }


    return (
        <>
            <h1>Ordenes</h1>
            <div className="main-orders">
                {dbOrders.map(order => (
                    <div key={order._id} className="order-card">
                        <div className="order-title-container">
                            <h2 className="order-title">Orden: </h2>
                            <p>{order._id}</p>
                        </div>
                        <p>Total: {order.total}</p>
                        <p>Estado: {order.status}</p>
                        <h3>Usuario</h3>
                        <p>Nombre: {order.user.name}</p>
                        <p>Email: {order.user.email}</p>
                        <p>Rol: {order.user.role}</p>
                        <h3>Productos</h3>
                        <ul>
                            <div className="order-main-products">
                                {order.products.map(product => (
                                    <li key={product._id} style={{ textDecoration: 'none' }}>
                                        <p>Nombre: {product.productId.title}</p>
                                        <p>Cantidad: {product.quantity}</p>
                                        <p>Precio unitario: {product.price}</p>
                                    </li>
                                ))}
                            </div>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
