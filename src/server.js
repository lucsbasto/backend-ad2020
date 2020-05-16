const app = require('./app');
const { PORT } = require('./config/environments/environment');
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
