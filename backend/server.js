/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import favicon from 'express-favicon';
import { createWriteStream } from 'node:fs';
import { Server } from 'socket.io';

import connectDB from './config/db.js';
// import socketInit from './config/socket.js';
import { initDB } from './boot/init.js';
import btcRoutes from './routes/btcRoutes.js';
import { errorHandler, notFound } from './middleware/errorMdware.js';

const __dirname = path.resolve();

dotenv.config();
if (process.env.NODE_ENV === undefined || !process.env.NODE_ENV) {
  //-- environment variable
  dotenv.config({ path: path.join(__dirname, '/environments/dev.env') });
}

//// Bootstrapping
connectDB();
initDB();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5220;

//// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//-- cors origin
app.use(
  cors({
    origin: [
      `http://localhost:${PORT}`,
      `http://localhost:${process.env.PORT_REACT}`,
      `http://${process.env.SERVER_IP}`,
      `https://${process.env.SERVER_IP}`,
      `http://${process.env.SERVER_DOMAIN}`,
      `https://${process.env.SERVER_DOMAIN}`
    ]
  })
);
//-- morgan | HTTP request logger
app.use(
  morgan('common', {
    //-- log only 4xx and 5xx responses
    skip: (req, res) => {
      return res.statusCode < 400;
    },
    //-- log all requests to .log file
    stream: createWriteStream(
      path.join(
        __dirname,
        'serverlogs',
        `access-${new Date().toISOString().slice(0, 10)}.log`
      ),
      {
        flags: 'a'
      }
    )
  })
);
//-- favicon
app.use(favicon(path.join(__dirname, 'frontend', 'public', 'favicon.png')));
//-- mongo sanitize
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.log(`Request[${key}] is sanitized:`, req);
    }
  })
);

//// REST API routes | ※ custom routing prefix 4 security
app.use('/zpapi/btc', btcRoutes);

//// Static routing for Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

//// Middleware for error handling
app.use(notFound);
app.use(errorHandler);

//// Socket.io
export const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  )
);
