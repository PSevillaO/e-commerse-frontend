// import { Spinner } from "reactstrap";
// import 'bootstrap/dist/css/bootstrap.min.css'
import loading from '../../../src/assets/image/Loading.gif'


export default function Loading() {
    return (
        <>
            {/* <Spinner color="danger" /> */}
            <img src={loading} alt="Loading..." />
        </>

    )
}
