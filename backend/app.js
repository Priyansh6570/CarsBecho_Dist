import express from 'express';
import helmet from 'helmet';
import errorMiddleware from './middleware/error.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import http from 'http';
import {init, initAdIo} from './socket.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

// import csrf from 'csurf';


const app = express();
// app.use(csrf());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "*"],
    scriptSrc: ["'self'", "'nonce-123abc'", "*", "'unsafe-inline'", "'unsafe-eval'"],
    objectSrc: ["'none'"],
    imgSrc: ["'self'", "data:", "*"]
  },
  nonce: '123abc'
}));

// Enable CORS for your frontend domain
app.use(cors({
  origin: ['https://www.carsbecho.com', 'https://carsbecho.com', 'http://localhost:5173'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '100mb'
}));
app.use(express.json({ limit: '100mb' }));
app.use(fileUpload());

// Swagger
const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route Imports
import car from './routes/carRoute.js';
import user from './routes/userRoute.js';
import order from './routes/orderRoute.js';
import subscription from './routes/subscriptionRoute.js';
import ad from './routes/adRoute.js';
import auction from './routes/auctionRoute.js';
import bid from './routes/bidRoute.js';
import room from './routes/roomRoute.js';

app.use('/api/v1', car);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', subscription);
app.use('/api/v1', ad);
app.use('/api/v1', auction);
app.use('/api/v1', bid);
app.use('/api/v1', room);

// Serve static assets if in production
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// Error Handler (last piece of middleware)
app.use(errorMiddleware);

export default app;

// Create an HTTP server using your express app
const server = http.createServer(app);

// Initialize socket.io using the HTTP server
const io = init(server);
const adIo = initAdIo(server, '/socket/adpage');

// Listen to the server
const PORT = process.env.SOCKET_PORT || 3000;
server.listen(PORT, () => {
  console.log(`### Server running on port ${PORT}`);
});