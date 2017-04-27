import React from 'react';
import '../../scss/components/Feed.scss';

export default class Feed extends React.Component {
  render() {
    return (
      <div className="row">
        {
          this.props.content.map((data, index)=> {
            return (<div key={index}>{data}</div>)
          })
        }
      </div>
    )
  }
};
