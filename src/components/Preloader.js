import React from 'react';
import './Preloader.css';
import logo from '../img/logo.svg';

/**
 * Компонент прелоадера.
 */
const Preloader = () => <img src={logo} className="preloader-logo" alt="logo" />;


export default Preloader;