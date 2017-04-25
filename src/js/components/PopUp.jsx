import React from 'react';
import $ from 'jquery';
import Title from '../components/Title.jsx';
import Button from '../components/Button.jsx';
import '../../scss/components/PopUp.scss';

window.foundation = $.fn.foundation = require("exports?Foundation!../../../node_modules/foundation-sites/js/foundation.core.js");
require("expose?Reveal!../../../node_modules/foundation-sites/js/foundation.reveal.js");
require("expose?Keyboard!../../../node_modules/foundation-sites/js/foundation.util.keyboard.js");
require("expose?Box!../../../node_modules/foundation-sites/js/foundation.util.box.js");
require("expose?Triggers!../../../node_modules/foundation-sites/js/foundation.util.triggers.js");
require("expose?MediaQuery!../../../node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
require("expose?Motion!../../../node_modules/foundation-sites/js/foundation.util.motion.js");


export default class PopUpConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.childrens = {};
    this.modal = {};
    this.state = {
      display: this.props.display
    }
  }

  componentDidMount() {
    let id = this.props.id;
    let modal = $(`#${id}`);
    this.modal = new Foundation.Reveal(modal);

    modal.on("closed.zf.reveal",(e)=> {
     // this.childrens.forEach(child => child.resetState());
    })
    if(this.props.lift) this.props.lift(this);
    if(this.state.display) this.modal.open();
    if(!this.state.display) this.modal.close();
  }

  addChildren(name, child) {
    this.childrens[name] = child;
  }

  warningTemplate() {
    return (
      <div>
        <Title data={<i className="material-icons warning-icon">&#xE002;</i>} clean={true}/>
        <p className="wrap-popup-data">
         {this.props.data}
        </p>
        <Button style="btn-warning" lift={this.addChildren.bind(this, "btn-warning")} onClick={this.props.onClose.bind(this, this.modal)} type="button" data="CERRAR"/>
      </div>
    )
  }

  formTemplate() {
    return (
      <div>
        <Title data={this.props.title} clean={true}/>
         {this.props.data}
      </div>
    )
  }

  loadTemplate() {
    return (
      <div>
        <div className="wrap-popup-loader"></div>
        <p className="wrap-popup-data">
          {this.props.data}
        </p>
      </div>
    )
  }

  errorTemplate() {
    return (
      <div>
        <Title data={<i className="material-icons error-icon">&#xE5C9;</i>} clean={true}/>
        <p className="wrap-popup-data">
          {this.props.data}
        </p>
        <Button style="btn-cancel" lift={this.addChildren.bind(this, "btn-cancel")} onClick={this.props.onClose.bind(this, this)} type="button" data="CERRAR"/>
      </div>
    )
  }

  confirmTemplate() {
    return (
      <div>
        <Title data="¿ Estas seguro/a ?" clean={true}/>
        <div className="row">
          <div className="columns large-6">
            <Button style="btn-cancel" lift={this.addChildren.bind(this, "btn-cancel")} onClick={this.props.onClose.bind(this, this)} type="button" data="CANCELAR"/>
          </div>

          <div className="columns large-6">
            <Button style="btn-confirm" lift={this.addChildren.bind(this, "btn-confirm")} onClick={this.props.onConfirm.bind(this, this)} type="button" data="ACEPTAR"/>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let result;
    let style = this.props.style || "hide";
    if(style === "confirm") result = this.confirmTemplate();
    if(style === "error") result = this.errorTemplate();
    if(style === "form") result = this.formTemplate();
    if(style === "warning") result = this.warningTemplate();
    if(style === "load") result = this.loadTemplate();

    return (
      <div className="reveal popup text-center" id={this.props.id} data-reveal>
        {result}
      </div>
    )
  }
};
