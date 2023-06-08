const { mongoose } = require('mongoose');
export async function connectDb() : Promise<any> {
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to database")
    } catch(error: any)  {
        console.error(error);
        process.exit(1);
    }
}

module.exports={connectDb}