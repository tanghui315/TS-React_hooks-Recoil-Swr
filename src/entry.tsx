import React from 'react'
import ReactDOM from 'react-dom'
import './Mock/Index'

import App from './App';
var reactapp = document.createElement("div");
document.body.appendChild(reactapp);
ReactDOM.render(<App/>, reactapp);
