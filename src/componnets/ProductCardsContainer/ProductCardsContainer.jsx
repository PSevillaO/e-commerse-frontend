import axios from 'axios'
import { useEffect, useState } from 'react'
import { ProductCard } from '../ProductCard/ProductCard'
import './ProductCardsContainer.css'

const URL = import.meta.env.VITE_SERVER_URL;


export const ProductCardsContainer = () => {
    const [products, setProducts] = useState([])

    useEffect(function () {
        //codigo que se ejecuta cuando se crea el componente
        getProducts();
    }, [])

    async function getProducts() {
        try {
            // Pedido al backend
            // por ahora queda en limite de 100 pero esto lo tengo que cambiar pra que pagina automaticamente 
            const response = await axios.get(`${URL}/products?limit=100`)
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1 className='main-title'>Productos Destacados</h1>
            <section className='card-container'>
                {
                    products.map(product => {
                        return (
                            <ProductCard product={product} key={product._id} />
                        )
                    })
                }
            </section>
        </>
    )
}
