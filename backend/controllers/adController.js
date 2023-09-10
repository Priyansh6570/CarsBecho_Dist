import Ad from '../models/ad.js';
import Room from '../models/room.js';
import User from '../models/userModel.js';
import {getIo} from '../socket.js';
import catchAsyncError from '../middleware/catchAsyncError.js';
import cloudinary from 'cloudinary';

// Function to upload images to Cloudinary
const uploadImagesToCloudinary = async (images) => {
  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'cars',
      width: 1000,
      crop: 'scale',
      quality: 'auto:good',
      fetch_format: 'auto',
      flags: 'progressive', 
      lazy: true,
    });

    const imageLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    imagesLinks.push(imageLink);
  }

  return imagesLinks;
};

// @route   POST /ad
// @desc    Post a new ad
export const addAd = catchAsyncError(async (req, res, next) => {
  const { make, model, varient, year, Km_Driven, fuel, transmission, color, no_of_owners, RTO, city, description, image, category, basePrice } = req.body;
  const owner = req.user.id;

  // Upload images to Cloudinary
  const imagesLinks = await uploadImagesToCloudinary(image);

  const adData = {
    make,
    model,
    varient,
    year,
    Km_Driven,
    fuel,
    transmission,
    color,
    no_of_owners,
    RTO,
    city,
    description,
    image: imagesLinks,
    category,
    basePrice,
    owner,
  };

  let duration = 300;
  if (req.body.duration !== null && req.body.duration !== 0) {
    duration = req.body.duration > 10800 ? 3600 : req.body.duration;
  }

  const timer = duration;

  try {
    let ad = new Ad({
      ...adData,
      duration,
      timer,
    });

    // Create room for auction
    let room = new Room({ ad: ad._id });
    room = await room.save();

    ad.room = room._id;
    ad = await ad.save();

    const user = await User.findById(ad.owner);
    user.postedAds.push(ad._id);
    await user.save();

    getIo().emit('addAd', { action: 'add', ad: ad });

    res.status(200).json({ ad, room });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// @route   GET /ad
// @desc    Retrieve list of all ads
export const retrieveAds = catchAsyncError(async (req, res, next) => {
  const { user, option } = req.query;
  let adList = [];

  try {
    if (user) {
      adList = await Ad.find({ owner: user }).sort({ createdAt: -1 });
    } else if (option === 'notexpired') {
      adList = await Ad.find({ auctionEnded: false }).sort({ createdAt: -1 });
    } else {
      adList = await Ad.find().sort({ createdAt: -1 });
    }

    res.status(200).json(adList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// @route   GET /ad/:id
// @desc    Find one ad
export const findAd = catchAsyncError(async (req, res, next) => {
  const adId = req.params.id;

  try {
    const ad = await Ad.findById(adId).populate('owner', { password: 0 });
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    res.status(200).json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// @route   PUT /ad/:id
// @desc    Update an ad
export const updateAd = catchAsyncError(async (req, res, next) => {
  const adId = req.params.id;

  try {
    let ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner != req.user.id) return res.status(401).json({ errors: [{ msg: 'Unauthorized to delete this ad' }] });

    if (req.body.basePrice) {
      req.body.currentPrice = req.body.basePrice;
    }

    ad = await Ad.findByIdAndUpdate(adId, req.body, { new: true });

    res.status(200).json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// @route   DELETE /ad/:id
// @desc    Delete an ad
export const deleteAd = catchAsyncError(async (req, res, next) => {
  const adId = req.params.id;

  try {
    const ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner != req.user.id) return res.status(401).json({ errors: [{ msg: 'Unauthorized to delete this ad' }] });
    if (ad.auctionStarted || ad.auctionEnded) return res.status(404).json({ errors: [{ msg: 'Cannot delete, auction started/ended' }] });

    await Ad.deleteOne({ _id: adId });

    res.status(200).json({ msg: 'Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});
