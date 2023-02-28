// express.js setup
const express = require('express');
const app = express();
const PORT = 3000;

// global data structures
let envelopes = [];
const totalBudget = 0;

app.get('/', (req, res, next) => {
    console.log('hello world');
    res.send('hello world');
});

app.post('/envelopes', (req, res, next) => {
    const query = req.query;
    console.log(query);
    envelopes.push(query);
    res.status(201).send(query);
});

app.get('/envelopes', (req,res,next) => {
    res.send(envelopes);
});

app.get('/envelopes/:name', (req,res,next) => {
    const result = envelopes.find(element => element.name == req.params.name);
    if (result)
        res.send(result);
    else
        res.status(404).send();
});

app.delete('/envelopes/:name', (req,res,next) => {
    const index = envelopes.findIndex(element => element.name == req.params.name);
    if (index > -1) {
        envelopes.splice(index, 1);
        res.status(204).send();
    }
    else
        res.status(404).send();
});

app.put('/envelopes/:name', (req,res,next) => {
    const query = req.query;
    const nameToFind = req.params.name;
    const index = envelopes.findIndex(element => element.name == nameToFind);
    if (index > -1) {
        envelopes[index] = query;
        res.status(200).send(query);
    }
    else
        res.status(404).send();
});

app.put('/envelopes/:name1/:name2', (req,res,next) => {
    const index1 = envelopes.findIndex(element => element.name == req.params.name1); 
    const index2 = envelopes.findIndex(element => element.name == req.params.name2);
    const ammount = req.query.ammount;

    if (index1 > -1 && index2 > -1 && ammount > 0){
        envelopes[index1].ammount -= ammount;
        envelopes[index2].ammount += ammount;
        res.status(204).send();
    }
    else
        req.status(400).send();



});





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})