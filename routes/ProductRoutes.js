const express = require("express");
const router = express.Router()

router.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

//*********  add new product  *****

// router.post('/add', async (req, res) => {
//   try {
//     console.log(req.body.name)
//     const newProdcut = new Product ({...req.body})
//     await newProdcut.save()
//     res.send({msg: 'product added successfully'})
    
//   } catch (error) { 
//     console.log(error)
//   }
// })

//*********  add new produc  *****
router.post('/add', async function (req, res) {
  try {
      const existProduct = await Product.findOne({ name: req.body.name }) 
      if(existProduct){
          res.status(400).send({"msg" : "product exist"})
      }else {
          const newProduct = new Product({
          ...req.body
      })
      await newProduct.save()
      res.send({msg : "product added"})
      }
  
  } catch (error) {
      console.log(error)
  }
})

//*********  product List  *****

router.get('/all', async function (req, res) {
  console.log(req)
try {
  const allProduct = await Product.find()
  res.send({allProduct})
} catch (error) {  
  console.log(error)
}
})


//*********  product List using Price *****

router.get('/allc', async function (req, res) {
  console.log(req)
  // console.log(req.query.price)
try {
  const allProduct = await Product.find({price : {$gte:req.query.price}})
  res.send({allProduct})
} catch (error) {  
  console.log(error)
}
})

//*********  find Product  *****
 
router.get("/findProduct", async (req, res) => {
  try {
    const findProduct = await Product.find({"name" : req.body.name});
    res.send(findProduct);
  } catch (error) {
    console.log(error);
  }
});

//*********  delete Product by Name *****

router.delete("/delete", async (req, res) => {
  try {
    const result = await Product.deleteOne({ name: req.body.name })
    res.send({ msg: "Product successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

//*********  delete Product by Id *****

router.delete("/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      return res.status(400).send({ msg: "product already deleted" });
    }
    res.send({ msg: "product successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});


//*********  update Product *****

router.put("/:id", async (req, res) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    if (!result.modifiedCount) 
    {return res.status(400).send({msg:"no things to update"});}
      res.send({msg:"product update"})
  } catch (error) {
    console.log(error);
  }
});



module.exports=router


