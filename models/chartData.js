
    let mongoose = require('mongoose')
    moment = require('moment-timezone'),
    Schema = mongoose.Schema;


const chartDataSchema = new Schema({
    type: {
        type: String
    },
    elements: {
        type: Array
    },
    timestamp: {
        type: Date ,
        default : new Date()
    }

}, {
    collection: 'chartData'
});

module.exports =  mongoose.model('chartData', chartDataSchema);
