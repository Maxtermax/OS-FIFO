import React from 'react';
import '../../scss/components/Gand.scss';

export default class Gand extends React.Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <div className="gand-container">
        {
          this.props.data.map((element, index)=> {
            return (
              <div className="wrap-process" key={index} style={{'left':`${200*(index)+20}px`, 'backgroundColor': `#${Math.floor(Math.random()*16777215).toString(16)}`}} >
                <div className="process">P</div>
              </div>  
            )   
          })
        }
      </div>
    )
  }
};