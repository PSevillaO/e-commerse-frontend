import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserTable } from "../../componnets/UserTable/UserTable";
import Swal from "sweetalert2";
import "../../table.css";
// import { useNavgate } from "react-router-dom";
import { useUser } from "../../context/UserContext";



const URL = import.meta.env.VITE_SERVER_URL;
// const TOKEN = localStorage.getItem('token')

export default function User() {
	const [dbUsers, setDbUsers] = useState([]);
	const [userId, setUserId] = useState()
	const [total, setTotal] = useState(0);
	const [limit, setLimit] = useState(10)
	const { register, handleSubmit, setValue } = useForm();
	const { logout, token } = useUser()

	useEffect(() => {
		getUsers();
	}, [limit]) // eslint-disable-line react-hooks/exhaustive-deps


	async function getUsers(page = 0) {
		try {
			const response = await axios.get(`${URL}/users?page=${page}&limit=${limit}`);
			const users = response.data.users;
			const total = response.data.total

			setDbUsers(users);
			setTotal(total);

		} catch (error) {
			console.log(error)
			Swal.fire({
				title: "No se pudieron obtener los Usuarios",
				icon: 'error'
			})
		}
	}

	async function deleteUser(id) {
		if (!token) {
			Swal.fire({
				title: "Error",
				text: `No tiene autorizacion para borrar`,
				icon: "error"
			})
			return
		}
		Swal.fire({
			title: "Desea borrar el usuario",
			text: "Realmente desea borrar el usuario",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Borrar",
			cancelButtonText: "Cancelar"
		}).then(async function (resultado) {
			try {
				if (resultado.isConfirmed) {
					const response = await axios.delete(`${URL}/users/${id}`, {
						headers: { Authorization: token }
					})

					Swal.fire({
						title: "Usuario Borrado",
						text: `El Usuario ${response.data.user.name} fue borrado correctamente`,
						icon: "success"
					}
					)
					getUsers();
				}
			} catch (error) {
				console.log(error)
				Swal.fire({
					title: "Error al borrar el usuario",
					text: `El usuario no pudo ser borrado`,
					icon: "error"
				})
				if (error.response.status === 401) {
					Swal.fire({
						title: "Error",
						text: "Se acabo el tiempo",
						icon: "error",
						timer: 1500
					}).then(() => {
						logout();
					});
					return;
				}
			}

		})
	}

	async function submitedData(data) {
		try {
			const formData = new FormData();

			formData.append("name", data.name)
			formData.append("email", data.email)
			formData.append("role", data.role)
			formData.append("bornDate", data.bornDate)

			// si estamos creando un usuario
			if (!userId) {
				formData.append("password", data.password)
			}

			if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
				formData.append("image", data.image[0]);
			}

			// Si estoy editando hace un put 
			if (userId) {
				if (!token) return;
				const response = await axios.put(`${URL}/users/${userId}`, formData, { headers: { Authorization: token } })
				Swal.fire({
					title: "Usuario Editado",
					text: `El Usuario ${response.data.user?.name} fue editado correctamente`,
					icon: "success"
				});
				getUsers();
				setUserId(null);
				setFormValue();
				return;
			}
			// Si no edito hago un post 
			const user = await axios.post(`${URL}/users`, formData);
			Swal.fire({
				title: "Usuario Creado",
				text: `El Usuario ${user.data.user?.name} fue creado correctamente`,
				icon: "success"
			});
			getUsers();
			setFormValue();
		} catch (error) {
			if (error.response.status === 401) {
				Swal.fire({
					title: "Error",
					text: "Se acabo el tiempo",
					icon: "error",
					timer: 1500
				}).then(() => {
					logout();
				});
				return;
			}
			Swal.fire({
				title: "No se creo el usuario",
				text: "Alguno de los datos ingresados no son correctos",
				icon: "error"
			});
		}
	}

	function setFormValue(user) {
		let fechaFormateada = ''
		setUserId(user?._id || null)

		if (user) {
			const fechaObjeto = new Date(user.bornDate);
			fechaFormateada = fechaObjeto.toISOString().substring(0, 10);
		}

		setValue("name", user?.name || "")
		setValue("email", user?.email || "")
		setValue("image", user?.image || "")
		setValue("role", user?.role || "")
		setValue("bornDate", fechaFormateada || "")
		setValue("password", user?.password || "")

	}

	async function handleSearch(e) {
		try {
			const search = e.target.value
			if (search.length <= 2) {
				return getUsers();
			}
			const response = await axios.get(`${URL}/users/search/${search}`)
			const users = response.data.users;
			setDbUsers(users);
		} catch (error) {
			console.log(error)
		}
	}


	return (
		<div className="main-container form ">
			{/* <h1 className="main-title">Usuarios</h1> */}
			<div className="user-section">
				<div className="form-sticky-admin">
					<h2 className="admin-form-title">
						Registro de Usuarios
						{userId && (
							<button className="btn-salir btn" onClick={() => setFormValue()}>
								<i className="fa-solid fa-xmark"></i>
							</button>
						)}
					</h2>
					<form className="user-form" onSubmit={handleSubmit(submitedData)} encType="multipart/form-data">

						<div className="input-group">
							<label className="lbl" htmlFor="name">Nombre</label>
							<input id="name" type="text" className="admin-input" {...register("name")} />

							<label className="lbl" htmlFor="email">e-mail</label>
							<input id="email" type="email" className="admin-input" {...register("email")} />

							<label className="lbl" htmlFor="password">Password</label>
							<input id="password" type="password" className="admin-input" disabled={userId} {...register("password")} />

							<label className="lbl" htmlFor="image">Imagen</label>
							<input id="image" type="file" accept="image/*" className="admin-input" {...register("image")} />

							<label className="lbl" htmlFor="bornDate">Fecha de Nacimiento</label>
							<input id="bornDate" type="date" className="admin-input" {...register("bornDate")} />

							<label className="lbl" htmlFor="role">Role</label>
							<select id="role" className="admin-input" {...register("role")}>
								<option value="USER_ROLE">Usuario</option>
								<option value="CLIENT_ROLE">Cliente</option>
								<option value="ADMIN_ROLE">Administrador</option>
							</select>
							<div className="input-active">
								<label className="lbl" htmlFor="active">Activo</label>
								<input
									type="checkbox"
									className="admin-input-user"
									{...register("active")}
								/>
							</div>
							<div className="btn-container">
								<button type="submit" className={userId ? "btn-form btn-Edit" : "btn-form btn-create"}>
									{
										userId ? "Editar Usuario" : "Añadir Usuario"
									}
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="table-container">
					<div className="flex-between">
						<h2>Tabla de usuario</h2>
						<div className="input-group input-search">
							<input type="text" onKeyUp={handleSearch} />
						</div>
					</div>
					<UserTable users={dbUsers} deleteUser={deleteUser} setFormValue={setFormValue} />
					<div className="pagination-container">
						<div className="page-container">
							{Array.from({ length: Math.ceil(total / limit) }).map((_, idx) => (
								<button key={idx} onClick={() => getUsers(idx)}>
									{idx + 1}
								</button>
							))}
						</div>
						<div className="limit-container">
							<select className="selc" onChange={(e) => setLimit(e.target.value)}>
								<option value={10}>10</option>
								<option value={20}>20</option>
								<option value={50}>50</option>
							</select>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}

