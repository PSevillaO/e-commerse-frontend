import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../../table.css"
import { ProductTable } from '../../componnets/ProductTable/ProductTable';
import { useUser } from "../../context/UserContext";

const URL = import.meta.env.VITE_SERVER_URL;
// const TOKEN = localStorage.getItem('token')

export default function Product() {
	const { register, handleSubmit, setValue } = useForm();
	const [dbProduct, setdbProduct] = useState([]);
	const [productId, setProductId] = useState();
	const [total, setTotal] = useState(0);
	const [limit, setLimit] = useState(10)
	const [categories, setcategories] = useState([]);
	const { logout, token } = useUser()

	useEffect(() => {
		getProducts();
		getCategories();
	}, [limit]); // eslint-disable-line react-hooks/exhaustive-deps


	async function getProducts(page = 0) {
		try {
			const response = await axios.get(`${URL}/products?page=${page}&limit=${limit}`)

			const products = response.data.products;
			const total = response.data.total

			setdbProduct(products);
			setTotal(total);

		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "No se pudo obtener los productos",
				icon: "error",
			});
		}
	}

	async function getCategories() {
		try {
			const response = await axios.get(`${URL}/categories`)
			const categoriesBD = response.data.categories;

			setcategories(categoriesBD);

		} catch (error) {
			console.log(error)
		}
	}

	async function deleteProduct(id) {
		if (!token) {
			Swal.fire({
				title: "Error",
				text: `No tiene autorizacion para borrar`,
				icon: "error"
			})
			return
		}
		Swal.fire({
			title: "Desea borrar el producto",
			text: "Realmente desea borrar la usuario",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Borrar",
			cancelButtonText: "Cancelar"
		}).then(async function (resultado) {
			try {
				if (resultado.isConfirmed) {
					const response = await axios.delete(`${URL}/products/${id}`, {
						headers: { Authorization: token }
					})

					Swal.fire({
						title: "Producto Borrado",
						text: `El Producto ${response.data.product.title} fue borrado correctamente`,
						icon: "success"
					}
					)
					getProducts();
				}
			} catch (error) {
				Swal.fire({
					title: "Error al borrar el producto",
					text: `El producto no pudo ser borrado`,
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

			formData.append("title", data.title)
			formData.append("info", data.info)
			formData.append("descripcion", data.descripcion)
			formData.append("category", data.category)
			formData.append("price", data.price)
			formData.append("dateCard", data.dateCard)

			if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
				formData.append("image", data.image[0]);
			}

			// Si estoy editando hace un put 
			if (productId) {
				if (!token) return;
				const response = await axios.put(`${URL}/products/${productId}`, formData, { headers: { Authorization: token } })
				const titulo = response.data.title;
				console.log(titulo)
				Swal.fire({
					title: "Producto Editado",
					text: `El Product ${titulo} fue editado correctamente`,
					icon: "success"
				}
				)
				getProducts();
				setProductId(null);
				setFormValue();
				// hago return para que el codigo no continue
				return;
			}

			// Si no edito hago un post 
			const product = await axios.post(`${URL}/products`, formData, { headers: { Authorization: token } });
			console.log(product)
			Swal.fire({
				title: "Producto Creado",
				text: `El Producto ${product.data.products?.title} fue creado correctamente`,
				icon: "success"
			}
			)
			getProducts();
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
				title: "No se creo el producto",
				text: "Alguno de los datos ingresados no son correctos",
				icon: "error"
			})
		}
	}

	function setFormValue(product) {
		let fechaFormateada = ''
		setProductId(product?._id || null)

		if (product) {
			const fechaObjeto = new Date(product.dateCard);
			fechaFormateada = fechaObjeto.toISOString().substring(0, 10);
		}


		setValue("title", product?.title || "")
		setValue("info", product?.info || "")
		setValue("descripcion", product?.descripcion || "")
		setValue("category", product?.category._id || "")
		setValue("price", product?.price || "")
		setValue("dateCard", fechaFormateada)
		setValue("image", product?.image || "")
	}

	async function handleSearch(e) {
		try {
			const search = e.target.value
			if (search.length <= 2) {
				return getProducts();
			}
			console.log(search)

			const response = await axios.get(`${URL}/products/search/${search}`)
			console.log(response)
			const prod = response.data.product;
			setdbProduct(prod);
		} catch (error) {
			console.log(error)
		}
	}
	return (

		<div className="main-container form">
			{/* <h1 className="main-title">Productos</h1> */}
			<div className="product-section">
				<div className="form-sticky-admin">
					<h2 className="admin-form-title">
						Registro de Productos
						{productId && (
							<button className="btn-salir btn" onClick={() => setFormValue()}>
								<i className="fa-solid fa-xmark"></i>
							</button>
						)}
					</h2>
					<form className="product-form " onSubmit={handleSubmit(submitedData)} encType="multipart/form-data">
						<div className="input-group">
							<label className="lbl" htmlFor="title">Titulo</label>
							<input type="text"
								className="admin-input"
								id="title"
								{...register("title")}
							/>
							<label className="lbl" htmlFor="info">Informacion</label>
							<input type="text"
								className="admin-input"
								id="info"
								{...register("info")}
							/>
							<label className="lbl" htmlFor="descripcion">Descripcion</label>
							<textarea
								rows={6}
								className="admin-input"
								id="descripcion"
								{...register("descripcion")}
							></textarea>
							<label className="lbl" htmlFor="category">Categoria</label>
							<select id="categoria" className="admin-input" {...register("category")}>
								{
									categories.map(category => (
										<option key={category._id} value={category._id}>
											{category.name}
										</option>
									))
								}
							</select>
							<label className="lbl" htmlFor="price">Precio</label>
							<input
								type="number"
								className="admin-input"
								id="price"
								{...register("price")}
							/>
							<label className="lbl" htmlFor="dateCard">Fecha</label>
							<input
								type="date"
								className="admin-input"
								id="dateCard"
								{...register("dateCard")}
							/>
							<label className="lbl" htmlFor="image">Imagen</label>
							<input id="image" type="file" accept="image/*" className="admin-input" {...register("image")} />

							<div className="btn-container">
								<button type="submit" className={productId ? "btn-form btn-Edit" : "btn-form btn-create"}>
									{
										productId ? "Editar Producto" : "Añadir Producto"
									}
								</button>
							</div>

						</div>
					</form>
				</div>
				<div className="table-container">
					<div className="flex-between">
						<h2>Tabla de Productos</h2>
						<div className="input-group input-search">
							<input type="text" onKeyUp={handleSearch} />
						</div>
					</div>
					{/* <div className="product-table"> */}
					<ProductTable products={dbProduct} deleteProduct={deleteProduct} setFormValue={setFormValue} />
					<div className="pagination-container">
						<div className="page-container">
							{Array.from({ length: Math.ceil(total / limit) }).map((_, idx) => (
								<button key={idx} onClick={() => getProducts(idx)}>
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
					{/* </div> */}
				</div>
			</div>
		</div>

	);
}
