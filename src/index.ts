import { DEFAULT_PORT } from './const.js';
import { server } from './server.js';

const PORT = process.env.PORT ?? DEFAULT_PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('request', (req) => {
  console.log(`${req.method}\t ${req.url}`);
});
