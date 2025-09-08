import tokenBucket from './tokenBucket.js';

function createRateLimit(capacity,refillRate,refillInterval){
    const bucket=new tokenBucket(capacity,refillRate,refillInterval);

    return (req, res, next) => {
        const ip=req.ip;
        const result = bucket.allowRequest(ip,tokens);
        if(result.allowed==="success"){
            next();
        }else{
            res.status(429).json({
                error:"Too many requests",
                msg:"Try after "
            })

        }

    };
}
export default createRateLimit;
