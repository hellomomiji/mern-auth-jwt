const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // 404 is not found
  next(error); // pass error to the next middleware
};

const errorHandler = (err, req, res, next) => {
  // if res.statusCode is 200, set statusCode to 500, else set statusCode to res.statusCode
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
  let message = err.message;
  
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };