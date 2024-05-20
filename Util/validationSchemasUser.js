export const UserValidationSchema = {
    nom:{
        isLength: {
            options:{
                min : 1,
                max : 12, 
            },
            errorMessage: "nom must be of length 1 to 12",
        },
        notEmpty: {
            errorMessage : "name is Empty"
        },
        isString: {
            errorMessage: "Name must be a String"
        },
    },
    prenom:{
        isLength: {
            options:{
                min : 1,
                max : 12, 
            },
            errorMessage: "must be of length 1 to 12",
        },
        notEmpty: {
            errorMessage : "Prenom is Empty"
        },
        notString: {
            errorMessage: "Prenom must be a String"
        },
    },
    email:{
        notEmail:{
            errorMessage : "Must be an email"
        },
        notEmpty:{
            errorMessage: "Email field is Empty!"
        }
    },
    telephone:{
        notEmpty:{
            errorMessage : "Telephone input is Empty"
        },
        isInt:{
            errorMessage : "Telephone Must Be of type integer"
        }
    },
    password:{
        notEmpty:{
            errorMessage : "Password input is empty"
        },
        isLength: {
            options:{
                min : 6,
                max : 12, 
            },
            errorMessage: "Password must be of length 6 to 12"
        },
    }

}