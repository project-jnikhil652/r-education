const Category = require("../models/category")
const fileUpload = require('express-fileupload');


// ADD---CATEGORY---

exports.addcategory = async(req, res) => {
    try {
        let categoryImage = '';
        if (req.files) {
            let sampleFiles = req.files.categoryImage;
            if (sampleFiles) {
                let uploadPath = "./public/images";
                sampleFiles.mv(uploadPath + '/' + sampleFiles.name);
                categoryImage = uploadPath + '/' + sampleFiles.name;
                console.log(categoryImage);
            }
        }
        const category = new Category()
        category.categoryname = req.body.categoryname;

        category.categoryImage = categoryImage;
        console.log(category)
        await category.save()

        return res.status(200).json({ msg: "category added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET---CATEGORY---

exports.getcategory = async(req, res) => {
    try {
        const getcategory = await Category.find({})
        console.log(getcategory)
        return res.status(200).json({ msg: "all categories", getcategory })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// DELETE---CATEGORY---

exports.deletecategory = async(req, res) => {
    try {
        const category = await Category.deleteOne({ _id: req.params.id })
        console.log(category)
        return res.status(400).json({ msg: "category deleted", category })
    } catch (error) {
        console.log(error)
        return res.status(400).jsonP({ msg: "something went wrong" })
    }
}


// UPDATE---CATEGORY---

exports.updatecategory = async(req, res) => {
    try {
        // const categoryimage = req.file ? req.file.filename : null;
        let data = {};
        let categoryImage = '';
        if (req.files) {
            if (req.files.signature) {
                let uploadPath = "./public/images";
                let sampleFiles = req.files.signature;
                sampleFiles.mv(uploadPath + '/' + sampleFiles.name);
                categoryImage = uploadPath + '/' + sampleFiles.name;
            }
        }
        if (categoryImage) {
            data.categoryImage = categoryImage;
        }
        data.categoryname = req.body.categoryname;
        const category = await Category.findOne({ _id: req.params.id })
        if (category) {
            Object.assign(category, data);
            await v18.save();
        }
        console.log(category)
        return res.status(200).json({ msg: "category updated" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}