export default class Sfj {
  constructor(data) {
    let copyOriginalData = data.slice();//copy the original input and work with it
    let saveFirst = copyOriginalData[0];
    let allSame = copyOriginalData.every(element=> Number(element.cpuTime) === Number(saveFirst['cpuTime']));

    if(allSame) {
      this.data = copyOriginalData.sort(this.sortByArrivedTime);
    } else {
      let goFirst = Number(saveFirst['arrivedTime']) === 0;
      if(goFirst) {
        copyOriginalData.splice(0, 1);
        let result = this.resolveShock(copyOriginalData);
        this.data = this.resolveByFifo(result.shocked, result.noHit);
        this.data.unshift(saveFirst);
      } else {
        let result = this.resolveShock(copyOriginalData);
        this.data = this.resolveByFifo(result.shocked, result.noHit);
      }
    }
  }//end constructor

  resolveShock(noHit) {
    let shocked = [];
    for (let prev = 0; prev < noHit.length; prev++) {
      let current = noHit[prev];
      for (let next = 0; next < noHit.length; next++) {
        if(current.processName === noHit[next]['processName']){
         // console.log('current.processName', current.processName);
          continue;
       }

        if(Number(current.cpuTime) === Number(noHit[next]['cpuTime'])) {
          let a = Number(current.cpuTime);
          let b = Number(noHit[next]['cpuTime']);
          /*
          console.log('a', a);
          console.log('b', b);
          console.log("____-")
          */
          shocked.push(current);
          shocked.push(noHit[next]);
          noHit.splice(prev, 1);
          noHit.splice(next-1, 1);
        }
      }
    }

    return {noHit, shocked}

  }//end resolveShock

  cpuTimeMoreLower(data) {
    let lower = Number(data[0]['cpuTime']);
    data.forEach(({cpuTime})=> {
      if(Number(cpuTime) < lower) lower = Number(cpuTime);
    })
    return lower;
  }//end cpuTimeMoreLower

  resolveByFifo(shocked = [], noHit = []) {
    noHit = noHit.sort(this.sortByCPUTime);
    if(shocked.length === 0) return noHit;
    shocked = shocked.sort(this.sortByArrivedTime);
    if(noHit.length) {
      let lower = this.cpuTimeMoreLower(noHit);
      if(lower < Number(shocked[0]['cpuTime'])) {
        return noHit.concat(shocked);
      } else {
        return shocked.concat(noHit);
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
