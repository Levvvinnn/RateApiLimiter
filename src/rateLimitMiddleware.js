import tokenBucket from './tokenBucket.js';

function createRateLimit(capacity,refillRate,refillInterval){
    const bucket=new tokenBucket(capacity,refillRate,refillInterval);

    return (req, res, next) => {
        const ip=req.ip;
        const result = bucket.allowRequest(ip);
        if(result.allowed==="success"){
            next();
        }else{
            res.status(429).json({
                error:"Too many requests",
                msg:"Try later"
            });

        }

    };
}
export default createRateLimit;
