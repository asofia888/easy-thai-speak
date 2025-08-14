// Simple test function to verify Vercel deployment
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.status(200).json({
        message: 'Vercel API is working!',
        timestamp: new Date().toISOString(),
        method: req.method || 'UNKNOWN',
        environment: process.env.NODE_ENV || 'development'
    });
}