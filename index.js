const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();

require('./services/passport-config');
require('./routes/auth-routes')(app);

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
