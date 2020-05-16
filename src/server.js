import app from './app';
import { PORT } from './config/environments/environment';
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
