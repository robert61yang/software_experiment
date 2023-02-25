// TODO:
// In this js-file, you should define a new component "Reset" extending from "Component" and import its css-file.
// Besides, in the component, you shold fire a event if this button is clicked.

import Component from './component.js';

import './reset.css';

export default class Reset extends Component{
    
    constructor(root){
        super(root);

        root.addEventListener("click",this.ResetClick.bind(this));
    }

    ResetClick(firer){
        this.fire('reset');
    }
}
