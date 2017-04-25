import React from 'react';
import CheckOptions from './CheckOptions.jsx';
import '../../scss/components/CheckGroup.scss';

export default class CheckGroup extends React.Component {
  constructor(props) {
    super(props);
    this.childrens = [];
    if(this.props.lift) this.props.lift();
  }

  updateCheck(parent) {
    return function childScope() {
      let child = this;
      if(parent.props.acceptBoth) {
        //mark single, and leave the other in his current state
        let current = parent.childrens[child.props.identification];
        if(current.state.checked) {
          current.setState({checked: false});
        } else {
          current.setState({checked: true});
        }

        if(parent.props.onClick) parent.props.onClick(current, parent);
      } else {
        //mark single at the time
        let clicked;
        parent.childrens.forEach((current, index)=> {
          let isMarked = index === child.props.identification;
          if(isMarked) clicked = current;
          current.setState({checked: isMarked})
        })
        if(parent.props.onClick) parent.props.onClick(clicked, parent);
      }
    }
  }

  pickChilds(parent) {
    return ((child)=> {
      parent.childrens.push(child);
    });
  }

  render() {
    this.state = {};
    return (
      <div className="wrap-search-options">
        {
          this.props.options.map((option, index)=> <CheckOptions lift={this.pickChilds(this)} updateCheck={this.updateCheck(this)} key={index} identification={index} name={option.name} checked={option.checked}/>)
        }
      </div>
    )
  }
}
