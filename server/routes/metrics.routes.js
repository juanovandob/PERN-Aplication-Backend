import express from 'express';

//IMPORT ALL THE CONTROLLERS
import { 
    getAllMetrics,
    getMetricsDetail, 
}from '../controllers/metrics.controller.js';

const router = express.Router();  //instancia del router

router.route('/').get(getAllMetrics);
router.route('/:id').get(getMetricsDetail);
//router.route('/').post(createProperty);
//router.route('/:id').patch(updateProperty);
//router.route('/:id').delete(deleteProperty);

export default router;