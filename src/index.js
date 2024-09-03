import express from "express"; 
const app = express();
const PORT = 3000; 

app.get("/", ()=>{

});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});