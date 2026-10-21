// export const logger = (req, res, next) => {
//   console.log(`[${new Date().toDateString()}] ${req.method} ${req.originaUrl}`);
//   next();
// };
export const logger = (req, res, next) => {
  console.log(
    `[${new Date().toDateString()}] ${req.method} ${req.originalUrl} hello`,
  );
  next(); // Let the request move forward
};
