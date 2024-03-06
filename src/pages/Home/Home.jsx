import Banner from "../../assets/Layout/Banner/Banner"
import { ProductCardsContainer } from "../../componnets/ProductCardsContainer/ProductCardsContainer"

export default function Home() {
    return (
        <>
            <Banner />
            <div className="main-container">

                <ProductCardsContainer />

            </div>
        </>
    )
}
