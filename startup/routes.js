const api = require('../routes/api/api');
const error = require('../middleware/error')
const cors = require('cors');

module.exports = function(app, express) {
    app.use(cors());
    app.use(express.json());
    app.use('/api', api);
    app.use(error);
}