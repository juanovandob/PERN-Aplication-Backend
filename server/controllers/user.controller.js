import User from '../db/models/user.js';

//ready
const getAllUsers = async (req, res) => {
    
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
        console.log(email);
        
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


const getUserInfoByID = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllUsers,
    createUser,
    getUserInfoByID,
};


