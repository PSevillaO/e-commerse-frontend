import { UserTableRow } from "../UserTableRow/UserTableRow"

export const UserTable = ({ users, deleteUser, setFormValue }) => {

    return (
        <>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>imagen </th>
                        <th>Nombre Completo</th>
                        <th>e-mail</th>
                        <th>Nacimiento</th>
                        <th>Role</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(usr => (
                            <UserTableRow key={usr._id} usr={usr} deleteUser={deleteUser} setFormValue={setFormValue} />
                        ))
                    }
                </tbody>
            </table>

        </>

    )
}
