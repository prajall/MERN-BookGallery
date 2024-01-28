const apiResponse = (statusCode, message, data) => {
  return {
    success: true,
    statusCode: statusCode,
    message: message,
    data: data,
  };
};

export { apiResponse };
