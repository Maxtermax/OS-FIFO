import React from 'react';

export default class CheckOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      times: 0
    };
    if(this.props.lift) this.props.lift(this);
  }

  getOptions() {
    let name = this.props.name;
    let id = this.props.identification;
    if(!name) return;
    return (
      <div className={`check-options ${name}`}>
        <div className="wrap-options" onClick={this.props.updateCheck.bind(this)}>
          <i className={`material-icons ${this.state.checked ? '': 'hide'}` }>&#xE837;</i>
          <i className={`material-icons ${this.state.checked ? 'hide': ''}`}>&#xE836;</i>
          <span>{name}</span>
        </div>
      </div>
     )
  }

  render() {
    return this.getOptions();
  }
};
