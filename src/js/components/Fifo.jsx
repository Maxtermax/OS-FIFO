import React from 'react';
import '../../scss/components/Fifo.scss';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import $ from 'jquery';


export default class Fifo extends React.Component {
  constructor(self) {    
    super(self);
    this.state = {
      data: this.props.data,
      cpuTime: 0,
      arrivedTime: 0,
      processName: '',
      nameValid: false,
      cpuTimeValid: false,
      arrivedTimeValid: false
    }
    console.log('this.props.algorithm', this.props.algorithm);
  }//end constructor 

  addProcess(e) {
    e.preventDefault();
    let data = this.state.data;
    let process = this.state;
    if(process.nameValid && process.cpuTimeValid && process.arrivedTimeValid) {
      let nameDuplicate = process.data.some(current=> current.processName === process.processName);
      if(nameDuplicate) {
        alert(`Èl proceso ${process.processName}, ya existe`);
      } else {
        data.push({
          processName: process.processName,
          arrivedTime: process.arrivedTime,
          cpuTime: process.cpuTime
        })   
        this.setState({
          data,
          cpuTime: 0,
          arrivedTime: 0,
          processName: '',
          nameValid: false,
          cpuTimeValid: false,
          arrivedTimeValid: false        
        })
        $(this.props.currentPanel).find("#form-add-process")[0].reset();        
      }
   }
  }//end addProcess

  validName(processName) {
    const isName = {
      test:function(processName="") {
        let result = /[A-Za-zñÑ0-9_ ]{1,100}/i.exec(processName);
        if(result) return (result[0].length === processName.length);
        return false;
      }//end test
    }//end isTitle
    let nameValid = isName.test(processName);
    this.setState({nameValid, processName});
    return nameValid;
  }//end validName

  validArrivedTime(arrivedTime) {
    let arrivedTimeValid = false;
    let result = /(?:\d*\.)?\d+/i.exec(arrivedTime);
    if(result) arrivedTimeValid = (result[0].length === arrivedTime.length);
    if(arrivedTimeValid) {
      this.setState({arrivedTimeValid, arrivedTime});
      return true;
    } else {
      return false;
    }
  }//end validArrivedTime
  
  validcpuTime(cpuTime) {
    let cpuTimeValid = false;
    let result = /(?:\d*\.)?\d+/i.exec(cpuTime);
    if(result) cpuTimeValid = (result[0].length === cpuTime.length);
    if(cpuTimeValid) {
      this.setState({cpuTimeValid, cpuTime});
      return true;
    } else {
      return false;
    }
  }//end validcpuTime

  render() {
    return (
      <div className="row large-7 wrap-entry">

        <form onSubmit={this.addProcess.bind(this)} id="form-add-process">
          <div className="row wrap-inputs">
            <div className="columns large-4">
              <span>Nombre del proceso </span>
              <Input type="text" data={this.processName} pattern={this.validName.bind(this)} placeholder="Completa este campo"/>
            </div> 

            <div className="columns large-4">
              <span>{this.props.algorithm === 'Prioridad' ? 'Prioridad' : 'Tiempo de llegada'}</span>
              <Input type="text" pattern={this.validArrivedTime.bind(this)} placeholder="Completa este campo"/>
            </div> 

            <div className="columns large-4">
              <span>Rafaga de cpu</span>
              <Input type="text" pattern={this.validcpuTime.bind(this)} placeholder="Completa este campo"/>
            </div> 
          </div>  

          <div className="row">
            <div className="wrap-btn-add-process columns large-12">
              <Button type="submit" data="Agregar proceso" icon={<i className="material-icons">&#xE03B;</i>} />           
            </div>
          </div>
        </form>


        <table>
          <thead>
            <tr>
              <th>Procesos</th>
              <th>{this.props.algorithm === 'Prioridad' ? 'Prioridad' : 'Tiempo de llegada'}</th>
              <th>Rafaga de cpu</th>
            </tr>
          </thead>
          <tbody>
           {
              (
                this.state.data.map(({processName, cpuTime, arrivedTime}, index)=> {
                  return (
                    <tr key={index}>
                      <td>{processName}</td>
                      <td>{arrivedTime}</td>
                      <td>{cpuTime}</td>
                    </tr>
                  )
                })
              )
           }

          </tbody>
        </table>  


      </div>
    )
  }
};
