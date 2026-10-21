export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
    console.error("FULL ERROR:", err);

  res.status(status).json({
    success: false,
    message: err.message || "something went wrong",
    status,
  });
};


// app.use((err, req, res, next) => {
//   console.error("FULL ERROR:", err);

//   res.status(err.http_code || err.status || 500).json({
//     success: false,
//     message: err.message || "Upload failed",
//   });
// });