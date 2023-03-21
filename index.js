#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const backendindex = process.argv.indexOf("--backend")
const frontendindex = process.argv.indexOf("--frontend")
const source = path.join(__dirname, 'source_code');

if(backendindex > -1) {
    const folder = process.argv[backendindex + 1];
    const src = `${source}/backend/${folder}`
    const dest = `./api`
    fs.cp(src, dest, {recursive: true}, () => { 
        console.log("backend code copied")
    });    
}

if(frontendindex > -1) {
    const folder = process.argv[frontendindex + 1];
    const src = `${source}/frontend/${folder}`
    const dest = `./client`
    fs.cp(src, dest, {recursive: true}, () => { 
        console.log("front code copied")
    });    
}

/* cert */
fs.cp(`${source}/cert`, "./cert", {recursive: true}, () => { 
    console.log("cert folder copied")
});    