require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModels');
db.authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch((err) => {
        console.log('Error: ' + err);
    });

initModel();

db.sync()
    .then(() => {
        console.log('Database synced...');
    })
    .catch((err) => {
        console.log('Error: ' + err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
