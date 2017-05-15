export default class Sfj {
  constructor(data) {
    let copyOriginalData = data.slice();
    let result = this.resolveShock(copyOriginalData);
    this.data = this.resolveByFifo(result.hits, result.noHit);

    /*
    let allSame = copyOriginalData.every(element=> Number(element.cpuTime) === Number(saveFirst['cpuTime']));

    if(allSame) {
      this.data = copyOriginalData.sort(this.sortByArrivedTime);
    } else {
      let result = this.resolveShock(copyOriginalData);
      //this.data = this.resolveByFifo(result.hits, result.noHit);
    }
    */
  }//end constructor

  splitByHit(elements) {
    let result = {};

    for (let a = 0; a < elements.length; a++) {
      let current = elements[a];
      if(current.split) continue;
      for (let b = 0; b < elements.length; b++) {
        let next = elements[b];
        if(current.processName === next.processName) continue;
        if(next.split) continue;
        if(Number(current.cpuTime) === Number(next.cpuTime)) {
          elements[a].split = true;
          elements[b].split = true;
          if(result[current.cpuTime]) {
            result[current.cpuTime].push(next);
          } else {
            result[current.cpuTime] = [current, next];
          }
        } else {
          elements[a].split = false;
          elements[b].split = false;
        }

      }
    }
    return result;
  }//end splitByHit


  addProperty(elements, properties) {
    let result = elements.slice().map((element)=> {
      Object.keys(properties).forEach(property => element[property] = properties[property]);
      return element;
    })
    return result;
  }//end addProperty

  markShock(elements) {
    for (let a = 0; a < elements.length; a++) {
      let current = elements[a];
      if(current.shocked) continue;
      for (let b = 0; b < elements.length; b++) {
        let next= elements[b];
        if(next.shocked) continue;
        if(current.processName === next.processName) continue;

        if(Number(current.cpuTime) === Number(next.cpuTime)) {
          if(current.shockedBy && current.shockedBy.length) {
            elements[a].shockedBy.push(elements[b]);
          } else {
            elements[a].shockedBy = [ elements[b] ];
          }
          elements[a].shocked = true;
          elements[b].shocked = true;
        } else {
          elements[a].shocked = false;
          elements[b].shocked = false;
        }
      /*
        if(Number(current.cpuTime) === Number(next.cpuTime)) {
          elements[a].shocked = true;
          elements[b].shocked = true;
          elements[a].shockedBy.push(elements[b]);
        } else {
          elements[a].shocked = false;
          elements[b].shocked = false;
        }
      */
      }
    }
    /*
      <Procesos>= {
        processName: <String>,
        cpuTime: <Number>,
        shockedBy: <Array>
      }

      Arguments:
        *elements<Array><Procesos>
      description:
        markShock itera sobre el '*elements' comparandolos todos contra todos y marcando los elementos que
        se encuentra repetidos con la propiedad 'shocked' en true, los elementos que se encuentra repetidos
        los agrega al arreglo 'shockedBy', en caso de que no este repetido marca el elemento con 'shocked' en false, finalmente retorna el '*elements'
      Return:
        @*elements
    */
    return elements;
  }//end markShock

  spliceBySchock(elements) {
    let result = {hits: [], noHit: []};
    elements.forEach(function(element, index) {
      if(element.shockedBy && element.shockedBy.length) {
        result.hits = result.hits.concat(element.shockedBy);
        delete element.shockedBy;
        result.hits = result.hits.concat(element);
      } else {
        delete element.shockedBy;
        if(element.shocked === false) result.noHit.push(element);
      }
    })

    return result;
    /*
      <Procesos> = {
        processName: <String>,
        cpuTime: <Number>,
        shockedBy: <Array><Procesos>,
        shocked: <Boolean>
      }

      <Splice> = {
        hits: <Array>,
        noHit: <Array>
      }

      Arguments:
        *elements<Array><Procesos>
      Variables:
        result<Object><Splice>
      description:
        spliceBySchock itera sobre el @*elements buscando los que tengan la propiedad 'shockedBy' con elementos por dentro, en caso de que si concatena ese elemento con la propiedad 'hits' de @result
        y elimina la propiedad 'shockedBy' de  @*elements, de lo contrario elimina la propiedad 'shockedBy' de  @*elements y si la propiedad 'shocked' de @*elements es igual a false, se agrega ese elemento a la propiedad 'noHit' de @result.
      Return:
        @result
    */
  }//end spliceBySchock

  resolveShock(noHit) {
    let marked = this.markShock(noHit);
    let split = this.spliceBySchock(marked);

    if(split.hits.length) {
      let result = [];
      let splited = this.splitByHit(split.hits);
      Object.keys(splited).forEach(key=> splited[key] = this.resolveByFifo(splited[key]));
      let sorted = Object.keys(splited).sort((a, b)=> { Number(a) < Number(b) });
      sorted.forEach(key=> {
        console.log('key', key);
        console.log('splited[key]', splited[key]);
        console.log("______----")
        result = result.concat(splited[key])
      })

      split.hits = result;
      console.log('split', split);
      return split;
    } else {
      return split;
    }
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
