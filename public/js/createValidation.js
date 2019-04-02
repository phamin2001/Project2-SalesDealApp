$('#createUser-form').submit((e) => {
    e.preventDefault();
    const formInputs  =  $('#createUser-form').serializeArray();
    const inputsData      =  {};

    $(formInputs).each((index, inputData) => {
        inputsData[inputData.name] = inputData.value;
        // console.log(inputData, 'inputData');
    })

    // console.log(inputsData, 'inputsData');
    
    let errors = {};

    // validate a username
    if(inputsData.username.length < 1) {
        if(!errors.username) {
            errors.username = [];
            errors.username.push("Username is required");
        } else {
            errors.username.push("Username is required");
        }
    }

    if(inputsData.username.length > 0 && !inputsData.username.match(/[A-Za-z0-9]/g)) {
        if(!errors.username) {
            errors.username = [];
            errors.username.push("Username is not accepted");
        } else {
            errors.username.push("Username is not accepted");
        }
    }

    // validate a password
    if(!inputsData.password) {
        errors.password = "Password is required";
    }

    if(JSON.stringify(errors) === "{}"){
        console.log('everything is fine')
        $(e.currentTarget).off('submit');
        $(e.currentTarget).submit();
    } else {
        $('.createError').empty();
        $('.createError').append((errors.username ? errors.username + '<br>' : '') , (errors.password ? errors.password + '<br>' : ''));
        console.log(err);
    }

})