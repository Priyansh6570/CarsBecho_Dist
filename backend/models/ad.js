import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
    {
      make: {
        type: String,
        required: [true, 'Please provide a company name'],
        trim: true,
        maxlength: [50, 'Company name cannot be more than 50 characters'],
      },
      model: {
        type: String,
        required: [true, 'Please provide a car model name'],
        trim: true,
      },
      varient: {
        type: String,
        required: [true, 'Please provide a car varient'],
        trim: true,
      },
      year: {
        type: Number,
        required: [true, 'Please provide car year'],
      },
      Km_Driven: {
        type: Number,
        required: [true, 'Please provide car Km_Driven'],
      },
      fuel: {
        type: String,
        required: [true, 'Please provide car fuel_type'],
      },
      transmission: {
        type: String,
        required: [true, 'Please provide car transmission'],
      },
      color: {
        type: String,
        required: [true, 'Please provide car color'],
      },
      no_of_owners: {
        type: String,
        required: [true, 'Please provide car no_of_owners'],
      },
      RTO: {
        type: String,
        required: [true, 'Please provide car RTO']
      },
      city: {
        type: String,
        required: [true, 'Please provide a city'],
      },
      description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxlength: [500, 'Description cannot be more than 500 characters'],
      },
      image: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      category: {
        type: String,
        required: [true, 'Please select a category for car'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      basePrice: {
        type: Number,
        required: true,
      },
      currentPrice: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        default: 300,
      },
      timer: {
        type: Number,
        default: 300,
      },
      soldAt: {
        type: Date,
      },
      auctionStarted: {
        type: Boolean,
        default: false,
      },
      auctionEnded: {
        type: Boolean,
        default: false,
      },
      sold: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      purchasedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      currentBidder: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      bids: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
          time: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      room: {
        type: mongoose.Schema.ObjectId,
        ref: 'room',
      },
    },
    { timestamps: true }
  );

export default mongoose.models.ad || mongoose.model('ad', adSchema);