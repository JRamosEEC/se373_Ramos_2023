"use strict";

//Set up express
const express = require(`express`);
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
//Include the file system functions
const fs =require(`fs`);
//Include and set the hbs (handlebars) view engine
const hbs = require(`hbs`);
const { Router } = require('express');
app.set(`view engine`,`hbs`);
//register the location of partial snippets for the view engine
hbs.registerPartials(__dirname + `/views/partials`,(err)=>{});
//Uses extended url capability
app.use(express.urlencoded({extended:true}));
//add the static asset folder
app.use(express.static(`${__dirname}/public`));
//allow express json functionality
app.use(express.json());

//path to the data folder
const data = `./data`;

//Route to the root directory.
router.get(`/`, (req,res)=>{
    //I got two ways I can straight up redirect on a 404 error to the 404 page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>W1</title></head><body><h2 style="display: flex; justify-content: center;">Welcome to my "first" Node application</h2></body></html>');
});

//Use an open route redirect any 404 URL's
router.get(`*`, (req,res)=>{
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title> Error </title></head><body><a href="../app">HOME</a><h2>404 Error</h2><p>Page not found.</p></body></html>');
});

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);