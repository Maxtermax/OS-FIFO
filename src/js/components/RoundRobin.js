export default class RoundRobin {
  constructor(data) {
    this.Quantum = Number(data[0].Quantum);
    this.ciclos = 0;
    this.cola = [];
    this.data = data;
  }//end constructor

  copy(elements) {
    return {
      Quantum: elements.Quantum,
      arrivedTime: elements.arrivedTime,
      ciclo: elements.ciclo,
      color: elements.color,
      cpuTime: elements.cpuTime,
      done: elements.done,
      originalIndex: elements.originalIndex,
      pCPU: elements.pCPU,
      peResponseAnt: elements.peResponseAnt,
      processName: elements.processName,
      timeLeft: elements.timeLeft,
      timeWait: elements.timeWait,
      wrongEntry: elements.wrongEntry,
      originalCPU: elements.originalCPU
    }
  }//end copy


  updateOldValues(elements) {
    for (var a = 0; a < elements.length; a++) {
      let before = elements[a];
      for (var b = a; b < elements.length; b++) {
        let next = elements[b];
        if(before.processName === next.processName && next.done === true) elements[a].done = true;
      }
    }
    return elements;
  }//end updateOldValues

  filterNotDone(elements, log = false) {
    let notDones = [];
    for(let i = elements.length - 1; i >= 0; i--) {
      for (let e = 0; e < i; e++) {
        if(elements[i].processName === elements[e].processName) {
          elements[e].done = true;
        }
      }
    }

    return this.clone(elements.filter(items=> items.done === false));
  }//end filterNotDone

  clone(elements=[]) {
    let result = [];
    elements.forEach(element=> result.push(Object.assign({}, element)));
    return result;
  }//end clone

  splitByQuantum(data) {
    let self = this;
    self.procesos = self.destructureData(data);

    let notDones = [1];
    while(notDones.length) {
      notDones = self.filterNotDone(self.procesos);
      let last1 = self.procesos[self.procesos.length-1];
      if(notDones.length === 0) break;
      notDones[0].peResponseAnt = Number(last1.pCPU);
      let r1 = self.destructureData(notDones, true);
      self.procesos = self.procesos.concat(r1);
      notDones = self.filterNotDone(self.procesos);
    }
    /*
    self.procesos.forEach(({processName, peResponseAnt, pCPU, done})=> {
      console.log('processName: ', processName,' ant: ', peResponseAnt, ' pCPU: ', pCPU , ' done: ', done);
      console.log("_____")
    })
    */
    return self.procesos;
  }//end splitByQuantum

  average(data, field) {
    let count = 0;
    data.forEach(element => count += element[field]);
    return (count/data.length);
  }//end average

  calculateTimeLeft(element) {
    element.done = element.cpuTime <= this.Quantum;
    if(element.cpuTime > this.Quantum) {
      element.timeLeft = element.cpuTime - this.Quantum;
      element.cpuTime = element.timeLeft;
      element.pCPU =  this.Quantum;
    } else {
      element.pCPU =  element.cpuTime;
      element.timeLeft = 0;
    }
    return element;
  }//end calculateTimeLeft

  destructureData(data = [], resolveRest=false) {
    if(resolveRest) {
      let first = Number(data[0].peResponseAnt);
      let gand = [first];
      data.forEach((element, index)=> {
        element.cpuTime = Number(element.cpuTime);
        element.arrivedTime =  Number(element.arrivedTime);
        element.ciclo = this.ciclos;

        let last = gand[gand.length-1];
        element.peResponseAnt = last;
        Object.assign(element, this.calculateTimeLeft(element));
        element.pCPU += element.peResponseAnt;
        gand.push(element.pCPU);
        element.timeWait = element.peResponseAnt - element.arrivedTime;
      })
      return data;
    } else {
      let gand = [];
      data.forEach((element, index)=> {
        element.cpuTime = Number(element.cpuTime);
        element.arrivedTime =  Number(element.arrivedTime);
        if(index === 0) {
          element.peResponseAnt = element.arrivedTime;
          Object.assign(element, this.calculateTimeLeft(element));
          gand[0] = element.pCPU;
          element.timeWait = element.arrivedTime - element.arrivedTime;
        } else {
          let last = gand[gand.length-1];
          element.peResponseAnt = last;
          Object.assign(element, this.calculateTimeLeft(element));
          element.pCPU += element.peResponseAnt;
          gand.push(element.pCPU);
          element.timeWait = element.peResponseAnt - element.arrivedTime;
        }
        element.wrongEntry = element.timeWait < 0;
      })
      return data;
    }
  }//end destructureData

  getLasted(elements) {
    let result = [];
    for(let i = elements.length - 1; i >= 0; i--) {
      let currentName = elements[i].processName;
      let hasDone = result.some(element=> element.processName === currentName);
      if(hasDone) continue;
      elements[i].endTime = elements[i].pCPU;
      elements[i].timeWait = (Number(elements[i].endTime) - Number(elements[i].originalCPU));
      result.push(elements[i]);
    }
    return result.reverse();
  }//end getLasted

  resolve() {
    let procesos = this.splitByQuantum(this.data);
    let robinResult = this.getLasted(procesos);
    let timeWaitAverage = this.average(robinResult, 'timeWait');
    let timeCPUAverage = this.average(robinResult, 'endTime');
    return {procesos, robinResult, timeWaitAverage, timeCPUAverage};
  }//end resolve
}
