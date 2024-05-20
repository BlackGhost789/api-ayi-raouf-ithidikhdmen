export const ProduitValidationSchema = {
    nom:{
        isLength: {
            options:{
                min : 1,
                max : 12, 
            },
            errorMessage: "must be of length 1 to 12",
        },
        notEmpty: {
            errorMessage : "name is Empty"
        },
        isString: {
            errorMessage: "Name must be a String"
        },
    },
    prix:{
        notEmpty:{
            errorMessage: "Prix is Empty !"
        },
        isInt:{
            errorMessage: "Prix must be of type Integer"
        }
    },
    discription:{
        notEmpty: {
            errorMessage : "Description is Empty !"
        },
        isString: {
            errorMessage: "Descriptin must be a String !"
        },
    },
    id_categorie:{
        notEmpty:{
            errorMessage: "Categorie is Empty !"
        },
        isInt:{
            errorMessage: "Categorie must be of type Integer"
        }
    }

}