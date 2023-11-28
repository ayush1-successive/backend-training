const someAsyncOperation = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("An intentional error occured!");
    }, 1000);
  });
};

const asyncOperationController = async (req, res) => {
  try {
    const result = await someAsyncOperation();

    return res.status(200).json({
      status: true,
      message: "Data fetch successfully!",
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message: "Internal server error!",
      error,
    });
  }
};

export { asyncOperationController };
