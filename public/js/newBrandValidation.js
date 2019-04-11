$('#newBrand-form').submit((e) => {
    e.preventDefault();

    const formInputs = $('#newBrand-form').serializeArray();
    const inputsData = {};

    $(formInputs).each((index, inputData) => {
        inputsData[inputData.name] = inputData.value;
    })

    let errors = {};

    if(inputsData.brandName === "Select") {
        
        // validate Name
        if(inputsData.name.length < 1) {
            if(!errors.name) {
                errors.name = [];
                errors.name.push("Name is required");
            } else {
                errors.name.push("Name is required");
            }
        }

        if(inputsData.name.length > 0 && !inputsData.name.match(/[A-Za-z0-9]/g)) {
            if(!errors.name) {
                errors.name = [];
                errors.name.push("Name is not accepted");
            } else {
                errors.name.push("Name is not accepted");
            }
        }

        // validate Category
        if(inputsData.category.length < 1) {
            if(!errors.category) {
                errors.category = [];
                errors.category.push("Category is required");
            } else {
                errors.category.push("Category is required.");
            }
        }

        if(inputsData.category.length > 1 && !inputsData.category.match(/[A-Za-z0-9]/g)) {
            if(!errors.category) {
                errors.category = [];
                errors.category.push("Category is not valid");
            } else {
                errors.category.push("Category is not valid.");
            }
        }

        if(JSON.stringify(errors) === "{}") {
            console.log("Everything is fine");
            $(e.currentTarget).off('submit');
            $(e.currentTarget).submit();
        } else {
            $('.createError').empty();
            $('.createError').append((errors.name     ?  errors.name     + '<br>' : ''), 
                                     (errors.category ?  errors.category + '<br>' : '' ));
            console.log(errors);
        }
    }  else {
        console.log("Everything is fine");
        $(e.currentTarget).off('submit');
        $(e.currentTarget).submit();
    }
})