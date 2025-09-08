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
                error:"Rate limit exceeded",
                message:"Too many requests",
                retry:Math.ceil(refillInterval/1000),
                tokens:result.tokens,
                limit:bucket.capacity
            });

        }

    };
}
export default createRateLimit;
