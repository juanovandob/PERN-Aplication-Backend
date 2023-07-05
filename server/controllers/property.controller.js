import Property from '../db/models/property.js';
import User from '../db/models/user.js';
import sequelize from '../db/connect.js'; 


import * as dotenv from 'dotenv';

//cloudinary
import { v2 as cloudinary} from 'cloudinary';

dotenv.config(); //dotenv instance

//conection to cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  
  });


const updateProperty = async () => {}


 //working 
const getAllProperties = async (req, res) => {
    
    try {
        const limit = parseInt(req.query._end) || undefined; //limite de respuestas solicitadas
    
        //regresa las propiedades y las cuenta. propiedades en properties y conteo en count
        //destructuración
        const { rows: properties, count } = await Property.findAndCountAll({
            limit,
            raw: true, // Para obtener solo los datos sin metadata adicional
          });

        const propertyCount = count;    
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
      }    
 };

//working with postman 
const getPropertyDetail = async (req, res) => {
    try{
        const { id } = req.params;
    
        /**
         * IMPORTANTE: Ejemplo de un join, trae los datos de la propiedad que se busca, ademas de todos
         * los datos de la tabla usuario (que es su creador) en el modelo property.js se generó una
         * relación al final del model (belongs), con esa relación se pudo hacer el join, el join se
         * hace con include: -- Si no se utiliza así solo se obtiene el id del creador.
         */
        // find property by ID - Sequelize
        const propertyExists = await Property.findOne({
            where: { id },
            include: [{ model: User, as: 'creator' }], 
        });
                
        /*Esto lo puedo utilizar por si se deben separar properties y users 
        const user = await User.findOne({
            where: { id: userId }, 
            raw: true,
        });
        */
        
        if (propertyExists) {
            res.status(200).json(propertyExists);
        } else {
            res.status(404).json({ message: "Property not found" });
        }
    }catch(error){
        res.status(404).json({ message: error });
    }
};


//working 
const createProperty = async (req, res) => {
    //Se crea una transacción - recomendable al operar dos tablas al mismo tiempo
    
    //const t = await sequelize.transaction();
    try{
        const { title, description, propertyType, location, price, photo, email} = req.body;
        //const { title, description, propertyType, location, price, email} = req.body;

        const user = await User.findOne({
            where: { email }, // Buscar por el campo email
            //transaction: t, // Asociar la transacción a la consulta
          });
        
        if(!user) throw new Error('User not found');

        //Using cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);
        
        
        const newProperty ={
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url,
            creator_id: user.id
        }
        
        const propertyCreated = await Property.create(newProperty);

        // Agregar el id de la propiedad al campo allProperties de user (es un array)
        //sequelize crea de nuevo el array por eso el sprea operator, para copiar el array y agregar al final el nuevo id
        await user.update({
            allProperties: [...user.allProperties, propertyCreated.id],
        });
      
        //response
        res.status(200).json({ message: 'Property created sucessfully' });
    }catch(error){
        //await t.rollback(); // Deshacer la transacción en caso de error
        res.status(500).json({ message: error.message});
    };
 };



 /* const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, propertyType, location, price, photo } =
            req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Property.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                propertyType,
                location,
                price,
                photo: photoUrl.url || photo,
            },
        );

        res.status(200).json({ message: "Property updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; */


//Falta borrar el dato del array que está en usuario ...
//no está hecho de la forma más optima porque no se utiliza transacciones para todo
const deleteProperty = async (req, res) => {
    
    try {
        const { id } = req.params;

        const propertyToDelete = await Property.findByPk(id, {
          include: [{ model: User, as: 'creator' }],
          //include: [{ model: User, as: 'creator' }],
        });
        console.log('property to be deleted id: ', propertyToDelete.id);

        if (!propertyToDelete) {
          throw new Error('Property not found');
        }

        //elimina la propiedad en cascada con la FK de usuario (creator)
        await sequelize.transaction(async (transaction) => {

            await propertyToDelete.destroy({ transaction });
            
            await propertyToDelete.setCreator(null, { transaction });


            //await propertyToDelete.creator.removeProperty(propertyToDelete, {transaction,});
            });
    
        res.status(200).json({ message: 'Property deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

};

export {
    getAllProperties,
    getPropertyDetail,
    createProperty,
    updateProperty,
    deleteProperty,
}
