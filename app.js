const express = require('express'); //Recupère le package ExpressJS
const bodyParser = require('body-parser'); //Recupère le package BodyParser
const https = require('https'); //Recupère le package https

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;

    const listID = 'd20acd05d9';

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: prenom,
                    LNAME: nom,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(data);
    const url = `https://us20.api.mailchimp.com/3.0/lists/${listID}`;

    const options = {
        method: 'POST',
        auth: 'Jeeazy971:88f9a4b3b71415652167c0e6311e1b02-us20',
    };

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        // response.on('data', (data) => {
        //     console.log(JSON.parse(data));
        // });
    });

    request.write(jsonData);
    request.end();
});

app.post('/failure', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Connexion réussie sur le port: localhost:3000');
});
