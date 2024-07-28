
import { initModal } from '../views/modal.js'; // Assuming initModal is a function you have in modal.js for initialization
import { loginUser,logoutUser } from '../libs/auth.js';

import { main as initIndex } from '../views/index.js';


function init() {
    
    initIndex();
    loginUser();
    logoutUser();
    initModal();
  }
  init();

