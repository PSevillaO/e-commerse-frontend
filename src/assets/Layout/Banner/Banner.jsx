// import React from 'react'
import './Banner.css'
import banner from '../../../assets/banner/fondo4.jpg'
import bannerMin from '../../../assets/banner/fondo5.jpg'

const Banner = () => {
    return (
        <div className="main-banner">
            <figure className='banner-img-container'>
                <picture>
                    <source className='banner-img' srcSet={banner} media="(width > 768px)" />
                    <img className='banner-img' src={bannerMin} alt='Banner Main' />
                </picture>
            </figure>

            <div className="banner-info">
                <h1 className="banner-title">Mundos Sublimados</h1>
                <p className="banner-text">
                    Revive tus escenas anime preferidas en cada sorbo. Nuestras tazas de sublimación capturan la esencia de          tus personajes favoritos, añadiendo diversión y emoción a tu rutina diaria. ¡Elige tu taza única hoy!
                </p>
            </div>
        </div>

    )
}

export default Banner