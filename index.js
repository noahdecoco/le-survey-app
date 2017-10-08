const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log(req);
    res.send({
        hello: 'world',
        goodbye: 'world'
    });
});

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
