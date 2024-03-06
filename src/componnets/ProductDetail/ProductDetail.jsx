import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
const URL = import.meta.env.VITE_SERVER_URL;
const URLimg = URL + '/images/products/';
import defaulPicture from "../../assets/image/DefautProfile.png"
import './ProductDetail.css'

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setproduct] = useState({});

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
                                <div>
                                    <h5 className="info-category">{product.category ? product.category.name : 'No category'}</h5>
                                    <h2 className="info-title">${product.title}</h2>
                                    <h3 className="info-price">$ ${product.price}</h3>
                                    <p className="info-description">${product.info} </p>
                                </div>
                                <div className="info-cant">
                                    <div className="count-detail">
                                        <p>Cantidad</p>
                                        <div className="info-selector">
                                            <button>+</button>
                                            <p>1</p>
                                            <button>+</button>
                                        </div>
                                    </div>
                                    <div className="info-button">
                                        <button className="card-btn">Añadir Carrito</button>
                                        <button className="card-btn">Comprar ahora</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="main-description">
                        <div className="div-description">
                            <h2>Descripcion</h2>
                            <p> ${product.description}</p>
                        </div>
                    </section>
                </div>
            </main>



        </div>
    )
}
