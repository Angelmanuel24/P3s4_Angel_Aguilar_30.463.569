var express = require('express');
var router = express.Router();
const db = require('../db/models');


router.get('/', (req, res,) =>{
  res.render('index');
});


router.get('/producto', (req, res) => {
  db.getproducto()
    .then(data => {        
      console.log(data)
      res.render('producto', { producto: data });
  })
  .catch(err => {
      res.render('producto', { producto: [] });
  })
});

router.get('/agregarproducto', (req, res) => {
  res.render('agregarproducto')
})


router.post('/agregarproducto', (req, res) => {
  const {code, name, brand, model, description, price, category_id} = req.body;
  console.log(code, name, brand, model, description, price, category_id);
  db.insertproducto(code, name, brand, model, description, price, category_id)
  .then(() => {
     res.redirect('producto')
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/agregarcategoria', (req, res) => {
  res.render('agregarcategoria')
})

router.get('/editproducto/:id', (req, res)=>{
  const id = req.params.id
  db.getproductoID(id)
  .then(data =>{
    console.log(data)
    res.render('editproducto', {producto: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('editproducto', {producto: []})
    })   
})

router.post('/editproducto/', (req, res)=>{
  const {id, code, name, brand, model, description, price, category_id} = req.body;
  db.updateproducto(id, code, name, brand, model, description, price, category_id)
  .then(() =>{
    res.redirect('/producto');
    console.log(id, code, name, brand, model, description, price, category_id);
  })
  .catch(err =>{
    console.log(err);

  })
});

router.get('/deleteproducto/:id', (req, res)=>{
  const id = req.params.id;
  db.deleteproducto(id)
    .then(() => {
    res.redirect('/producto');
  })
  .catch(err => {
  console.log(err);
  });
})

router.get('/category', (req, res) => {
  db.getcategory()
    .then(data => {        
      console.log(data)
      res.render('category', { category: data });
  })
  .catch(err => {
      res.render('category', { category: [] });
  })

  router.post('/agregarcategoria', (req, res) => {
    const {name} = req.body;
    console.log(name);
    db.insertcategory(name)
    .then(() => {
       res.redirect('category')
    })
    .catch(err => {
      console.log(err);
    })
  });

  router.get('/editcategory/:id', (req, res)=>{
    const id = req.params.id
    db.getcategoryID(id)
    .then(data =>{
      console.log(data)
      res.render('editcategory', {category: data[0]})
    })
      .catch(err =>{
        console.log(err);
        res.render('editcategory', {category: []})
      })   
  });

  router.post('/editcategory/', (req, res)=>{
    const {id, name} = req.body;
    db.updatecategory(id, name)
    .then(() =>{
      res.redirect('/category');
    })
    .catch(err =>{
      console.log(err);
  
    })
  });

  router.get('/deletecategory/:id', (req, res)=>{
    const id = req.params.id;
    db.deletecategory(id)
      .then(() => {
      res.redirect('/category');
    })
    .catch(err => {
    console.log(err);
    });
  })

});

module.exports = router;
