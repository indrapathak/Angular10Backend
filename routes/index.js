/**
 * API endpoints will be defined here
 */
const dashboard = require('../controllers/dashboardController');

module.exports = (app) => {
app.route('/').get( dashboard.projectStart)
app.route('/user').post(dashboard.addUser)
app.route('/user').get( dashboard.fetchUser)
app.route('/user/:email').delete(dashboard.deleteUser)
app.route('/user/:email').put(dashboard.updateUser)
app.route('/user/:email').get(dashboard.fetchParticularUser)
}