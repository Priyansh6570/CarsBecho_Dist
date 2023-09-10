import Room from '../models/room.js';
import catchAsyncError from '../middleware/catchAsyncError.js';

// @route   POST /room/join/:roomId
// @desc    Add user to a room
export const joinRoom = catchAsyncError(async (req, res, next) => {
  const { user } = req;
  const { roomId } = req.params;

  try {
    let room = await Room.findById(roomId);
    
    // Check if user is already in the room
    const userInRoom = room.users.some((roomUser) => {
      return roomUser._id.toString() === user.id;
    });

    if (userInRoom) {
      return res.status(400).json({ errors: [{ msg: 'Already joined' }] });
    }

    room.users.push(user.id);
    room = await room.save();

    // Populate user details except for the password
    room = await Room.findById(roomId).populate('users', { password: 0 });

    res.status(200).json({ msg: 'Successfully joined', room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// @route   GET /room/:roomId
// @desc    Get room details
export const getRoom = catchAsyncError(async (req, res, next) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId).populate('users', { password: 0 });
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});
