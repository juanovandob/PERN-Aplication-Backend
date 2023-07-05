import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import './db/models/user.js';
import './db/models/property.js';
import sequelize from './db/connect.js'; //Conexión a DB

//Import Routes
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();  //initialize dotenv

const app = express();

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get('/', (req, res) =>{
    res.send({ message: 'Hello chartsWithRefine with postgresql' });
});

//Se hace el llamado a los routes como middlewares
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

const startServer = async () => {
    try {
        //connect database
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        //syncronizing database with models
        await sequelize.sync({ alter: true });  //-- solo es necesario cuando se cambia un modelo       
        const port = process.env.PORT;
        app.listen(port, () => console.log(`started on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

startServer();


