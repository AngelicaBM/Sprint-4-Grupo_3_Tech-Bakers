const fs = require('fs');
const path = require('path');
const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {
    productCart : (req,res)=>{
        res.render('products/productCart');
    },

    productDetails : (req,res)=>{
        const product = productModel.find(req.params.id)
		for( let i = 1; i < (product.image).length; i++ ) { 
			console.log(product.image[i] )
		}
        const destacados = productModel.destacados("Destacados")
        res.render('products/productDetails', {product, destacados, toThousand});
    },

    create : (req,res)=>{
        res.render('products/create');
    },
    
    store : (req, res) => {
		let imagenes= []

        for(let i = 0 ; i<req.files.length;i++){
            imagenes.push(req.files[i].filename)
        }
        console.log(req.files)
		const newProduct = {
			...req.body,
			image: req.files.length >= 1  ? imagenes : ["default-image.png"]
		}
		productModel.create(newProduct)
		res.redirect('/')
	},

    edit : (req,res)=>{
        let product = productModel.find(req.params.id)
        let productToEdit = productModel.find(req.params.id);
		res.render('products/edit', { product , productToEdit })
	},
    
    update: (req, res) => {
		let productToEdit = productModel.find(req.params.id);

		let imagenes = [];

		for(let i = 0 ; i < req.files.length; i++){
			imagenes.push(req.files[i].filename)
		}

		productToEdit = {

			id: productToEdit.id,
			...req.body,
			image: req.files.length >= 1  ? imagenes : productToEdit.image

		}

		productModel.update(productToEdit);
		res.redirect("/products/productedit");

	},

    destroy: function(req,res){
        let product = (req.params.id)
		productModel.delete(product);
		res.redirect("/products/productedit");
    },

    products : (req,res)=>{
        const products = productModel.all();
        res.render('products/products', {products, toThousand})
    },

    productedit : (req,res)=>{
        const products = productModel.all();
        res.render('products/productedit', {products, toThousand})
    },

    pasteleria : (req,res)=>{
        const products = productModel.findAllByField('Pastelería');
        res.render('products/products', {products, toThousand})
    },

    masas : (req,res)=>{
        const products = productModel.findAllByField('Masas');
        res.render('products/products', {products, toThousand})
    },

    tortas : (req,res)=>{
        const products = productModel.findAllByField('Tortas');
        res.render('products/products', {products, toThousand})
    },


};

module.exports = productController;