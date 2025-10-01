// Security middleware for Vercel Serverless Functions

// Allowed origins for CORS
const getAllowedOrigins = () => {
  const origins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || [];

  // Default allowed origins
  const defaultOrigins = [
    'https://easy-thai-speak.vercel.app',
    'https://easy-thai-speak-*.vercel.app', // Preview deployments
  ];

  // Add localhost in development
  if (process.env.NODE_ENV === 'development') {
    defaultOrigins.push('http://localhost:5173', 'http://localhost:3000');
  }

  return origins.length > 0 ? origins : defaultOrigins;
};

// CORS handler
export const handleCORS = (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  // Check if origin matches allowed patterns
  const isAllowed = allowedOrigins.some(allowed => {
    if (allowed.includes('*')) {
      // Handle wildcard patterns like 'https://easy-thai-speak-*.vercel.app'
      const pattern = allowed.replace(/\*/g, '[a-zA-Z0-9-]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(origin);
    }
    return allowed === origin;
  });

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  return isAllowed;
};

// Security headers
export const setSecurityHeaders = (res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
};

// Rate limiting with in-memory store (suitable for serverless)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export const checkRateLimit = (req) => {
  const identifier = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
  const now = Date.now();

  // Clean up old entries
  for (const [key, data] of requestCounts.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      requestCounts.delete(key);
    }
  }

  // Get or create counter for this identifier
  const requestData = requestCounts.get(identifier) || { count: 0, timestamp: now };

  // Reset if window has passed
  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    requestData.count = 0;
    requestData.timestamp = now;
  }

  requestData.count++;
  requestCounts.set(identifier, requestData);

  return {
    allowed: requestData.count <= MAX_REQUESTS_PER_WINDOW,
    remaining: Math.max(0, MAX_REQUESTS_PER_WINDOW - requestData.count),
    resetIn: RATE_LIMIT_WINDOW - (now - requestData.timestamp),
  };
};

// Input validation
export const validateTopicInput = (topic) => {
  if (!topic || typeof topic !== 'string') {
    return { valid: false, error: 'Topic must be a non-empty string' };
  }

  // Length check
  if (topic.length < 2 || topic.length > 200) {
    return { valid: false, error: 'Topic must be between 2 and 200 characters' };
  }

  // Sanitize: remove potential XSS/injection patterns
  const sanitized = topic
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();

  if (sanitized.length === 0) {
    return { valid: false, error: 'Topic contains invalid characters' };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers
    /eval\(/i,
    /expression\(/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      return { valid: false, error: 'Topic contains potentially malicious content' };
    }
  }

  return { valid: true, sanitized };
};

export const validateTranscript = (transcript, correctPhrase) => {
  if (!transcript || typeof transcript !== 'string') {
    return { valid: false, error: 'Transcript must be a non-empty string' };
  }

  if (!correctPhrase || typeof correctPhrase !== 'string') {
    return { valid: false, error: 'Correct phrase must be a non-empty string' };
  }

  // Length checks
  if (transcript.length > 500 || correctPhrase.length > 500) {
    return { valid: false, error: 'Input text is too long' };
  }

  return { valid: true };
};
