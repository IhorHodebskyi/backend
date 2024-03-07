const app = require("./app");
const PORT = 3500;

const startServer = async () => {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(
        `We have the problem with connecting with server.Code of the error:${err}`
      );
      return;
    }
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};
startServer();
