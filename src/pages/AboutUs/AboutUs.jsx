import logo from '../../assets/image/Logo/Logo.png'
import './AboutUs.css'

export default function AboutUs() {
  return (

    <main className="main-container">
      <div className="about-wrapper">
        <div className="about-left">
          <div className="about-left-content">
            <div className="left-div" >
              <div className="shadow">
                <div className="about-img ">
                  <img src={logo} alt="about image" />
                </div>
                <div className="about-img-1">
                  <img className="logo-left" src={logo} alt="about image" />
                </div>


              </div>

              <h2>Mundos Sublimados</h2>
              <h3>Sublimación</h3>
            </div>

            <ul className="icons-about">
              <li><i className="fab fa-facebook-f"></i></li>
              <li><i className="fab fa-twitter"></i></li>
              <li><i className="fab fa-linkedin"></i></li>
              <li><i className="fab fa-instagram"></i></li>
            </ul>
          </div>

        </div>

        <div className="about-right">
          <h1>Hola<span>!</span></h1>
          <h2>Esto es quién soy y lo qué hago</h2>
          <div className="about-btns">
            <button type="button" className="btn-about btn-pink">Resumen / CV</button>
            <button type="button" className="btn-about btn-white">Git hub</button>
          </div>

          <div className="about-para">
            <p>En MundosSublimados, somos apasionados por llevar tu amor por el anime a tu vida cotidiana a través de nuestras creaciones únicas. Nos especializamos en la sublimación de tazas y productos afines con diseños inspirados en tus personajes y series de anime favoritas.</p>
            <p>Creatividad Infinita: En el corazón de nuestra empresa se encuentra la creatividad desenfrenada. Nos esforzamos por capturar la esencia y la magia del anime en cada taza que creamos.</p>
            <p>Calidad Inigualable: Cada taza que sale de nuestro taller es una obra maestra de calidad y durabilidad. Utilizamos los mejores materiales y técnicas de sublimación de vanguardia para garantizar que nuestros productos sean verdaderas piezas de colección.</p>
            <p>Satisfacción del Cliente: Tu satisfacción es nuestra prioridad número uno. Nos esforzamos por brindarte una experiencia de compra excepcional, desde el momento en que exploras nuestro catálogo hasta el momento en que sostienes tu taza de anime en tus manos.</p>

          </div>
        </div>
      </div>
    </main>

  )
}
