(function() {
    'use strict';

    const express = require('express');
    const app = express();
    const path = require('path');

    app.set('port', (process.env.PORT || 5000));
    app.use(express.static('public'));

    app.use(express.static(path.join(__dirname, '/public')));

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/index.html'));
    });

    app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
    });
}());
