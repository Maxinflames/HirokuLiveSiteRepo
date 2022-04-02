import express from 'express';
const router = express.Router();

import Contact from "../Models/contact";

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

/* GET home page. */
router.get('/home', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

/* GET about page. */
router.get('/about', function(req, res, next) 
{
  res.render('index', { title: 'About Us', page: 'about', displayName: '' });
});

/* GET projects page. */
router.get('/products', function(req, res, next) 
{
  res.render('index', { title: 'Our Products', page: 'products', displayName: '' });
});

/* GET services page. */
router.get('/services', function(req, res, next) 
{
  res.render('index', { title: 'Our Services', page: 'services', displayName: '' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) 
{
  res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});

/* GET login page. */
router.get('/login', function(req, res, next) 
{
  res.render('index', { title: 'Login', page: 'login', displayName: '' });
});

/* GET login page. */
router.get('/register', function(req, res, next) 
{
  res.render('index', { title: 'Register', page: 'register', displayName: '' });
});

/* Temporary Routes - Contact-List Related */

/* GET contact-list page. */
router.get('/contact-list', function(req, res, next) 
{
  // Display contacts from the database
  Contact.find(function(err, contactsCollection)
  {
    if(err){
      console.error("Encountered an Error reading from the Database: " + err.message);
      res.end();
    }

    res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contactsCollection, displayName: '' });
  });
});

/* Display the Add Page */
router.get('/add', function(req, res, next)
{
  res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: '' });
});

/* Process the Add request */
router.post('/add', function(req, res, next)
{
  // Instantiate a new contact to add
  let newContact = new Contact(
    {
      "FullName": req.body.fullName,
      "ContactNumber": req.body.contactNumber,
      "EmailAddress": req.body.emailAddress
  });

  // Insert contact into db
  Contact.create(newContact, function(err: ErrorCallback)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // newContact has been added to the db -> go to contact-list
    res.redirect('/contact-list');
  });
});

/* Display the Edit Page with Data injected from the db */
router.get('/edit/:id', function(req, res, next)
{
  let id = req.params.id;

  // Pass the Id to the 
  Contact.findById(id, {}, {}, function(err, contactToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // Display edit view with the data
    res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: '' });
  });
});

/* Process the Edit request */
router.post('/edit/:id', function(req, res, next)
{
  let id = req.params.id;

  // Instantiate a new contact to add
  let updatedContact = new Contact(
    {
      "_id": id,
      "FullName": req.body.fullName,
      "ContactNumber": req.body.contactNumber,
      "EmailAddress": req.body.emailAddress
  });

  // Pass the Id to the 
  Contact.updateOne({_id: id}, updatedContact, function(err: ErrorCallback)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // Edit was successful -> go to contact-list page
    res.redirect("/contact-list");
  });
});

/* Process the Delete request */
router.get('/delete/:id', function(req, res, next)
{
  let id = req.params.id;

  // Pass the Id to the 
  Contact.remove({_id: id}, function(err)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // Delete was successful
    res.redirect('/contact-list');
  });
});

export default router;