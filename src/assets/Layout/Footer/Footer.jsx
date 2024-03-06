
import './Footer.css'
import logo from '../../image/Logo/Logo.png'


export default function Footer() {
  return (

    <footer className="main-footer">
      <section className="redes-sociales">
        <ul>
          <li className="social-link">
            <i className="icons fa-brands fa-facebook"></i> <a className="footer-link"
              target="_blank">Facebook</a>
          </li>
          <li className="social-link">
            <i className="icons fa-brands fa-twitter"></i> <a className="footer-link"
              target="_blank">Twitter</a>
          </li>
          <li className="social-link">
            <i className="icons fa-brands fa-instagram"></i> <a className="footer-link"
              target="_blank">Instagram</a>
          </li>
        </ul>
      </section>
      <section className="compania">
        <img className="header-logo" src={logo} alt="Mundos Sublimados Logo" />
        <h2 className="compania-title">Mundos Sublimados</h2>
      </section>
      <section className="contact">
        <ul>
          <li className="social-contact">
            <i className="icons fa-regular fa-envelope"></i><a className="footer-link"
              href="pages/contact.html">info@MundosSublimados.com</a>
          </li>
          <li className="social-contact">
            <i className="icons fas fa-phone"></i><a className="footer-link"
              href="pages/contact.html">+54-11-4144-1646</a>
          </li>
          <li className="social-contact">
            <i className="icons  fas fa-store"></i><a className="footer-link" href="pages/contact.html">Direccion:
              Balcarce 50 CABA</a>
          </li>
        </ul>
      </section>
    </footer>



  )
}
