const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // ZOD ERROR
  if (err.name === "ZodError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map(issue => ({
        field: issue.path[0],
        message: issue.message,
      })),
    });
  }

  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
