const Category = require('../models/category');

exports.categoryCreate = async (req, res) => {
    try {
        const { title } = req.body;

        const newcategory = new Category({
            title,
        });

        await newcategory.save();
        res.status(201).json({ message: 'category başarıyla kaydedildi.' });
    } catch (error) {
        res.status(500).json({ error: 'Bir hata oluştu.' });
    }
};

exports.categoryUpdate = async (req, res) => {
try {
    const categoryId = req.params.id;
    const { title } = req.body;
    const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId },
        { $set: {title} },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(updatedCategory);
} catch (error) {
    res.status(500).json({ message: 'Error updating post in MongoDB' });
}
   
};


exports.categoryGetAll = async (req, res) => {
    const category = await Category.find();
    res.json(category);
};
