import React from 'react';
import '../../scss/components/Gand.scss';

export default class Gand extends React.Component {
  constructor(props) {
    super(props);  
  }

  bothTimes(arrivedTime, cpuTime) {
    return (
      <div>
        <span className="tll">{arrivedTime}</span>  
        <span className="cpu-time">{cpuTime}</span>  
      </div>  
    )
  }//end bothTimes

  cpuTime(cpuTime) {
    return (<span className="cpu-time">{cpuTime}</span>)
  }//end bothTimes

  render() { 
    return (
      <div className="gand-container">
        {
          this.props.data.map(({color, processName, arrivedTime, cpuTime, pCPU}, index)=> {
            return (
              <div className="wrap-process" key={index} style={{'left':`${200*(index)+20}px`, 'backgroundColor': `${color}`}} >
                {
                  index === 0 ? this.bothTimes(arrivedTime, cpuTime) : this.cpuTime(pCPU)
                }
              </div>  
            )   
          })
        }
      </div>
    )
  }
};