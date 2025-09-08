import tokenBucket from './tokenBucket.js';

function createRateLimit(capacity,refillRate,refillInterval){
    const bucket=new tokenBucket(capacity,refillRate,refillInterval);

    return (req, res, next) => {
        const ip=req.ip;

        if(bucket.allowRequest){
            
        }

    };
}
export default createRateLimit;
