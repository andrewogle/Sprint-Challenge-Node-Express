// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const server = require('./server');
const port = process.env.port || 9090;


server.get("/", (req, res)=>{
    res.send('hi');
})
server.listen(port, ()=>console.log(`listening to ${port}`))