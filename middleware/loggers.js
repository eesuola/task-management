export const logToTerminal = (req, res, next) => {
    console.log(`method: ${req.method}, url: ${req.originalUrl}`);
    next();
  };
  