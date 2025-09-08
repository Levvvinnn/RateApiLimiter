import tokenBucket from './tokenBucket.js';

function createRateLimit(capacity,refillRate,refillInterval){
    const bucket=new tokenBucket(capacity,refillRate,refillInterval);

    return (req, res, next) => {
        const ip=req.ip;
        const tokens=req.tokens;
        const result = bucket.allowRequest(ip,tokens);
        if(result){
            
        }

    };
}
export default createRateLimit;
