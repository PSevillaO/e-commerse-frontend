

import { useState } from 'react';
import Loading from '../../componnets/Loading/Loading';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_SERVER_URL;


export default function Pass() {

    const [loading, setLoading] = useState(false);
    const user = useUser();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const el = event.target.elements
            const data = {
                oldPassword: el.passwordActual.value,
                newPassword: el.passwordNuevo.value
            }
            setLoading(true)
            const response = await axios.put(`${URL}/users/pass/${user.user._id}`, data);
            console.log(response)
            Swal.fire({
                title: "Usuario Editado",
                text: `El Usuario fue editado correctamente`,
                icon: "success"
            }).then(() => {
                navigate("/")
            });
        } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                Swal.fire({
                    title: "Contraseña Incorrecta",
                    text: "Debe ingresar la contraseña actual",
                    icon: "error"
                });
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='main-login'>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Cambiar Password</h1>
                    <label>Clave Actual</label>
                    <input name="passwordActual" type="password" placeholder="Contraseña actual" />

                    <label>Nueva Clave</label>
                    <input name="passwordNuevo" type="password" placeholder="Nueva contraseña" />

                    <button type="submit" className="button">
                        {loading ? <Loading /> : "Cambiar"}

                    </button>
                </form>
            </div>
        </div>
    )
}
