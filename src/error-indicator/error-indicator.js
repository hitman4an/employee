import React from 'react';
import './error-indicator.css';
import icon from './pizza.png';

import './error-indicator.css';

import { Link } from 'react-router-dom';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
        <span className="boom">УПС!</span>
        <span>
            Что-то сломалось(((
        </span>
        <span><b>Но вы ведь все равно возьмете меня на работу?</b></span>
        <img src={icon} alt="pizza"/>

        <span>
            <Link to="/">Вернуться на главную страницу</Link>
        </span>

        </div>
    );
};

export default ErrorIndicator;