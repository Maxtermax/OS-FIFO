export default class Prority {
  constructor(data) {
    this.data = data.sort(this.sortByPriority);
    /*
    let allZeros = data.every(element=> Number(element.priority) === 0);
    if(allZeros) {
      this.data = data.sort(this.sortByCPUTime);
    } else {
      this.data = data.sort(this.sortByPriority);
    }
    */
  }//end constructor

  sortByCPUTime(current, next) {
    return (Number(current.cpuTime) > Number(next.cpuTime));
  }//end sortByCPUTime


  sortByPriority(current, next) {
    return (Number(current.priority) > Number(next.priority));
  }//end sortByPriority

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
        element.timeWait = Number(element.arrivedTime) - Number(element.arrivedTime);
      } else {
        let last = gand[gand.length-1];
        element.peResponseAnt = last;
        element.pCPU = Number(last)+Number(element.cpuTime);
        gand.push(element.pCPU);
        element.timeWait = Number(element.peResponseAnt) - Number(element.arrivedTime);
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
