const express=require('express')
const User=require('../Models/photos')
const fav=require('../Models/favourites')
const trash=require('../Models/trash')
const router=express.Router()
const fetchuser=require('../Middleware/fetchuser')
const cloudinary=require('cloudinary').v2
const multer = require('multer');
require('dotenv').config()


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/fetchallphotos',fetchuser,async (req,res)=> {
    try{
        const photo=await User.find({user:req.user.id})
        res.status(200).json(photo)
    }
    catch(error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

router.post('/addphotos', fetchuser, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { title, tag } = req.body;

    // Upload file to Cloudinary using memory buffer
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'pixelvault', tags: ['pixelvault'] },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer); // Pass the buffer to Cloudinary
    });

    // Save file details in MongoDB
    const photo = new User({
      user: req.user.id,
      title,
      filepath: result.secure_url, // Cloudinary URL
      size: req.file.size,
      tag,
    });

    const savedPhoto = await photo.save();
    res.status(200).json(savedPhoto);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put('/updatephoto/:id', fetchuser, upload.single('photo'), async (req, res) => {
  try {
    const { title, tag } = req.body;
    const newphoto = {};

    // Update fields if provided
    if (title) newphoto.title = title;
    if (tag) newphoto.tag = tag;

    // Fetch the existing photo from the database
    let photo = await User.findById(req.params.id);
    if (!photo) return res.status(404).send("Photo not found");

    // Check if the user owns the photo
    if (photo.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete old image from Cloudinary and upload new one if provided
    if (req.file) {
      // Extract the public_id from the old Cloudinary URL
      const oldPublicId = photo.filepath.split('/').pop().split('.')[0]; // Extract the public_id
      console.log("Old Public ID:", oldPublicId);

      // Delete the old image
      await cloudinary.uploader.destroy(oldPublicId, (error, result) => {
        if (error) {
          console.error("Error deleting old image:", error);
        } else {
          console.log("Old image deleted:", result);
        }
      });

      // Upload the new image to cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        tags: ['pixelvault']
      });
      newphoto.filepath = uploadResult.secure_url;
    }

    // Update the photo in the database
    photo = await User.findByIdAndUpdate(req.params.id, { $set: newphoto }, { new: true });
    res.json({ "Updated Successfully": photo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


router.delete('/deletephoto/:id',fetchuser,async (req,res)=> {
    try{

    let photo=await trash.findById(req.params.id)
    if (!photo) {return res.status(404).send("Photo not found")}

    if (photo.user.toString()!==req.user.id){return res.status(501).send("Not Allowed")}

    const publicurl=photo.filepath.split('/').slice(-1)[0].split('.')[0]
    const deletenow=await cloudinary.uploader.destroy(publicurl)
    photo=await trash.findByIdAndDelete(req.params.id)
    res.status(200).send({"Photo Deleted Successfully":photo})
    } catch(error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

router.post('/addtofavourites/:id',fetchuser,async (req,res)=> {
  try{
    let photo=await User.findById(req.params.id)
    if (!photo) {return res.status(404).send("Photo not found")}
    if (photo.user.toString()!==req.user.id){return res.status(501).send("Not Allowed")}

    const favourite=new fav({
      user:photo.user,
      title:photo.title,
      filepath:photo.filepath,
      tag:photo.tag,
      size:photo.size
    })
    await favourite.save()
    res.json({message:"Data copied Successfully"})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({message:"Internal Server Error"})
}
})

router.get('/getfavourites', fetchuser, async (req, res) => {
  try {
    const favourites = await fav.find({ user: req.user.id }); // Fetch favourites for the user
    res.json(favourites);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
});

router.delete('/removefavourites/:id',fetchuser,async (req,res)=> {
  try{
    let item=await fav.findById(req.params.id)
    if (!item) {return res.status(404).send("Photo does not exist")}
    if (item.user.toString()!==req.user.id){return res.status(501).send("Not Allowed")}

    item=await fav.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Removed from favourites successfully"})
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
})

router.delete('/addtotrash/:id',fetchuser,async (req,res)=> {
  try{
  let photo=await User.findById(req.params.id)
  if (!photo) {return res.status(404).send("Photo does not exist")}
  if (photo.user.toString()!==req.user.id){return res.status(501).send("Not Allowed")}

  const intotrash=new trash ({
    user:photo.user,
    title:photo.title,
    filepath:photo.filepath,
    tag:photo.tag,
    size:photo.size
  })
  await intotrash.save()
  photo=await User.findByIdAndDelete(req.params.id)
  res.status(200).json({"Success":"Added to trash"})
} catch (error) {
  console.error(error.message);
  res.status(500).json({message:"Internal Server Error"});
}
})

router.get('/gettrash', fetchuser, async (req, res) => {
  try {
    const favourites = await trash.find({ user: req.user.id }); // Fetch favourites for the user
    res.json(favourites);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
});

router.delete('/restore/:id',fetchuser,async (req,res)=> {
  try{
  let photo=await trash.findById(req.params.id)
  if (!photo) {return res.status(404).send("Photo does not exist")}
  if (photo.user.toString()!==req.user.id){return res.status(501).send("Not Allowed")}

  const intouser=new User ({
    user:photo.user,
    title:photo.title,
    filepath:photo.filepath,
    tag:photo.tag,
    size:photo.size
  })
  await intouser.save()
  photo=await trash.findByIdAndDelete(req.params.id)
  res.status(200).json({"Success":"Added to photos"})
} catch (error) {
  console.error(error.message);
  res.status(500).json({message:"Internal Server Error"});
}
})

module.exports=router