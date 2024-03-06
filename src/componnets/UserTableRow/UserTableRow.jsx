
import defaulPicture from "../../assets/image/DefautProfile.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const URL = import.meta.env.VITE_SERVER_URL;
const URLimg = URL + '/images/users/';
import formatDate from "../../utils/formatDate"

export const UserTableRow = ({ usr, deleteUser, setFormValue }) => {
    return (
        <tr key={usr._id}>
            <td className="table-image-row">
                <img className="table-image" src={usr.image ? URLimg + usr.image : defaulPicture} alt={usr.name} />
            </td>
            <td className="table-name" >{usr.name}</td>
            <td className="table-email">{usr.email}</td>
            <td className="table-bornDate">{usr.bornDate ? formatDate(usr.bornDate) : "Sin Datos"}</td>
            <td className="table-age"> {usr.role}</td>
            <td className="actions">
                <button className="btn btn-delete">
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(usr._id)} />
                </button>
                <button className="btn btn-edit">
                    <FontAwesomeIcon icon={faPen} onClick={() => setFormValue(usr)} />
                </button>
            </td>
        </tr>
    )
}
