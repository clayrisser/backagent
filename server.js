import TrailsApp from 'trails';
import app from './';

require('express-custom-response')(__dirname + '/api/responses');

const server = new TrailsApp(app);

server.start().then().catch(err => server.stop(err));
