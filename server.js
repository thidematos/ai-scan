const dotenv = require('dotenv');
const app = require('./app');
const schedule = require('node-schedule');
const { default: axios } = require('axios');

schedule.scheduleJob('*/15 * * * *', async () => {
  console.log('Poked server!');
  await axios.get(
    'https://primor-structed-view.onrender.com/api/v1/poke-server'
  );
});

dotenv.config({ path: './config.env' });

app.listen(3000, () => {
  console.log('Server started!');
});
