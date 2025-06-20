
const validateId = (int, res) => {
    if (isNaN(int)) { // Verificar si el ID es un número
        res.json({
            message: 'Error id is string',
            status: "404"
        });
    }
}

const foundId = (id) => {
    if (id == -1) { // Verificar si el ID existe
        res.json({
            message: 'Error id not found',
            status: "404"
        });
    }
}


const foundProduct = (product) => {
    if (!product) { // Verificar si el ID existe
        res.json({
            message: 'Error id not found',
            status: "404"
        });
    }
}




export {
    validateId,
    foundId,
    foundProduct
}

