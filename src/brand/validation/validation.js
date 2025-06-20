
function validateId(id, res) {
    if (isNaN(id) || id <= 0) {
        res.status(400).json({ message: 'ID inválido' });
        throw new Error('ID inválido');
    }
}

function foundId(index, res) {
    if (index === -1) {
        res.status(404).json({ message: 'Marca no encontrada' });
        throw new Error('Marca no encontrada');
    }
}

function foundBrand(brand, res) {
    if (!brand) {
        res.status(404).json({ message: 'Marca no encontrada' });
        throw new Error('Marca no encontrada');
    }
}

export { validateId, foundId, foundBrand };