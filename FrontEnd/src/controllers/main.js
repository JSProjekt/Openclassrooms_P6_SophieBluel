
import { initModal } from '../views/modal.js'; 
import { loginUser,logoutUser } from '../services/auth.js';

import { main as initIndex } from '../index.js';


function init() {
    
    initIndex();
    loginUser();
    logoutUser();
    initModal();
  }
  init();

