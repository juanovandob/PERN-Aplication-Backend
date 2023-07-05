import Property from '../db/models/property.js';
import User from '../db/models/user.js';

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

  const getAllProperties = async () => { }
  const getPropertyDetail = async () => { }
  const createProperty = async () => {}
  const updateProperty = async () => {}
  const deleteProperty = async (req, res) => {}

  
/* const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find({}).limit(req.query._end);
        const propertyCount = await Property.countDocuments({});
        console.log(propertyCount);
        res.status(200).json(properties);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
 }; */

/*  const getPropertyDetail = async (req, res) => {
    const { id } = req.params;
   
    const propertyExists = await Property.findOne({ _id: id }).populate("creator", );

    if (propertyExists) {
        res.status(200).json(propertyExists);
    } else {
        res.status(404).json({ message: "Property not found" });
    }
}; */



/* const createProperty = async (req, res) => {
    
    try{
        const { title, description, propertyType, location, price, photo, email} = req.body;

        //Start a new session . Mongoose property. To make Atomic the insertion
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);
        
        if(!user) throw new Error('User not found');

        //Using cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url,
            creator: user._id
        }); 

        //update del dato creado
        user.allProperties.push(newProperty._id);
        await user.save({ session});

        await session.commitTransaction();
        //response
        res.status(200).json({ message: 'Property created sucessfully' });
    }catch(error){
        res.status(500).json({ message: error.message});
    };
 };  */



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



/* const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const propertyToDelete = await Property.findById({ _id: id }).populate(
            "creator",
        );
        console.log(typeof(propertyToDelete));
        if (!propertyToDelete) throw new Error("Property not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        propertyToDelete.deleteOne({ session });
        //propertyToDelete.remove({ session });  //version antigua de mongoose
        propertyToDelete.creator.allProperties.pull(propertyToDelete);

        await propertyToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; */

export {
    getAllProperties,
    getPropertyDetail,
    createProperty,
    updateProperty,
    deleteProperty,
}
