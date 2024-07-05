connectToDatabase()
.then(()=>{
   app.listen (process.env.PORT, ()=>{
       console.log(`Server is running on port ${process.env.PORT}`)
   })
   app.on('error',(error)=>{
       console.log("errore", error)
       throw error
   });
})
.catch((error)=>{
   console.log(error)
})
