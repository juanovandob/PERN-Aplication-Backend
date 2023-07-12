import User from '../db/models/user.js';
import Property from '../db/models/property.js';


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
      /* // Find properties by creator_id (id usuario propietario)
      const properties = await Property.findAll({
        where: { creator_id: id }, 
        raw: true,
      })*/;
      const {count, rows} = await Property.findAndCountAll({
        where: { creator_id: id },
        attributes: ["id", "title"],
        }) //return the count of objects and an ARRAY of objects

      
      //getting the count of properties with titles less than 12 characters
      let totalUnhealthy = 0;
      let propertiesUnhealthy = [];
      let totalHealthy = 0;
      let propertiesOk = [];

      for(const property of rows){
        if((property.title).length < 12){
          totalUnhealthy ++;
          propertiesUnhealthy.push(property);
        }else{
        totalHealthy++;
        propertiesOk.push(property);
        }
      }  

      console.log('conteo', totalUnhealthy);

      const allMetrics = {
        totalProperties: {
          type: String,
          value: count,
        },
        titleQuality: {
          totalUnhealthy,
          propertiesUnhealthy,
          totalHealthy,
          propertiesHealthy: propertiesOk,
          totalProperties: rows.length,
        },
               
      };
      
      //console.log("console: ", rows[0].title);
      res.status(200).json(allMetrics);
    } else {
      res.status(404).json({ message: "User not found" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
    }
 };

//ready
/* const getAllUsers = async (req, res) => {
    
    try {
        const limit = parseInt(req.query._end) || undefined;
    
        // Buscar todos los usuarios --User ya es una instancia de sequelize
        //por eso responde a los métodos de sequelize
        const users = await User.findAll({
          limit,
          raw: true, // Para obtener solo los datos sin metadata adicional
        });
    
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
      }    
};

//ready
const createUser = async (req, res) => {
    try{
        const { name, email, avatar} = req.body;

        const userExists = await User.findOne({ where: { email }});
                
        if(userExists){
            return res.status(200).json(userExists);
        }
        
        const newUser = await User.create({
            name,
            email,
            avatar,
        });
        
        res.status(200).json(newUser); 
    }catch(error){
        res.status(500).json({ message: error.message })
    }
};

//funciona en postman  -- falta en el front 
const getUserInfoByID = async (req, res) => {
    
    try {
        const { id } = req.params;
    
        // Buscar el usuario por su ID en Sequelize
        const user = await User.findOne({
          where: { id }, // Buscar por el campo 'id' en lugar de '_id'
          //include: [{ model: Property, as: "allProperties" }],
        });
            
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    
}; */

export {
    getAllMetrics,
    getMetricsDetail,
    //getAllUsers,
    //createUser,
    //getUserInfoByID,
};









