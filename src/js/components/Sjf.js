export default class Sfj {
  constructor(data) {
    this.data = data;
    let entry = data;
    let shocked = [];
    let free = entry;   

    let allSame = entry.every(element=> Number(element.cpuTime) === Number(entry[0]['cpuTime']));
    if(allSame) {
      shocked = entry;
    } else {
      for (let prev = 0; prev < entry.length; prev++) {
        let current = entry[prev];      
        for (let next = prev; next < entry.length; next++) {
          if(prev === next) continue;
          if(Number(current.cpuTime) === Number(entry[next]['cpuTime'])) {
            shocked.push(current);  
            shocked.push(entry[next]);
            free.splice(prev, 1);
            free.splice(next-1, 1);
          }
        }
      }     
    }

    if(shocked.length) {
      this.data = this.resolveByFifo(shocked, free);
    } else {
      this.data = this.data.sort(this.sortByCPUTime);
    }
    
  }//end constructor

  cpuTimeMoreLower(data) {
    let lower = Number(data[0]['cpuTime']);
    data.forEach(({cpuTime})=> {
      if(Number(cpuTime) < lower) lower = Number(cpuTime);
    })
    return lower;
  }//end cpuTimeMoreLower

  resolveByFifo(shocked, free) {
    let result = [];
    free = free.sort(this.sortByCPUTime);
    shocked = shocked.sort(this.sortByArrivedTime);
    if(free.length) {
      let lower = this.cpuTimeMoreLower(free);
      if(lower < Number(shocked[0]['cpuTime'])) {
        return free.concat(shocked);
      } else {
        return shocked.concat(free);
      }
    } else {
      return shocked;
    }      
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
