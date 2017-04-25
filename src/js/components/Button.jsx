import React from 'react';
import '../../scss/components/Button.scss';


export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      type: this.props.type,
      style: this.props.style,
      disabled: this.props.disabled || false
    };
  }//end constructor

  componentDidMount() {
    if(this.props.lift) this.props.lift(this);
  }//end componentDidMount

  btnLoader() {
    return (
      <div className="container-loader"></div>
    )
  }//end btnLoader

  btnCancel() {
    return (
      <div>
        <span>{this.state.data}</span>
        <i className="material-icons">&#xE888;</i>
      </div>
    )
  }//end btnCancel

  btnConfirm() {
    return (
      <div>
        <span>{this.state.data}</span>
        <i className="material-icons">&#xE163;</i>
      </div>
    )
  }//end btnConfirm

  btnLoadMore() {
    return (
      <div>
        <span>{this.state.data || "load more"}</span>
        <i className="material-icons">&#xE8B6;</i>
      </div>
    )
  }//end btnLoadMore


  btn(icon = "") {
    return (
      <div className={icon ? "": "noButton"}>
        {icon}
        <span>{this.state.data}</span>
      </div>
    )
  }//end btnAdd

  btnSearch() {
    return (
      <div className="show-inline">
        <i className="material-icons">&#xE8B6;</i>
      </div>
    )
  }//end btnSearch

  btnSend() {
    return (
      <div className="show-inline">
        <i className="material-icons">&#xE163;</i>
      </div>
    )
  }//end btnSend

  render() {
    let style = this.state.style;
    let button;
    if(style === "btn-load") button = this.btnLoader();
    if(style === "btn-loadmore") button = this.btnLoadMore();
    if(style === "btn-cancel") button = this.btnCancel();
    if(style === "btn-confirm") button = this.btnConfirm();
    if(style === "btn-search") button = this.btnSearch();
    if(style === "btn-send") button = this.btnSend();
    if(!button) button = this.btn(this.props.icon);//default

    return (
      <div className="show-inline wrap-btn">
        <button className={"btn "+style} disabled={this.state.disabled} type={this.state.type} onClick={this.props.onClick}>
          {button}
        </button>
      </div>
    )
  }
};
