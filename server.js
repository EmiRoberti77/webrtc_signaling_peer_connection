const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.listen(8081, () => {
  console.log(8081, 'server started', new Date().toISOString());
});
