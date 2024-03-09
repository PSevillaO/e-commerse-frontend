import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import './Register.css'
export default function Register() {


  const { register, handleSubmit } = useForm();
  const URL = import.meta.env.VITE_SERVER_URL;


  async function submitedData(data) {
    try {
      const formData = new FormData();

      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("role", data.role)
      formData.append("bornDate", data.bornDate)

      formData.append("password", data.password)

      if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
        formData.append("image", data.image[0]);
      }

      // Si no edito hago un post 
      const user = await axios.post(`${URL}/users`, formData);
      Swal.fire({
        title: "Usuario Creado",
        text: `El Usuario ${user.data.user?.name} fue creado correctamente`,
        icon: "success"
      });

    } catch (error) {

      Swal.fire({
        title: "No se creo el usuario",
        text: "Alguno de los datos ingresados no son correctos",
        icon: "error"
      });
    }
  }



  return (
    <div className="user-section-register">
      <div className="form-sticky-admin">
        <h2 className="admin-form-title">
          Registro de Usuarios
        </h2>
        <form className="user-form" onSubmit={handleSubmit(submitedData)} encType="multipart/form-data">

          <div className="input-group">
            <label className="lbl" htmlFor="name">Nombre</label>
            <input id="name" type="text" className="admin-input" required minLength={4} maxLength={60} {...register("name")} />

            <label className="lbl" htmlFor="email">e-mail</label>
            <input id="email" type="email" className="admin-input" required minLength={6} maxLength={80} {...register("email")} />

            <label className="lbl" htmlFor="password">Password</label>
            <input id="password" type="password" className="admin-input" required minLength={4} maxLength={70} {...register("password")} />

            <label className="lbl" htmlFor="image">Imagen</label>
            <input id="image" type="file" accept="image/*" className="admin-input" {...register("image")} />

            <label className="lbl" htmlFor="bornDate">Fecha de Nacimiento</label>
            <input id="bornDate" type="date" className="admin-input" {...register("bornDate")} />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-form btn-create">Añadir Usuario
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
