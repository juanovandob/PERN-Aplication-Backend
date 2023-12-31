import User from "../db/models/user.js";
import Property from "../db/models/property.js";
import PropertyType from "../db/models/propertyType.js";


const getAllMetrics = async (req, res) => {
  try {
    res.status(200).json({ message: "Get all metrics...." });
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

    if (userExists) {
      //getting the count of properties by user
      const { count, rows } = await Property.findAndCountAll({
        where: { creator_id: id },
        attributes: ["id", "title", "description", "photo", "propertytypes_id"],
        order: [
          ["id", "ASC"], // Orden ascendente por la columna 'id'
        ],
        raw: true, 
        include: {              // JOIN with table propertyType - obtain the name of the propertyType
          model: PropertyType,
          as: 'propertytype',
          attributes: ['name'],
        },
      }); //return the count of objects and an ARRAY of objects
      

      //Title Metrics, count of properties with titles less than 12 characters
      //Description Metrics, count of properties with descriptions less than 100 characters
      //bad and good ones

      const allMetrics = {
        total: count,
        
        title: {
          unhealthy: {
            total: 0,
            elements: [],
          },
          healthy: {
            total: 0,
            elements: [],
          },
        },
        description: {
          unhealthy: {
            total: 0,
            elements: [],
          },
          healthy: {
            total: 0,
            elements: [],
          },
        },
        image: {
          unhealthy: {
            total: 0,
            elements: [],
          },
          healthy: {
            total: 0,
            elements: [],
          },
        },
        types: []       
        //end of allMetrics
      };

      /*bridgeObject is used to send the propertyType propertiesList to the 
      allMetrics.propertyType.propertiesList array.*/
      const bridgeObject = {};
      const idsArray = [];


      

      console.log(rows);
      rows.forEach((property) => {

        if (property.title.length < 12) {
          allMetrics.title.unhealthy.total++;
          const obj = {
            id: property.id, 
            title: property.title, 
            description: property.description, 
            photo: property.photo,
            type:{
              id:property.propertytypes_id, 
              name:property['propertytype.name']
            }
          };
          allMetrics.title.unhealthy.elements.push(obj);
          //allMetrics.title.unhealthy.elements.push(property);
        } else {
          allMetrics.title.healthy.total++;
          const obj = {
            id: property.id, 
            title: property.title, 
            description: property.description, 
            photo: property.photo,
            type:{
              id:property.propertytypes_id, 
              name:property['propertytype.name']
            }
          };
          allMetrics.title.healthy.elements.push(obj);
        }
        

        if (property.description.length < 100) {
          allMetrics.description.unhealthy.total++;
          const obj = {
            id: property.id, 
            title: property.title, 
            description: property.description, 
            photo: property.photo,
            type:{
              id:property.propertytypes_id, 
              name:property['propertytype.name']
            }
          };
          allMetrics.description.unhealthy.elements.push(obj);
        } else {
          allMetrics.description.healthy.total++;
          const obj = {
            id: property.id, 
            title: property.title, 
            description: property.description, 
            photo: property.photo,
            type:{
              id:property.propertytypes_id, 
              name:property['propertytype.name']
            }
          };
          allMetrics.description.healthy.elements.push(obj);
        }

        if (property.image == "") {
          allMetrics.image.unhealthy.total++;
          const obj = {
            id: property.id, 
            title: property.title, 
            description: property.description, 
            photo: property.photo,
            type:{
              id:property.propertytypes_id, 
              name:property['propertytype.name']
            }
          };
          allMetrics.image.unhealthy.elements.push(obj);
        } else {
          allMetrics.image.healthy.total++;
          const obj = {
            id: property.id, 
            title: property.title, 
            description: property.description, 
            photo: property.photo,
            type:{
              id:property.propertytypes_id, 
              name:property['propertytype.name']
            }
          };
          allMetrics.image.healthy.elements.push(obj);
        }

        //adding the propertyType to the bridgeObject and adding the counts
        if (bridgeObject.hasOwnProperty(property['propertytype.name'])) {
          bridgeObject[property['propertytype.name']] += 1;
                   
        } else {
          bridgeObject[property['propertytype.name']] = 1;
         
        }
        //adding the id of the propertyType to the idsArray
        if (!idsArray.includes(property.propertytypes_id)) {
          idsArray.push(property.propertytypes_id);
        };

      //end of forEach
      });
      
      // union of idArrays and bridgeObject
      //[id1, id2, id3] + {type1: count, type2: count, type3: count} --> [{id1, type1, count}, {id2, type2, count}, {id3, type3, count}
      const result = idsArray.map((id, index) => ({
        id,
        type: Object.keys(bridgeObject)[index],
        total: Object.values(bridgeObject)[index],
      }));
      
      //sending de bridgeObject to the allMetrics.propertyType.propertiesList array.
      allMetrics.types = result;

      res.status(200).json(allMetrics);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//export all the functions
export { getAllMetrics, getMetricsDetail };


// refactor 
/* 
       const allMetrics = {
        totalProperties: {
          count,
        },
        titleQuality: {
          unhealthy: {
            count: 0,
            propertiesList: [],
          },
          healthy: {
            count: 0,
            propertiesList: [],
          },
          isHealthy: (property) => property.title.length < 12
        },
        descriptionQuality: {
          unhealthy: {
            count: 0,
            propertiesList: [],
          },
          healthy: {
            count: 0,
            propertiesList: [],
          },
          isHealthy: (property) => property.description.length < 75
        },
        imageQuality: {
          unhealthy: {
            count: 0,
            propertiesList: [],
          },
          healthy: {
            count: 0,
            propertiesList: [],
          },
        },
        propertyType: {
          propertiesList: [],
        },
        //end of allMetrics
      };
 
      rows.forEach((property) => {
 
        //Title Metrics 

        ["titleQuality", "descriptionQuality"].forEach((metricKey) => {
          
          if (allMetrics[metricKey].isHealthy(property)) {
            allMetrics[metricKey].healthy.count++;
            allMetrics[metricKey].healthy.propertiesList.push(property);
          } else {
            allMetrics[metricKey].unhealthy.count++;
            allMetrics[metricKey].unhealthy.propertiesList.push(property);
          }
          del property[metricKey].healthy;
        })
 
      });
      
}; */
 


