import { validateId, foundId, foundBrand } from './validation/validation.js';

let brands = [];
let id = 0;

function createNewBrand(data, res) {
    const new_brand = {
        id: ++id,
        ...data
    };
    brands.push(new_brand);
    res.json({
        message: 'New brand created successfully',
        status: "200"
    });
}

function allBrands(res) {
    res.json(brands);
}

function brandById(id, res) {
    const isInt = +id;
    validateId(isInt, res);
    const brand = brands.find(brand => brand.id === isInt);
    foundBrand(brand, res);
    res.json(brand);
}

function updateBrandById(id, body, res) {
    const isInt = +id;
    validateId(isInt, res);
    const index = brands.findIndex(brand => brand.id === isInt);
    foundId(index, res);
    brands[index] = { ...brands[index], ...body };
    res.json({
        message: 'Brand updated successfully',
        status: "200"
    });
}

function deleteBrandById(id, res) {
    const isInt = +id;
    validateId(isInt, res);
    const index = brands.findIndex(brand => brand.id === isInt);
    foundId(index, res);
    brands.splice(index, 1);
    res.json({
        message: 'Brand deleted successfully',
        status: "200"
    });
}

export default {
    createNewBrand,
    allBrands,
    brandById,
    updateBrandById,
    deleteBrandById
};