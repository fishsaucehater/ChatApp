const mongoose = require('mongoose');
const env = require('dotenv');
const app = require('./app');

env.config({ path: './config.env' });

const PORT = 4000 || process.env.PORT;
const DB = process.env.DB_LOCAL;

mongoose.connect(DB).then(
    console.log('DB Connected')
);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
