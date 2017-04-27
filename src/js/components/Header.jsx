import React from 'react';
import '../../scss/components/Header.scss';
import Title from './Title.jsx';

export default class Header extends React.Component {
  render() {
    return (
	    <Title data={this.props.title} lines={this.props.lines} narrow={this.props.narrow} left={this.props.left} right={this.props.right}/>
    )
  }
};
