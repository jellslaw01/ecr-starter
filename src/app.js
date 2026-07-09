const express=require('express');
const app=express();
const env=require('dotenv');
const cors=require('cors');

//enable project to read .env
env.config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

let port=process.env.PORT ||8001;

app.listen(port, ()=>{
    const database=require('./services/database');

    const Router=require('./routes/index');
    app.use('/api',Router);
    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.status(err.status || 500);
        res.send({
            statusCode: 500,
            result: {
                message: err.message ? err.message : err
            }
        });
    });
    console.log(`Server is up and running on port ${port}`);
})
