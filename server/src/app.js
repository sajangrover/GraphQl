const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express();
const mongoose  = require('mongoose')
const cors =require('cors')



app.use(cors())
//console.log(schema)
mongoose.connect("mongodb+srv://sajan:sajan123@cluster0-t3zto.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser : true,useUnifiedTopology: true})
mongoose.connection.once('open' ,()=>{
   console.log("database connected")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))



app.listen(4000 ,()=>{
    console.log("server listning on port 4000")
})
