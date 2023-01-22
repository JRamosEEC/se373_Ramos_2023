"use strict";

//Set up express
const express = require(`express`);
const app = express();
//Include the file system functions
const fs =require(`fs`);
//Include and set the hbs (handlebars) view engine
const hbs = require(`hbs`)
app.set(`view engine`,`hbs`)
//register the location of partial snippets for the view engine
hbs.registerPartials(__dirname + `/views/partials`,(err)=>{})
//Uses extended url capability
app.use(express.urlencoded({extended:true}));
//add the static asset folder
app.use(express.static(`${__dirname}/public`));
//allow express json functionality
app.use(express.json())

//path to the data folder
const data = `./data`

//Route to the root directory. Displays "Hello World" in browser
app.get(`/`, (req,res)=>{
    res.send(`Hello World`)
})

//Use an open route redirect any 404 URL's
app.get(`*`, (req,res)=>{
    //I got two ways I can straight up redirect on a 404 error to the 404 page
    res.status(404).redirect('404.html');

    //Or I can send straight html of a 404 page
    //res.status(404).send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title> Error </title></head><body><a href="http://localhost:80">HOME</a><h2>404 Error</h2><p>Page not found.</p></body></html>');

    //What I couldn't get to work but would have preferred was to render the 404 page from views, but no matter what I did it errored stating the file could not be found in views (which at the time it was)
    //res.status(404).render('404); 
})

//Runs the server when npm app.js is run in the terminal
let port = process.env.PORT || 80;
app.listen(port, ()=>{
    console.log(`Server Running at localhost:${port}`)
});

