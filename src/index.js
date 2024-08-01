import mongoose from "mongoose";
import app from "./app.js";
import conf from "./config/index.js";

(async () => {
    try {
        await mongoose.connect(conf.MONGODB_URL)
        console.log('Database connected')

        app.on(('error'),function(err){
            console.log("Error : ",err)
            throw err
        })

        function onListening(){
            console.log(`listening on port ${conf.PORT}`)
        }
        app.listen(conf.PORT,onListening)

    } catch (err) {
        console.error('Error : ',err)
        throw err
    }
})()