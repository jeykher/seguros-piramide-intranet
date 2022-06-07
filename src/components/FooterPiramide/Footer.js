import React from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

import './Footer.scss';

import PiramideBrand from '../PiramideBrand/PiramideBrand';

// import FooterSocialMediaIconAnimation from '../../animations/Footer/FooterSocialMediaIconAnimation';

const Footer = () => {
    return (
        <>
            <div className="ipos-footer">
                <div className="ipos-footer-block-links">
                    <Link 
                        to="/"
                        className="ipos-footer-piramide-brand-container"
                    >
                        <PiramideBrand 
                            width="60"
                            height="70"
                        />
                    </Link>
                    <div className="ipos-footer-block-link-container ipos-footer-block-link-container-1">
                        <h2 className="ipos-footer-block-link-title">Productos</h2>
                        <div className="ipos-footer-block-link-wrapper">
                            <Link
                                className="ipos-footer-block-link"
                                to="/"
                            >
                                Personales
                            </Link>
                            <Link
                                className="ipos-footer-block-link"
                                to="/"    
                            >
                                Empresariales
                            </Link>
                        </div>
                    </div>
                    <div className="ipos-footer-block-link-container ipos-footer-block-link-container-2">
                        <h2 className="ipos-footer-block-link-title">Contáctanos</h2>
                        <div className="ipos-footer-block-link-wrapper">
                            <Link
                                className="ipos-footer-block-link"
                                to="/"
                            >
                                0800SPIRAMI (7747264)
                            </Link>
                            <Link
                                className="ipos-footer-block-link"
                                to="/"
                            >
                                0212 2190400
                            </Link>
                            <Link
                                className="ipos-footer-block-link"
                                to="/"
                            >
                                0212 2193698
                            </Link>
                            <Link
                                className="ipos-footer-block-link"
                                to="/"
                            >
                                0212 3194940
                            </Link>
                        </div>
                    </div>
                    <div className="ipos-footer-block-link-container ipos-footer-block-link-container-3">
                        <h2 className="ipos-footer-block-link-title">Aplicaciones Relevantes</h2>
                        <div className="ipos-footer-block-link-wrapper">
                            <Link
                                className="ipos-footer-block-link"
                                to="/"
                            >
                                Acsel
                            </Link>
                            <Link
                                className="ipos-footer-block-link"
                                to="/"
                            >
                                Sysaid
                            </Link>
                            <Link
                                className="ipos-footer-block-link"
                                to="/"
                            >
                                Sistema Requisición Materiales
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="ipos-footer-separator-container">
                    <hr className="ipos-footer-separator" />
                </div>
                <div className="ipos-footer-social-media">
                    <h3 className="ipos-footer-social-media-title">
                        Síguenos
                    </h3>
                    <div className="ipos-footer-social-media-container">
                        <div
                            
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                        >
                            <FaTwitter 
                                className="ipos-footer-social-icon"
                            />
                        </div>
                        <div
                            
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                        >
                            <FaInstagram 
                                className="ipos-footer-social-icon"
                            />
                        </div>
                        <div
                            
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                        >
                            <FaYoutube 
                                className="ipos-footer-social-icon"
                            />
                        </div>
                    </div>
                </div>
                <div className="ipos-footer-copyright-container">
                    <div className="ipos-footer-copyright-wrapper">
                        <p>
                            © 2021 Pirámide Seguros, C.A - Todos los derechos reservados, RIF. J-00106474-5. Inscrita en la Superintendencia de la Actividad Aseguradora bajo el número 80. Publicidad aprobada por la Superintendencia de la Actividad Aseguradora bajo el N° 15.091
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;