class tokenBucket{
    constructor(capacity,refillRate,refillInterval){
        if(capacity <= 0 || refillRate <= 0 || refillInterval <= 0){
            throw new Error("All parameters must be positive numbers");
        }
        this.capacity=capacity;
        this.refillRate=refillRate;
        this.refillInterval=refillInterval;
        this.buckets=new Map();

        setInterval(()=>{
            this.cleanup();
        },5*60*1000);
    }
    getBucket(clientId){
        if(!this.buckets.has(clientId)){
            this.buckets.set(clientId,{tokens:this.capacity,lastRefill:Date.now()});
        }
        return this.buckets.get(clientId);
    }

    refillTokens(bucket){
        const timePassed=Date.now()-bucket.lastRefill;
        const intervals=Math.floor(timePassed/this.refillInterval);
        const tokensAdd=intervals*this.refillRate;

        bucket.tokens=Math.min(this.capacity,bucket.tokens+tokensAdd);
        bucket.lastRefill=Date.now();
    }
    allowRequest(clientId, tokensRequired = 1) {
        if(tokensRequired>this.capacity){
                return {allowed:"fail"};
        }
        if(tokensRequired>0 && clientId!=null){
            const bucket = this.getBucket(clientId);
            this.refillTokens(bucket);
            if(bucket.tokens>=tokensRequired){
                bucket.tokens-=tokensRequired;
                return {allowed:"success",tokens:bucket.tokens};
            }else{
                return {allowed:"fail",tokens:bucket.tokens};
            }
        }else{
            return {allowed:"fail"}
        }
    }
    cleanup(maxAge = 3600000){
        for(const[clientId,bucket] of this.buckets.entries()){
            if(Date.now()-bucket.lastRefill>maxAge){
                this.buckets.delete(clientId);
            }
        }
    }    
}

