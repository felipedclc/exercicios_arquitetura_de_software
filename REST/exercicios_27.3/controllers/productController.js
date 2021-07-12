const express = require('express');
const ProductModel = require('../models/productModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await ProductModel.getAll();

  res.status(200).json(products);
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.getById(id);

  if (product === null) return res.status(404).send('Not found');

  res.status(200).json(product);
});

router.post('/', async (req, res, next) => {
  try {
    const { name, brand } = req.body;

    const newProduct = await ProductModel.add(name, brand);

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, brand } = req.body;
    const { id } = req.params;

    const updateProduct = await ProductModel.update(id, name, brand);

    res.status(202).json(updateProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async(req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await ProductModel.exclude(id);

    res.status(200).json({message: 'Usuário excluído com sucesso'});
  } catch(err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;