export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} nout found `);
  if(req.originalUrl.includes('.well-known')){
    return res.status(204).send()
   
  }
  error.statusCode = 404;
  next(error);
};
