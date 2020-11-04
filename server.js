//Install express server
const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

app.use('/', router);

router.all('/', (req,res)=> {
    console.log('/');

    res.send('Página No Encontrada');
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/speed-feedback'));

router.get('/speed-feedback', (req,res)=> {
    console.log('/speed-feedback');
    res.sendFile(path.join(__dirname+'/dist/speed-feedback/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);