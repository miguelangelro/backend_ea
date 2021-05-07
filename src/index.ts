import dotenv from 'dotenv';
import SocketIO from 'socket.io'

dotenv.config();
import { startConnection } from './database'

import app from './app';



function init() {
    startConnection();
    app.listen(app.get('port'));
  console.log('Server on port', 3000);
  //wesocket 
 
      
    
};

init();