let config = {
    local:{
        identityMetadata: `https://login.microsoftonline.com/ds.dev.accenture.com/.well-known/openid-configuration`, 
        clientID: '~~~eso-development-clientid~~~',
        issuer:  "https://login.microsoftonline.com/<non_prod_tenant>/v2.0"
    },
    dev:{
        identityMetadata: `https://login.microsoftonline.com/ds.dev.accenture.com/.well-known/openid-configuration`, 
        clientID: '~~~eso-development-clientid~~~',
        issuer:  "https://login.microsoftonline.com/<non_prod_tenant>/v2.0"
    },
    stage:{
        identityMetadata: `https://login.microsoftonline.com/ds.dev.accenture.com/.well-known/openid-configuration`, 
        clientID: '~~~eso-staging-clientid~~~',
        issuer:  "https://login.microsoftonline.com/<non_prod_tenant>/v2.0"
    },
    prod:{
        identityMetadata: `https://login.microsoftonline.com/accenture.com/.well-known/openid-configuration`, 
        clientID: '~~~eso-production-clientid~~~',
        issuer:  "https://login.microsoftonline.com/<prod_tenant>/v2.0"
    }
};

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "local";
module.exports = config[process.env.NODE_ENV];