import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider} from 'react-cookie';

import Main from 'components/Main.jsx';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

window.onload = function() {
    ReactDOM.render(
        <CookiesProvider><Main/></CookiesProvider>,
        document.getElementById('root')
    );
};
