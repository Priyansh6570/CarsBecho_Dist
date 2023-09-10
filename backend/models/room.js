import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
      ad: {
        type: mongoose.Types.ObjectId,
        ref: 'ad',
        required: true,
      },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    { timestamps: true }
  );

export default mongoose.models.room || mongoose.model('room', roomSchema);