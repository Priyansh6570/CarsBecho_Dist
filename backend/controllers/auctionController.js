import Ad from '../models/ad.js';
import User from '../models/userModel.js';
import {getAdIo} from '../socket.js';
import catchAsyncError from '../middleware/catchAsyncError.js';

// @route   POST /auction/start/:adId
// @desc    Start auction
export const startAuction = catchAsyncError(async (req, res, next) => {
  const { adId } = req.params;

  try {
    let ad = await Ad.findById(adId).populate('owner', { password: 0 });

    if (!ad) return res.status(400).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner._id.toString() !== req.user.id)
      return res.status(400).json({ errors: [{ msg: 'Unauthorized to start' }] });
    if (ad.auctionEnded)
      return res.status(400).json({ errors: [{ msg: 'Auction has already ended' }] });
    if (ad.auctionStarted)
      return res.status(400).json({ errors: [{ msg: 'Already started' }] });

    ad.auctionStarted = true;
    await ad.save();

    // Notify clients that auction has started
    getAdIo().to(ad._id.toString()).emit('auctionStarted', { action: 'started', data: ad });
    
    res.status(200).json({ msg: 'Auction started' });

    // Run down timer
    ad.timer = parseInt(ad.duration);
    ad.auctionEnded = false;
    let timer = parseInt(ad.timer);

    let intervalTimer = setInterval(async () => {
      timer -= 1;
      await ad.updateOne({ timer: timer });
      
      // Notify clients about timer update
      getAdIo().to(ad._id.toString()).emit('timer', {
        action: 'timerUpdate',
        data: { timer: timer, _id: ad._id },
      });
    }, 1000);

    setTimeout(async () => {
      clearInterval(intervalTimer);
      let auctionEndAd = await Ad.findById(ad._id).populate('owner', { password: 0 });
      auctionEndAd.auctionEnded = true;
      auctionEndAd.timer = 0;

      if (auctionEndAd.currentBidder) {
        auctionEndAd.purchasedBy = auctionEndAd.currentBidder;
        auctionEndAd.sold = true;
        await auctionEndAd.save();

        // Add product to winner
        let winner = await User.findById(auctionEndAd.currentBidder);
        winner.purchasedProducts.push(auctionEndAd._id);
        await winner.save();

        // Notify clients about auction end
        getAdIo().to(auctionEndAd._id.toString()).emit('auctionEnded', { action: 'sold', ad: auctionEndAd, winner: winner });
      } else {
        // Notify clients about auction end
        getAdIo().to(auctionEndAd._id.toString()).emit('auctionEnded', { action: 'notSold', data: auctionEndAd });
        await auctionEndAd.save();
      }
    }, (ad.duration + 1) * 1000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

const runTimer = async (ad) => {
  // Add your timer logic here if needed
};
