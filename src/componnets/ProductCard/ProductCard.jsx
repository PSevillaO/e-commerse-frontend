// import Product from "../../pages/Product/Product";
import PropTypes from 'prop-types';
import { useOrder } from '../../context/OrderContext';
import { Link } from 'react-router-dom';
import defaulPicture from "../../assets/image/DefautProfile.png"
const URL = import.meta.env.VITE_SERVER_URL;
const URLimg = URL + '/images/products/';
import formatDate from "../../utils/formatDate"

export const ProductCard = ({ product }) => {

    const { addItem } = useOrder();


    return (
        <article className="card">
            <header className="card-header">
                <img src={product.image ? URLimg + product.image : defaulPicture} alt={product.title} className="card-img" loading="lazy" />
                <div className="card-info">
                    <h2 className="card-info-title">{product.title}</h2>
                    <p className="card-info-text">{product.info}</p>
                    {/* <p>{product.imagen}</p> */}
                </div>
            </header>
            <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="card-description"> {product.descripcion}</p>
                <div className="card-values">
                    <div className="card-date">{product.dateCard ? formatDate(product.dateCard) : "Sin Datos"}</div>
                    <div className="card-price">${product.price}</div>
                </div>
            </div>
            <footer className="card-footer">
                {/* <button className="card-btn">Ver mas</button> */}
                <Link className='card-btn' to={`/product-detail/${product._id}`}>
                    Ver Mas
                </Link>
                <button className="card-btn" onClick={() => addItem(product)}>Comprar</button>
            </footer>
        </article>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};