const app = require("./app");
const port = process.env.PORT || 3500;

const startServer = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(
        `We have the problem with connecting with server.Code of the error:${err}`
      );
      return;
    }
    console.log(`Server running. Use our API on port: ${port}`);
  });
};
startServer();
