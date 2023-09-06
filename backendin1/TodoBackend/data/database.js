import mongoose from "mongoose";

export const connectDB = async () => {
 mongoose.connect(process.env.MONGO_URI, {
    dbName: "backendTodo",
}).then((c)=> console.log(`Database Connected with ${c.connection.host}`))
.catch((e)=> console.log(e));
};