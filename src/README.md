# Rate Limiter Project

A rate limiter I built using the token bucket algorithm for my CS portfolio. Prevents APIs from getting spammed by limiting requests per user.

## What it does

Basically stops people from hitting your API too many times. Each user gets a "bucket" of tokens, and each request costs a token. When you're out of tokens, you get blocked until more tokens refill over time.

## Files

- `tokenBucket.js` - Main rate limiter class
- `rateLimitMiddleware.js` - Express middleware wrapper  
- `server.js` - Test server with different endpoints

## How to run it

```bash
npm install express
node src/server.js
```

Then go to `http://localhost:3000` and spam refresh to see it block you after a few requests.

## Testing different limits

I set up different endpoints with different limits to show how it works:

- `/` - Public endpoint, pretty generous (10 requests)
- `/api/users` - Standard API limit (5 requests) 
- `/api/sensitive` - Strict limit for sensitive stuff (3 requests)

Try hitting each one multiple times in Postman or just spam clicking refresh.

## Code example

```javascript
// Create a rate limiter: 5 max tokens, refill 1 token every 1000ms
const limiter = createRateLimit(5, 1, 1000);

// Use it on your routes
app.get('/api/stuff', limiter, (req, res) => {
    res.json({message: 'This is rate limited!'});
});
```

When someone hits the limit, they get a 429 error with info about when they can try again.

## Why token bucket?

It's better than just counting requests because:
- Allows burst traffic (like 5 requests really fast)
- But prevents sustained spam
- More realistic for actual usage patterns

## Features I added

- Automatic cleanup of old users (so it doesn't use infinite memory)
- Different rate limits for different endpoints  
- Proper error messages with retry info
- Clean shutdown method to stop timers

Built this to learn about rate limiting algorithms and have something cool for my resume. Still learning so probably not perfect but it works!