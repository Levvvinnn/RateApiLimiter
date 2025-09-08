import tokenBucket from "./tokenBucket.js";
import createRateLimit from "./rateLimitMiddleware.js";
import express from "express";

const app=express();
const port=3000;

const rateLimiter=createRateLimit(5,1,1000);
app.use(rateLimiter);

app.get('/',(req,res)=>{
    res.json({message:"Hii this endpoint is ratelimited"});
});

app.listen(port,()=>{

});

