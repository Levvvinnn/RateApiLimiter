import tokenBucket from "./tokenBucket.js";
import createRateLimit from "./rateLimitMiddleware.js";
import express from "express";

const app=express();
const port=3000;

const rateLimiter=createRateLimit(5,1,1000);

const publicLimiter = createRateLimit(10, 2, 1000);    
const apiLimiter = createRateLimit(5, 1, 1000);       
const strictLimiter = createRateLimit(3, 1, 5000);    // 3 tokens, refill 1 every 5 seconds (strict for sensitive ops)

app.use(rateLimiter);

app.get('/',(req,res)=>{
    res.json({message:"Hii this endpoint is ratelimited"});
});

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});

