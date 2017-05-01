export default class Fifo {
  constructor(data) {
    this.data = data.sort(this.sortByArrivedTime);    
  }//end constructor

  sortByArrivedTime(current, next) {
    return (Number(current.arrivedTime) > Number(next.arrivedTime));
  }//end sortByArrivedTime

  average(data, field) {
    let count = 0;
    data.forEach(element => count += element[field]);
    return (count/data.length);
  }//end average

  spaces(n) {
    let result = "";
    for (var i = 0; i < n; i++) {
      result += " ";
    }
    return result;
  }//end spaces

  generateSpaces(num) {
    let len = (5-String(num).length)+1;
    return this.spaces(len);
  }//end generateSpaces

  destructureData(data) {
    let result = {
      data: [],
      colWidths: [],
      values: ""
    }
    let gand = [];
    data.forEach((element, index)=> {
      result.data.push(`P${element.originalIndex+1}`);
      result.colWidths.push(5);
      if(index === 0) {
        result.values = `${element.arrivedTime}${this.generateSpaces(element.cpuTime)}${element.cpuTime}`;
        element.peResponseAnt = gand[0] = element.arrivedTime;
        element.pCPU = gand[1] = element.cpuTime;
        element.timeWait = element.arrivedTime - element.arrivedTime;
      } else {
        let last = gand[gand.length-1];
        element.peResponseAnt = last;
        element.pCPU = last+element.cpuTime;
        gand.push(element.pCPU);
        element.timeWait = element.peResponseAnt - element.arrivedTime;
        result.values += `${this.generateSpaces(gand[gand.length-1])}${gand[gand.length-1]}`;       
      }
    })
    result.timeWaitAverage = this.average(data, 'timeWait');
    result.timeCPUAverage = this.average(data, 'pCPU');   
    result.procesos = data;
    return result;
  }//end destructureData

  printDiagram() {
    let result = this.destructureData(this.data);
    /*
    result.procesos.forEach(({originalIndex, timeWait, pCPU})=> {
      console.log(`P${originalIndex+1}`);
      console.log(`Tiempo de espera: ${timeWait}`);
      console.log(`Tiempo de ejecucion: ${pCPU}`);
      console.log("______________________________\n")
    })

    console.log(`Tiempo ejecucion espera: ${result.timeWaitAverage}`);
    console.log(`Tiempo ejecucion primedio: ${result.timeCPUAverage}`);
    */
  }//end gandDiagram
 
}
