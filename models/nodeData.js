
    let mongoose = require('mongoose')
    moment = require('moment-timezone'),
    Schema = mongoose.Schema;


const nodeDataSchema = new Schema({
    nodeId: {
        type: String
    },
    cityname: {
        type: String
    },
    value: {
        type: Object,
        required: false
    },
    timestamp: {
        type: Date
    }

}, {
    collection: 'nodeData'
});

nodeDataSchema.index({"nodeId":1, "timestamp":1},{"unique":true})
module.exports =  mongoose.model('nodeData', nodeDataSchema);
