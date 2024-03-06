import { ProductTableRow } from "../ProductTableRow/ProductTableRow"

export const ProductTable = ({ products, deleteProduct, setFormValue }) => {

    return (
        <>
            <table className='product-table'>
                <thead>
                    <tr>
                        <th>imagen </th>
                        <th>Title</th>
                        <th>Informacion</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Fecha</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(prod => (
                            <ProductTableRow key={prod._id} prod={prod} deleteProduct={deleteProduct} setFormValue={setFormValue} />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
