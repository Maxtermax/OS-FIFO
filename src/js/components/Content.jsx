import React from 'react';
import '../../scss/components/Content.scss';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import Fifo from '../components/Fifo.js';
import Sjf from '../components/Sjf.js';
import Priority from '../components/Priority.js';
import RoundRobin from '../components/RoundRobin.js';

import Gand from '../components/Gand.jsx';
import $ from 'jquery';

export default class Content extends React.Component {
  constructor(props) {
    super(props);   this.state = {
      data: this.props.data,
      dataSolved: [],
      timeWaits: [],
      cpuTime: 0,
      arrivedTime: 0,
      Quantum: 0,
      processName: '',
      nameValid: false,
      cpuTimeValid: false,
      arrivedTimeValid: false,
      QuantumValid: false
    }

  }//end constructor



  addProcess(e) {
    e.preventDefault();
    let self = this;
    let data = this.state.data;
    let process = this.state;

    if(this.props.algorithm === "Round Robin" && process.QuantumValid && process.nameValid && process.cpuTimeValid) {
      let nameDuplicate = process.data.some(current=> current.processName === process.processName);
      if(nameDuplicate) {
        alert(`El proceso ${process.processName}, ya existe`);
      } else {
        data.push({
          processName: process.processName,
          Quantum: process.Quantum,
          cpuTime: process.cpuTime,
          originalIndex: (data.length),
          color: self.randomColor()
        })
        self.setState({
          data,
          cpuTime: 0,
          Quantum: process.Quantum,
          processName: '',
          nameValid: false,
          cpuTimeValid: false
        })

        let currentPanel = self.props.currentPanel;
        $(currentPanel).find("#form-add-process")[0].reset();
        $(currentPanel).find("#form-add-process").find(".wrap-quantum").find("input").val(process.Quantum);

        if(self.state.data.length) $(currentPanel).find(".wrap-btn-calc").removeClass("hide");
        $(currentPanel).find(".wrap-gand").addClass("hide");
        $(currentPanel).find(".wrap-result-table").addClass("hide");
      }
    } else if(process.nameValid && process.cpuTimeValid && process.arrivedTimeValid) {
      let nameDuplicate = process.data.some(current=> current.processName === process.processName);
      if(nameDuplicate) {
        alert(`El proceso ${process.processName}, ya existe`);
      } else {
        data.push({
          processName: process.processName,
          arrivedTime: process.arrivedTime,
          cpuTime: process.cpuTime,
          originalIndex: (data.length),
          color: self.randomColor()
        })
        self.setState({
          data,
          cpuTime: 0,
          arrivedTime: 0,
          processName: '',
          nameValid: false,
          cpuTimeValid: false,
          arrivedTimeValid: false
        })
        let currentPanel = self.props.currentPanel;
        $(currentPanel).find("#form-add-process")[0].reset();
        if(self.state.data.length) $(currentPanel).find(".wrap-btn-calc").removeClass("hide");
        $(currentPanel).find(".wrap-gand").addClass("hide");
        $(currentPanel).find(".wrap-result-table").addClass("hide");
      }
   }
  }//end addProcess

  validName(processName) {
    const isName = {
      test:function(processName="") {
        let result = /^(\S)[A-Za-zñÑ0-9_ ]{1,100}/i.exec(processName);
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

  validQuantum(Quantum) {
    let QuantumValid = false;
    let result = /(?:\d*\.)?\d+/i.exec(Quantum);
    if(result) QuantumValid = (result[0].length === Quantum.length);
    if(QuantumValid) {
      this.setState({QuantumValid, Quantum});
      $(".wrap-quantum").find("input").attr("disabled", true);
      return true;
    } else {
      return false;
    }
  }//end validQuantum

  checkWrongData(results, $panel) {
    let fails = [];
    let fail = results.procesos.some((result)=>{
      if(result.wrongEntry) {
        fails.push(result);
        return true;
      }
    })

    if(fail) {
      fails.forEach((wrongElement)=> {
        alert(`Error el tiempo de llegada del proceso: ${wrongElement.processName} no puede ser mayor que el tiempo de respuesta anticipado`)
      })
      $panel.find(".wrap-reset").removeClass("hide");
      $panel.find(".wrap-btn-calc").addClass("hide");
      return true;
    }
    return false;
  }//end checkWrongData

  updateToSolved(results) {
    this.setState({
      dataSolved: results.procesos,
      timeWaits: results.timeWaits,
      timeWaitAverage: results.timeWaitAverage,
      timeCPUAverage: results.timeCPUAverage
    })
  }//end updateToSolved

  calculate() {
   let currentPanel = this.props.currentPanel;
   let $panel = $(currentPanel);
    let algorithm = this.props.algorithm;
    let pickData = this.state.data.map(({arrivedTime, cpuTime, color, processName, originalIndex, Quantum})=> {
      if(algorithm === "Round Robin") {
        return {arrivedTime: 0, cpuTime, originalIndex, color, processName, Quantum}
      } else {
        return {arrivedTime, cpuTime, originalIndex, color, processName}
      }
    })

    if(algorithm === "Fifo") {
      let calc = new Fifo(pickData);
      let results = calc.resolve();
      let fail = this.checkWrongData(results, $panel);
      if(fail) return;
      this.updateToSolved(results);
    } else if(algorithm === "Sfj") {
      let sjf = new Sjf(pickData);
      let results = sjf.resolve();
      let fail = this.checkWrongData(results, $panel);
      if(fail) return;
      this.updateToSolved(results);
    } else if(algorithm === "Prioridad") {
      pickData.forEach(element => element.priority = element.arrivedTime);
      let priority = new Priority(pickData);
      let results = priority.resolve();
      let fail = this.checkWrongData(results, $panel);
      if(fail) return;
      this.updateToSolved(results);
    } else if(algorithm === "Round Robin") {
      let round = new RoundRobin(pickData);
      let results = round.resolve();

      let fail = this.checkWrongData(results, $panel);
      if(fail) return;
      this.updateToSolved(results);
    }

    $panel.find(".wrap-gand").removeClass("hide");
    $panel.find(".wrap-result-table").removeClass("hide");
    $panel.find(".wrap-btn-calc").addClass("hide");
  }//end calculate

  changeColor(index) {
    let self = this;
    let color = $(self.props.currentPanel).find(".input-color")[index].value;
    self.state.data[index]['color'] = color;
    let dataSolved = self.state.dataSolved;
    dataSolved.map((solved)=> {
      let pick = (solved.originalIndex === index);
      if(pick) solved.color = color;
      return solved;
    })

    self.setState({data: self.state.data, dataSolved});
  }//end changeColor

  randomColor() {
    return `#${Math.random().toString(16).substr(-6)}`;
  }//end randomColor

  reset() {
    this.setState({
      data: [],
      dataSolved: [],
      cpuTime: 0,
      arrivedTime: 0,
      Quantum: 0,
      processName: '',
      nameValid: false,
      QuantumValid: false,
      cpuTimeValid: false,
      arrivedTimeValid: false
    })
    let currentPanel = this.props.currentPanel;
    $(currentPanel).find(".wrap-gand").addClass("hide");
    $(currentPanel).find(".wrap-result-table").addClass("hide");
    if(this.props.algorithm === "Round Robin") {
      let $inputQuantum = $(".wrap-quantum").find("input");
      $inputQuantum.attr("disabled", false);
      $inputQuantum.val("");
    }
  }//end reset

  resolveResults() {
    if(this.props.algorithm === "Round Robin") {
      let timeWaits = this.state.timeWaits;
      return (
        this.state.timeWaits.map(({pCPU, timeWait, processName}, index)=> {
          return (
            <tr key={index}>
              <td>{processName}</td>
              <td>{timeWait}</td>
              <td>{pCPU}</td>
            </tr>
          )
        })
      )
    } else {
      return (
        this.state.dataSolved.map(({pCPU, timeWait, processName}, index)=> {
          return (
            <tr key={index}>
              <td>{processName}</td>
              <td>{timeWait}</td>
              <td>{pCPU}</td>
            </tr>
          )
        })
      )
    }
  }

  render() {
    return (
      <div className="row large-7 wrap-entry">

        <form onSubmit={this.addProcess.bind(this)} id="form-add-process">
          <div className="row wrap-inputs">
            <div className="columns large-4">
              <span>Nombre del proceso </span>
              <Input type="text" data={this.processName} pattern={this.validName.bind(this)} placeholder="Completa este campo"/>
            </div>


            <div className={this.props.algorithm === "Round Robin" ? "hide" : "columns large-4"}>
              <span>{this.props.algorithm === 'Prioridad' ? 'Prioridad' : 'Tiempo de llegada'}</span>
              <Input type="text" pattern={this.validArrivedTime.bind(this)} placeholder="Completa este campo"/>
            </div>

            <div className="columns large-4">
              <span>Rafaga de cpu</span>
              <Input type="text" pattern={this.validcpuTime.bind(this)} placeholder="Completa este campo"/>
            </div>


            <div className={this.props.algorithm === "Round Robin" ? "wrap-quantum columns large-4": "hide"}>
              <span>Quantum</span>
              <Input type="text" pattern={this.validQuantum.bind(this)} placeholder="Completa este campo"/>
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
              <th className={this.props.algorithm === "Round Robin" ? "hide" : ""}>{this.props.algorithm === 'Prioridad' ? 'Prioridad' : 'Tiempo de llegada'}</th>
              <th>Rafaga de cpu</th>
            </tr>
          </thead>
          <tbody>
           {
              (
                this.state.data.map(({processName, cpuTime, arrivedTime, color}, index)=> {
                  return (
                    <tr key={index}>
                      <td>
                       <input type="color" className="input-color" defaultValue={color} onChange={this.changeColor.bind(this, index)} />{processName}
                      </td>
                      <td className={this.props.algorithm === "Round Robin" ? "hide" : ""}>{arrivedTime}</td>
                      <td>{cpuTime}</td>
                    </tr>
                  )
                })
              )
           }

          </tbody>
        </table>

        <div className="row">
          <div className="wrap-btn-calc columns large-4 hide">
            <Button type="button" data="Calcular" onClick={this.calculate.bind(this)} style="btn-confirm"  />
          </div>
        </div>


        <div className="row wrap-gand hide wrap-reset">
          <div className="columns large-4">
            <Button type="button" data="Reset" onClick={this.reset.bind(this)} style="btn-reset" icon={<i className="material-icons">&#xE863;</i>} />
          </div>
        </div>


        <div className="row wrap-gand hide">
          <Gand data={this.state.dataSolved}/>
        </div>

        <div className="row wrap-result-table hide">

          <table>
            <thead>
              <tr>
                <th>Proceso</th>
                <th>Tiempo de espera</th>
                <th>Tiempo de ejecucion</th>
              </tr>
            </thead>
            <tbody>
             {
                this.resolveResults()
             }
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Tiempo de espera promedio</th>
                <th>Tiempo de ejecucion promedio</th>
              </tr>
            </thead>
            <tbody>
             {
                (
                <tr>
                  <td>{this.state.timeWaitAverage}</td>
                  <td>{this.state.timeCPUAverage}</td>
                </tr>
                )
             }
            </tbody>
          </table>



        </div>


      </div>
    )
  }
};
