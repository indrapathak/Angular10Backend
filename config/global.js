module.exports = {
    database: {
       MONGODB_URI: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://127.0.0.1:27017/ANGULARdb',
        // MONGODB_URI: 'mongodb+srv://indra:9752545087@cluster0.htuk6.mongodb.net/ANGULARdb?retryWrites=true&w=majority',
        use: 'mongodb' // specify db =>  mongodb , mysql
    },

 
}