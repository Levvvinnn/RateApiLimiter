import tokenBucket from "./tokenBucket.js";
import createRateLimit from "./rateLimitMiddleware.js";
import express from "express";

const app=express();
const port=3000;

const rateLimiter=createRateLimit(5,1,1000);

const publicLimiter = createRateLimit(10, 2, 1000);    
const apiLimiter = createRateLimit(5, 1, 1000);       
const strictLimiter = createRateLimit(3, 1, 5000);    

app.use(rateLimiter);

app.get('/',publicLimiter,(req,res)=>{
    res.json({message:"Public limiter-higher rate limit"});
});

app.get('/api/users',apiLimiter,(req,res)=>{
    res.json({
        users:["levin","kevin","devin"],
        message:"Standard API endpoint"
    });
});
app.get('/api/private',strictLimiter,(req,res)=>{
    res.json({
        date:"Private information",
        message:"Strict API limiting applied"
    });
});

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});

