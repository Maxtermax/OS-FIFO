class RoundRobin {
  constructor(data) {
    this.Quantum = Number(data[0].Quantum);
    this.cola = [];
    this.ciclos = 0;
    this.splitByQuantum(data);

    this.data = [];
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
      wrongEntry: elements.wrongEntry
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


  splitByQuantum(data) {
    let self = this;
    self.procesos = self.destructureData(data);
    let reduce = [1];
    while(reduce.length) {
      let copy = self.procesos.map((elements)=> {
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
          wrongEntry: elements.wrongEntry
        }
      })
      reduce = copy.filter(element=> element.done === false);
      if(reduce.length === 0) break;
      let rf = reduce[0].processName;
      let allSame = reduce.every(element=> element.processName === rf);

      if(allSame) {
        self.procesos[Number(reduce[0].originalIndex)].done = true;
        reduce.splice(0, 1);
      }
      //console.log('reduce', reduce);

      let last = copy[copy.length-1];
      reduce[0].peResponseAnt = Number(last.pCPU);
      let chunk = self.destructureData(reduce, true);
      self.procesos = self.procesos.concat(chunk);
      self.procesos = self.updateOldValues(self.procesos);
    }
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

  destructureData(data, resolveRest=false) {
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
        element.ciclo = this.ciclos;
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
      this.ciclos++;
      return data;
    }

    /*
    result.timeWaitAverage = this.average(data, 'timeWait');
    result.timeCPUAverage = this.average(data, 'pCPU');
    result.procesos = data;
    return result;
    */
  }//end destructureData

  resolve() {
    return this.destructureData(this.data);
  }//end resolve

}

let r = new RoundRobin([
  {
    Quantum: "5",
    arrivedTime: 0,
    cpuTime: 10,
    originalIndex: 0,
    processName: "nexus"
  },
  {
    Quantum: "5",
    arrivedTime: 0,
    cpuTime: 4,
    originalIndex: 1,
    processName: "codeblocks"
  },
  {
    Quantum: "5",
    arrivedTime: 0,
    cpuTime: 8,
    originalIndex: 2,
    processName: "calculadora"
  },
  {
    Quantum: "5",
    arrivedTime: 0,
    cpuTime: 5,
    originalIndex: 3,
    processName: "dev cpp"
  },
  {
    Quantum: "5",
    arrivedTime: 0,
    cpuTime: 12,
    originalIndex: 4,
    processName: "reaseon"
  }
])

