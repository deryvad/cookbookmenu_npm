#! /usr/bin/env node

const fs = require("fs");
const backendindex = process.argv.indexOf("--backend")
const frontendindex = process.argv.indexOf("--frontend")
const source = "./node_modules/cookbookmenu_npm/source_code";

if(backendindex > -1) {
    const folder = process.argv[backendindex + 1];
    const src = `${source}/backend/${folder}`
    const dest = `./${folder}`
    fs.cp(src, dest, {recursive: true}, () => { 
        console.log("backend code copied")
    });    
}

if(frontendindex > -1) {
    const folder = process.argv[frontendindex + 1];
    const src = `${source}/frontend/${folder}`
    const dest = `./${folder}`
    fs.cp(src, dest, {recursive: true}, () => { 
        console.log("front code copied")
    });    
}

/* cert */
fs.cp(`${source}/cert`, "./cert", {recursive: true}, () => { 
    console.log("cert folder copied")
});    