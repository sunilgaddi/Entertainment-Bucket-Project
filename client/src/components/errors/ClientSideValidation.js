const ClientSideValidation = (payload) =>{

    let errors = {};

    for (let key in payload){
        if(key === 'firstName'){
            if(!payload.firstName) errors.firstName = "Please enter your First Name."
        }
    
        if(key === 'lastName'){
            if(!payload.lastName) errors.lastName = "Pleased enter your Last Name."
        }
        
        if(key === 'email'){
            if(!payload.email) errors.email = 'Please enter your Email.'
    
            else if(!validateEmail(payload.email)) errors.email = 'Please enter a Valid Email.'
        }
    
        if(key === 'password'){
            if(!payload.password) errors.password = 'Please enter your Password.'
            else if(payload.password.length < 6 ) errors.password = 'Password should contain atleast 6 or more characters.'
        }
    
        if(key === 'cf_password'){
            if(!payload.cf_password) errors.cf_password = 'Please enter confirm Password.'
            else if(payload.cf_password !== payload.password) errors.cf_password = 'Passwords do not match'
        }
    
        if(key ==='phoneNumber'){
            if(!payload.phoneNumber) errors.phoneNumber = 'Please enter your Phone Number.'
        }
    
    }

    return errors;
}

function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export default ClientSideValidation

