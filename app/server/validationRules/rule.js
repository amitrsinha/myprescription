module.exports = {
    users: {
        firstName: {
            required: true,
            message: 'Please enter first name'
        },
        lastName: {
            required: true,
            dependencyOn: ['firstName'],
            message: 'Please enter last name'
        },
        mobile: {
            required: true,
            attributeType: "number",
            minLength: {
                length: 10,
                message: "Please enter minimim 10 digit length for valid mobile number"
            },
            maxLength: {
                length: 10,
                message: "Please enter maximum 10 digit length for valid mobile number"
            },
            message: 'Please enter valid mobile number'  
        },
        pin: {
            attributeType: "number",
            minLength: 6,
            maxLength: 6,
            message: 'Please enter 6 digit pin number'
        }
    }
}
