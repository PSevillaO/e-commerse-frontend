
import defaulPicture from "../../assets/image/DefautProfile.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
const URL = import.meta.env.VITE_SERVER_URL;
const URLimg = URL + '/images/products/';
import formatDate from "../../utils/formatDate"

export const ProductTableRow = ({ prod, deleteProduct, setFormValue }) => {
    return (
        <tr key={prod._id}>
            <td className="table-image-row">
                <img className="table-image" src={prod.image ? URLimg + prod.image : defaulPicture} alt={prod.name} />
            </td>
            <td className="table-title" >{prod.title}</td>
            <td className="table-info">{prod.info}</td>
            <td className="table-description"> {prod.descripcion}</td>
            <td className="table-category"> {prod.category ? prod.category.name : "Sin datos"}</td>
            <td className="table-aprice"> {prod.price}</td>
            <td className="table-dateCard">{prod.dateCard ? formatDate(prod.dateCard) : "Sin Datos"}</td>
            <td className="actions">
                <button className="btn btn-delete">
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteProduct(prod._id)} />
                </button>
                <button className="btn btn-edit">
                    <FontAwesomeIcon icon={faPen} onClick={() => setFormValue(prod)} />
                </button>
            </td>
        </tr>
        // 
    )
}
