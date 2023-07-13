import User from '../db/models/user.js';
import Property from '../db/models/property.js';
import e from 'express';


const getAllMetrics = async (req, res) => {
    try {
        res.status(200).json( {message: 'Get all metrics....'});
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
 };

 //metrics detail by user
const getMetricsDetail = async (req, res) => {
  
  const { id } = req.params;
  
  
  try {
    const allMetrics = {};
    // Check if user id exists
    const userExists = await User.findOne({
      where: {
        id,
      },
    });

    if(userExists){
      //getting the count of properties by user
      const {count, rows} = await Property.findAndCountAll({
        where: { creator_id: id },
        attributes: ["id", "title", "description"],
        order: [
          ['id', 'ASC'] // Orden ascendente por la columna 'id'
        ],
        }) //return the count of objects and an ARRAY of objects

      
      //Title Metrics, count of properties with titles less than 12 characters
      //Description Metrics, count of properties with descriptions less than 100 characters
      //bad and good ones
      
      const allMetrics = {
        totalProperties: {
          count,
        },
        titleQuality: {
          unhealthy:{
          count: 0,
          propertiesList: [],
          },
          healthy:{
          count: 0,
          propertiesList: [],
          },
        },
        descriptionQuality: {
          unhealthy:{
          count: 0,
          propertiesList: [],
          },
          healthy:{
          count: 0,
          propertiesList: [],
          },
        }        
      };  
     

      rows.forEach((property) => {
        if((property.title).length < 12){
          allMetrics.titleQuality.unhealthy.count++;
          allMetrics.titleQuality.unhealthy.propertiesList.push(property);
        }else{
          allMetrics.titleQuality.healthy.count++;
          allMetrics.titleQuality.healthy.propertiesList.push(property);
        }

        if((property.description).length < 100){
          allMetrics.descriptionQuality.unhealthy.count++;
          allMetrics.descriptionQuality.unhealthy.propertiesList.push(property);
        }else{
          allMetrics.descriptionQuality.healthy.count++;
          allMetrics.descriptionQuality.healthy.propertiesList.push(property);
        };
      });
           
      
      res.status(200).json(allMetrics);
    } else {
      res.status(404).json({ message: "User not found" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
    }
 };

//export all the functions
export {
    getAllMetrics,
    getMetricsDetail,
};









