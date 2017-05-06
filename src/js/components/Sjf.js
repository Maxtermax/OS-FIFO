export default class Sfj {
  constructor(data) {
    this.data = data;
    let entry = data;
    let shocked = [];
    let free = [];
    let hasShock = entry.some((prev, index)=> {
      let isShock = entry.some((next, i)=> {
        if(index === i) return false;
        if(Number(prev.cpuTime) === Number(next.cpuTime)) {
          shocked.push(prev, next);  
          return true;
        } else {
          return false;
        }        
      })
      console.log('isShock', isShock);
      if(isShock === false) free.push(prev);      
      return isShock;
    })
    if(hasShock) {
      this.data = this.resolveByFifo(shocked, free);
    } else {
      this.data = this.data.sort(this.sortByCPUTime);
    }

    let y = this.data;
    console.log('y', y);
  }//end constructor

  resolveByFifo(shocked, free) {
    let result = [];
    free = free.sort(this.sortByCPUTime);          
    shocked = shocked.sort(this.sortByArrivedTime);
    console.log('free', free);
    console.log('shocked', shocked);
    /*
    if(Number(free[0]['cpuTime']) < Number(shocked[0]['cpuTime'])) {
      result.contact(free, shocked);
    } else {
      result.contact(shocked, free);
    }
    */
    return result;
  }//end resolveByFifo

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
        element.pCPU = gand[1] = element.cpuTime;
        element.pCPU = Number(element.pCPU);
        element.timeWait = element.arrivedTime - element.arrivedTime
      } else {
        let last = gand[gand.length-1];
        element.peResponseAnt = last;
        element.pCPU = Number(last)+Number(element.cpuTime);       
        gand.push(element.pCPU);
        element.timeWait = element.peResponseAnt - element.arrivedTime;
      }
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
