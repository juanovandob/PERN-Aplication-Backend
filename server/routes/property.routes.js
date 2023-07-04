import express from 'express';

//IMPORT ALL THE CONTROLLERS
import { 
    createProperty,
    deleteProperty,
    getAllProperties,
    getPropertyDetail, 
    updateProperty 
}from '../controllers/property.controller.js';

const router = express.Router();  //instancia del router

router.route('/').get(getAllProperties);
router.route('/:id').get(getPropertyDetail);
router.route('/').post(createProperty);
router.route('/:id').patch(updateProperty);
router.route('/:id').delete(deleteProperty);

export default router;
