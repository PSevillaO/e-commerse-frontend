import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import Swal from "sweetalert2";
import axios from "axios";

const orderContext = createContext();

export const useOrder = () => useContext(orderContext);
const URL = import.meta.env.VITE_SERVER_URL;

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState(() => JSON.parse(localStorage.getItem("order")) || []);

    const [cartMenu, setCartMenu] = useState(false);
    const [total, setTotal] = useState(0);
    const [TotalItems, setTotalItems] = useState(0)
    const { user } = useUser();

    useEffect(() => {
        calculateTotal();
        calculateTotalItems()
    }, [order])


    function addItem(item) {

        const itemIndex = order.findIndex((prod) => prod.productId === item._id);
        let newOrder;
        if (itemIndex >= 0) {
            newOrder = order.map((producto) => {
                if (producto.productId === item._id) {
                    return { ...producto, quantity: producto.quantity + 1 }
                }
                return producto
            });


        } else {
            const product = {
                productId: item._id,
                quantity: 1,
                price: item.price,
                productName: item.title,
                image: item.image
            }
            newOrder = [...order, product]
        }

        localStorage.setItem("order", JSON.stringify(newOrder));
        setOrder(newOrder)

    }

    function calculateTotal() {
        const totalAcc = order.reduce((acc, producto) => {
            acc += producto.price * producto.quantity;
            return acc
        }, 0)
        setTotal(totalAcc)
    }

    function calculateTotalItems() {
        let totalItem = 0
        order.forEach(prod => {
            totalItem += prod.quantity;
        });
        setTotalItems(totalItem)
    }


    function removeItem(id) {
        const updatedOrder = order.filter(producto => producto.productId !== id);
        setOrder(updatedOrder);
        localStorage.setItem("order", JSON.stringify(updatedOrder));
    }

    function clearCart() {
        // limpio el carrito de compras
        setOrder([])
    }

    function toggleMenu() {
        setCartMenu(!cartMenu)
    }

    async function finishOrder() {
        try {
            if (!user) {
                return Swal.fire({
                    icon: "error",
                    title: 'Oops,',
                    text: "Debe iniciar sesion para agregar productos al carrito",
                })
            }
            const newOrder = {
                user: user._id,
                total,
                products: order
            }
            console.log("NEW", newOrder)
            const response = await axios.post(`${URL}/orders`, newOrder)
            console.log(response)
            Swal.fire({
                icon: "success",
                title: 'Compra Realizada',
                text: "Gracias por su compra",
            })

            clearCart()


        } catch (error) {
            Swal.fire({
                icon: "error",
                title: 'Oops,',
                text: "Algo Salio mal!!",
            })

        }


    }


    return (

        <orderContext.Provider value={{ order, cartMenu, total, TotalItems, addItem, removeItem, clearCart, toggleMenu, finishOrder }}>
            {children}
        </orderContext.Provider>
    )
}
