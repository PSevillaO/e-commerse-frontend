import './Contact.css'
import Swal from 'sweetalert2';
import { useRef, useState } from 'react';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    obs: ''
  });

  const handelsubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (!form.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    Swal.fire({
      title: "Mensaje Enviado",
      text: "El mensaje fue enviado correctamente",
      icon: "success"
    }).then(() => {
      // Limpiar los valores de los inputs
      setFormData({
        fullname: '',
        email: '',
        obs: ''
      });
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <main className="main-container form">
      <h1 className="main-title">Contacto</h1>
      <section className="main-section">
        <div className='form-sticky'>
          <form className="contact-form" ref={formRef} onSubmit={handelsubmit}>
            <div className="input-group-cont ">
              <div className="input-wrapper-cont">
                <label className="label-register-cont" htmlFor="inputName">Nombre</label>
                <input className="input-cont" type="text" name="fullname" id="inputName" placeholder="Nombre" title="Ingrese el Nombre completo" required pattern="^[a-zA-Z]+( [a-zA-Z]+)*$" value={formData.fullname} onChange={handleChange} />
              </div>

              <div className="input-wrapper-cont">
                <label className="label-register-cont" htmlFor="inputCorreo">Correo Electrónico</label>
                <input className="input-cont" type="email" name="email" id="inputCorreo" placeholder="E-mail" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" value={formData.email} onChange={handleChange} />
              </div>

              <div className="input-wrapper-cont">
                <label className="label-register-cont" htmlFor="inputObs">Mensaje</label>
                <textarea className="input-cont" name="obs" id="inputObs" cols="50" rows="10" required value={formData.obs} onChange={handleChange}></textarea>
              </div>

              <div className='btn-container'>
                <button className="btn-form btn-create btn-contact" type="submit">Enviar</button>
              </div>
            </div>
          </form>
        </div>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.554682681366!2d-58.5535987246416!3d-34.64069217294112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc8097bef63f1%3A0xe2d55bf06fc539a5!2sBalcarce%2050%2C%20Ramos%20Mej%C3%ADa%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1693265306861!5m2!1ses!2sar"
            width="100%" height="100%" style={{ border: '0' }} allowfullscreen="" loading="lazy"  >
          </iframe>
        </div>
      </section>
    </main>
  );
}
