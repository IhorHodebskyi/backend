"use strict";
const status = (values, res) => {
  const data = {
    status: 200,
    values: values,
  };
  res.json(data);
  res.end();
};
module.exports = status;
