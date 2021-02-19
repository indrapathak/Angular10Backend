const moment = require('moment')
const nodeData = require('./models/nodeData')
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
const startDate = "2020-12-20"
const NoOfDays = 2

let from = moment(startDate)
let end = moment(from).add(NoOfDays, "days")
let sample = {
    "nodeId" : "567828763986378984", 
    "gateway" : "S232412332AAWDF13", 
    "value" : {
        "temperature" : 22.0, 
        "speed" : 22.0, 
        "bphirms" : 0.35, 
        "rphirms" : 0.36, 
        "yphirms" : 0.36
    }, 
    "timestamp" : new Date()
}
let dataList = []

while(end.diff(from, 'minutes') > 1)
{
    let sampleData = {...sample}
    sampleData['timestamp'] = new Date(from.toISOString())
    sampleData['value'] = {
        "temperature" : getRandomInt(20,40), 
        "speed" : getRandomInt(200,600), 
        "bphirms" : getRandomInt(0, 30), 
        "rphirms" : getRandomInt(0, 30), 
        "yphirms" : getRandomInt(0, 30)
    }
    from = from.add(1, 'minute')
    dataList.push(sampleData)
}

console.log(dataList)
nodeData.insertMany(dataList)
.then(status=>{
    console.log("multi data add status", status)
})
.catch(error => {
    console.log("error for multi data", error)
})