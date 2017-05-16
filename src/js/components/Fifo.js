export default class Fifo {
  constructor(data) {
    let allZeros = data.every(element=> Number(element.arrivedTime) === 0);
    if(allZeros) {
      this.data = data.sort(this.sortByCPUTime);
    } else {
      this.data = data.sort(this.sortByArrivedTime);
    }
  }//end constructor

  sortByCPUTime(current, next) {
    return (Number(current.cpuTime) > Number(next.cpuTime));
  }//end sortByCPUTime


  sortByArrivedTime(current, next) {
    return (Number(current.arrivedTime) > Number(next.arrivedTime));
  }//end sortByArrivedTime

  average(data, field) {
    let count = 0;
    data.forEach(element => count += element[field]);
    return (count/data.length);
  }//end average

  destructureData(data) {
    let result = {};
    let gand = [];
    data.forEach((element, index)=> {
      if(index === 0) {
        element.peResponseAnt = gand[0] = element.arrivedTime;
        element.pCPU = gand[1] = Number(element.cpuTime) + Number(element.arrivedTime);
        element.pCPU = Number(element.pCPU);
        element.timeWait = element.arrivedTime - element.arrivedTime
      } else {
        let last = gand[gand.length-1];
        element.peResponseAnt = last;
        element.pCPU = Number(last)+Number(element.cpuTime);
        gand.push(element.pCPU);
        element.timeWait = element.peResponseAnt - element.arrivedTime;
      }
      element.wrongEntry = element.timeWait < 0;
    })
    result.timeWaitAverage = this.average(data, 'timeWait');
    result.timeCPUAverage = this.average(data, 'pCPU');
    result.procesos = data;
    return result;
  }//end destructureData

  resolve() {
    return this.destructureData(this.data);
  }//end resolve

}
