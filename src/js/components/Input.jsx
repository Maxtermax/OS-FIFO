import React from 'react';
import '../../scss/components/Input.scss';

export default class InputLocation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      warning: false,
      msgStyle: "valid",
      valid: false,
      title: this.props.title,
      value: this.dateFormatISO(this.props.value || null),
      whantBtnSubmit: this.props.whantBtnSubmit,
      type: this.props.type,
      defaultMessage: this.props.defaultMessage
    };
  }

  componentDidMount() {
    if(this.props.lift) this.props.lift(this);
  }

  bindValue(self) {
    return function (e) {
      let canditate = e.target.value;
      if(canditate.length === 0) return self.showWarning();
      let isValid = self.validate(canditate);
      if(isValid) {
        self.hideMsg();
        self.setState({value: canditate, valid: true, defaultMessage: self.props.defaultMessage})
      } else {
        self.showError();
      }
    };
  }

  validate(canditate = "") {
    let min = this.props.validateMin;
    let max = this.props.validateMax
    if(min && !max) {
      //in case with just minimum
      return this.props.pattern(canditate) && canditate.length >= min;
    } else if(!min && max){
      //in case with just maximum
      return this.props.pattern(canditate) && canditate.length <= max;
    } else if(min && max) {
      //in case of both
      return this.props.pattern(canditate) && canditate.length >= min && canditate.length <= max;
    } else {
      //in case no min no max
      return this.props.pattern(canditate);
    }
  }

  hideMsg() {
    this.setState({error: false, warning: false, msgStyle: 'valid'})
  }

  showError() {
    this.setState({defaultMessage: '', error: true, warning: false, msgStyle: 'invalid', valid: false})
  }

  showWarning() {
    this.setState({defaultMessage: '',error: false, warning: true, msgStyle: 'empty', valid: false})
  }

  dateFormatISO(date) {
    if(!date) return '';
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  updateDate(e) {
    let value = e.target.value;
    this.setState({value, valid: true});
  }

  inputDate() {
    return (
      <div className="search-by_date">
        <label>
          <i className="material-icons">&#xE916;</i>
        </label>
        <input type="date" className="input_start_at" title={this.state.title} value={this.state.value || ''} onChange={this.updateDate.bind(this)}/>
      </div>
    )
  }

  inputText(settings) {
    let defaultMessage = "";
    let hideDefault = "hide";
    if(settings.defaultMessage) {
      hideDefault = "show";
      defaultMessage = settings.defaultMessage;
    }

    return (
      <div className="search-by">
        <input type={this.state.type} autoComplete={this.state.autoComplete} className={"input-search "+(this.state.msgStyle )} title={this.state.title} placeholder={this.props.placeholder} onChange={this.bindValue(this)} />
        <small className={"input-msg default "+hideDefault}>{defaultMessage}</small>
        <small className={"input-msg error "+settings.msgError} >Campo invalido</small>
        <small className={"input-msg warning "+settings.msgWarning}>Campo vacio</small>
      </div>
    )
  }

  render() {
    let isDate = this.props.type === "date";
    let msgError = !this.state.error ? "hide" : "";
    let msgWarning = !this.state.warning ? "hide" : "";
    let pushMsg = this.state.icon === false ? "":"push-msg";
    let defaultMessage = this.state.defaultMessage;

    return (
      <div className="show-inline wrap-input">
        {
          isDate ? this.inputDate() : this.inputText({msgWarning, msgError, pushMsg, defaultMessage})
        }
      </div>
    )
  }
};
