// Last middleware in the chain
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(res.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};
