const express = require('express');

const app = express();

app.use(express.static('./dist/cloudbar'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/cloudbar' });
});

app.listen(process.env.PORT || 8080);