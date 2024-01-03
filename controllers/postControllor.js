const Category = require('../models/category');
const Post = require('../models/post');

exports.postCreate = async (req, res) => {
    try {
        const { content, title,categoryId } = req.body;
        const categoryid = await Category.findOne({ _id: categoryId });
        if (!categoryid) {
            return res.status(404).json({ message: 'Bele bir Category yoxdu' });
          }
        const newpost = new Post({
            content,
            title,
            categoryId:categoryid
        });

        await newpost.save();
        res.status(201).json({ message: 'Post başarıyla kaydedildi.' });
    } catch (error) {
    
        res.status(500).json({ error: 'Bir hata oluştu.' });
    }
};

exports.postUpdate = async (req, res) => {
try {
    const postId = req.params.id;
    const { content, title,categoryId } = req.body;
    const categoryid = await Category.findOne({ _id: categoryId });
    if (!categoryid) {
        return res.status(404).json({ message: 'Bele bir Category yoxdu' });
      }
    const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { content, title,categoryId:categoryid} },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(updatedPost);
} catch (error) {
    res.status(500).json({ message: 'Error updating post in MongoDB' });
}
   
};


exports.postGetAll = async (req, res) => {
    const post = await Post.find().populate('category', 'name');
    res.json(post);
};
