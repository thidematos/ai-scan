const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

app.listen(3000, () => {
  console.log('Server started!');
});
