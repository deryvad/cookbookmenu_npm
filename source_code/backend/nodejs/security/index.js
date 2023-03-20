
const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const config = require('./config');

const authenticationStrategy = new BearerStrategy(config, (token, done) => {
    return done(null, token);
});

passport.use(authenticationStrategy);
passport.initialize();

//Validate the JWT token for authentication
const authorize = (req, res, next) => {
    let token = req.query && req.query.t ? req.query.t : (req.query && req.query.T ? req.query.T : "");
    if (token) req.headers.authorization = "Bearer " + token;

    let sessionkey = req.headers.sess;
    if(!sessionkey) sessionkey = '';

    if (!req.headers.authorization) {
        console.log("No token provided.");
        res.setHeader("WWW-Authenticate", "Bearer");
        return res.status(401).send("Unauthorized");
    }
    else {
        return passport.authenticate('oauth-bearer', (err, user, info)=>{
            if(!err && user) {
                if(user){
                    user.cn = user.preferred_username.split("@")[0];
                    user.key = `${user.preferred_username.split("@")[0]}-${sessionkey}`;
                    req.claims = user;
                }
                return next();
            }
            else {
                if (err) console.log("error in aad authorization: ", err);
                res.setHeader("WWW-Authenticate", "Bearer");
                return res.status(401).send("Unauthorized");
            }
        })(req,res,next)   
    };
};

//Remove specified headers
const removeHeaders = (headers, expressions) => {
    for (let header in headers) {
        for (let i = 0; i < expressions.length; i++) {
            let expression = expressions[i];
            if (header.match(new RegExp(expression, "gi"))) {
                delete headers[header];
                break;
            }
        }
    }
}

//Add the security headers.
//Run through the authorization process before calling the apis except for options requests
module.exports = function (req, res, next) {
    removeHeaders(res.headers, ['^x-.*', '^server$']);
    //allow localhost and other .accenture.com apps to do CORS requests
    if (req.headers && req.headers.origin && (req.headers.origin.indexOf(".accenture.com") > -1 || req.headers.origin.indexOf("localhost:") > -1)) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
        res.setHeader("Access-Control-Allow-Headers", "Authorization");
    }
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader('Content-Security-Policy',"default-src 'self' https://*.accenture.com; connect-src https://*.amazonaws.com https://*.accenture.com; style-src 'unsafe-inline' https://*.accenture.com https://fonts.googleapis.com; script-src 'unsafe-inline' https://*.accenture.com https://*.highcharts.com; img-src data: https://*.accenture.com; font-src self https://*.accenture.com https://fonts.googleapis.com https://fonts.gstatic.com;");
    res.setHeader('Strict-Transport-Security',"max-age=31536000; includeSubDomains; preload");
    res.setHeader('X-XSS-Protection',"1" );
    res.setHeader('X-Content-Type-Options',"nosniff" );
    res.setHeader('Referrer-Policy',"strict-origin-when-cross-origin");
    res.setHeader('Feature-Policy',"camera 'none'; microphone 'none';");

    if (req.path.indexOf("/api") === 0 && req.method.toUpperCase() !== "OPTIONS" && (req.path.indexOf("/api/migration") < 0 || req.path.includes("/DynamicBatch")))
        return authorize(req, res, next);
    else return next();
}