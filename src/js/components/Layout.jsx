import React from 'react';
import Header from './Header.jsx';
import Feed from './Feed.jsx';
import AsideList from './AsideList.jsx';
import Button from './Button.jsx';


export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header title={this.props.title} right={this.props.right} left={this.props.left} lines={this.props.lines} narrow={this.props.narrow} />
        <div className="row"> 
          <Feed content={this.props.content} />
        </div>
      </div>
    )
  }
};
