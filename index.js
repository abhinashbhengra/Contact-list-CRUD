const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', (req, res) =>{

    Contact.find({}, (err, contacts) =>{
        if(err){console.log('error in fetching data from DB'); return;}
        return res.render('contactList',{
            title:'contact list',
            contact_list:contacts
        });
    });
})

app.get('/practice', (req, res) =>{
    res.render('practice');
})

app.post('/create-contact', (req, res) =>{
    // contactList.push(req.body);
    // populating the DB
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, (err, newContact)=>{
        if(err){console.log('error in creating contact'); return;}

        // console.log(newContact);

        return res.redirect('back');
    })
})

app.get('/delete-contact', (req, res) =>{
      let id = req.query.id;
      Contact.findByIdAndDelete(id, (err)=>{
          if(err){
              console.log('error in deleting from database');
              return;
          }
          return res.redirect('back');
      })
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return;
    }
    return console.log("Express server is running on port :", port);
})