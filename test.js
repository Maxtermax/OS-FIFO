const Table = require('cli-table');
const readlineSync = require('readline-sync');
let entryData = true;
let countProcess  = 0;
let fifo = [];

class Fifo {
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
				element.peResponseAnt =	gand[0] = element.arrivedTime;
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
		let head = new Table({
		  head: result.data,
		  colWidths: result.colWidths
		})
		console.log(head.toString());
		console.log(result.values);
		console.log("______________________________\n")

		result.procesos.forEach(({originalIndex, timeWait, pCPU})=> {
			console.log(`P${originalIndex+1}`);
			console.log(`Tiempo de espera: ${timeWait}`);
			console.log(`Tiempo de ejecucion: ${pCPU}`);
			console.log("______________________________\n")
		})

		console.log(`Tiempo ejecucion espera: ${result.timeWaitAverage}`);
		console.log(`Tiempo ejecucion primedio: ${result.timeCPUAverage}`);
	}//end gandDiagram
}//end fifo


while(entryData) {
	let arrivedTime = readlineSync.question(`Tiempo de llegada para el proceso ${countProcess+1} --> `);

	if(!/(?:\d*\.)?\d+/g.test(arrivedTime)) {
		console.log("Debes ingresar un valor valido");
		process.exit(1);
	} 

	let cpuTime = readlineSync.question(`Rafaga de cpu para el proceso ${countProcess+1} --> `);
	console.log(" ");

	if(!/(?:\d*\.)?\d+/g.test(cpuTime)) {
		console.log("Debes ingresar un valor valido");
		process.exit(1);			
	} 

	
	fifo.push({
		arrivedTime: Number(arrivedTime), 
		cpuTime: Number(cpuTime),
		originalIndex: countProcess
	})

	countProcess++;
	let moreProcess = readlineSync.question(`¿Quieres ingresar otro proceso? (si/no) `);
	console.log(" ")
	if(moreProcess === "si") {
		entryData = true;
	} else {
		entryData = false;
		let prueba = new Fifo(fifo);
		prueba.printDiagram();
	}
}

/*
	let test = new Fifo([
		{
			arrivedTime: 5,
			cpuTime: 6,
			originalIndex: 0
		},
		{
			arrivedTime: 2,
			cpuTime: 4,
			originalIndex: 1
		},
		{
			arrivedTime: 0,
			cpuTime: 3,
			originalIndex: 2
		},
		{
			arrivedTime: 3,
			cpuTime: 7,
			originalIndex: 3
		}
	])
*/