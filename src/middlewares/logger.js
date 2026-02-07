export default async function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);

  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] RESPONSE: ${res.statusCode} - ${duration}ms`);
  });

  next();
}