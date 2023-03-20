const mkcert = require('mkcert');
const fs = require('fs');
const path = require("path");
const logger = require('./helpers/logger');

async function go(){
    // create a certificate authority
    const ca = await mkcert.createCA({
        organization: 'Accenture',
        countryCode: 'MY',
        state: 'Kuala Lumpur',
        locality: 'Malaysia',
        validityDays: 365
    });
    
    // then create a tls certificate
    const cert = await mkcert.createCert({
        domains: ['127.0.0.1', 'localhost', '*.accenture.com'],
        validityDays: 365,
        caKey: ca.key,
        caCert: ca.cert
    });
    
    fs.writeFile(path.resolve(__dirname, "../cert/server.crt"), cert.cert, (err) => {
        if (err) logger.error(err)
        else logger.info("/cert/server.crt created!");
    });

    fs.writeFile(path.resolve(__dirname, "../cert/cert.pem"), cert.cert, (err) => {
        if (err) logger.error(err)
        else logger.info("/cert/cert.pem created!");
    });

    fs.writeFile(path.resolve(__dirname, "../cert/server.key"), cert.key, (err) => {
        if (err) logger.error(err)
        else logger.info("/cert/server.key created!");
    });
    fs.writeFile(path.resolve(__dirname, "../cert/key.pem"), cert.key, (err) => {
        if (err) logger.error(err)
        else logger.info("/cert/key.pem created!");
    });
}

go();
