function validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if(values.name === ""){
        error.name = "Name Should Not Be Empty"
    }
    else{
        error.name = ""
    }
    if(values.email === ""){
        error.email = "Email Should Not Be Empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't Match"
    }
    else{
        error.email = ""
    }
    
    if(values.password === ""){
        error.password = "Password Should Not Be Empty"
    }
    return error ;
    }
    
    export default validation