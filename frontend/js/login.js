import {Resume,Education,Experience} from './resume_data.js';
import {Account} from '../../backend/js/account.js'

login = (username,password) => {
    
}

signup = (account) => {
    const form = document.getElementById('signup-form');
    const formData = new FormData(form);
    const account = Account();
    var object = {};
    formData.forEach((value, key) => account[key] = value);
}