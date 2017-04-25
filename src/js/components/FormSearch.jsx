import React from 'react';
import '../../scss/components/FormSearch.scss';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';


export default class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    this.childrens = [];
    this.state = {};
    if(this.props.lift) this.props.lift(this);
  }

  addChildren(child) {
    this.childrens.push(child);
  }

  render() {
    return (
      <div>
        <form className="form-search" onSubmit={this.props.onSubmit.bind(this)}>
          <div className="static-height_search">
            <div className="aling-btn-and-input">
              <Button style="btn-search" onClick={this.props.onSubmit.bind(this)} type="submit"/>
              <Input validateMax={this.props.validateMax} validateMin={this.props.validateMin} defaultMessage={this.props.title} lift={this.addChildren.bind(this)} type="text" pattern={this.props.pattern.bind(this)} placeholder={this.props.placeholder}  title={this.props.title}/>
            </div>
          </div>

          <div className={"row static-height_options "+ `${(this.props.options.length === 0 ? "hide" : "show")}`} >
            {
              this.props.options.map((option, index)=> {
                return (
                  <div className={"columns large-"+(12/this.props.options.length)} key={index}>
                    {option}
                  </div>
                )
              })
            }
          </div>
        </form>
      </div>
    )
  }
};
