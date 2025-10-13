const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  tid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  sender: {
    upiId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  receiver: {
    upiId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
    min: [1, 'Amount must be at least 1']
  },
  description: {
    type: String,
    default: 'Payment'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  verificationStatus: {
    type: String,
    enum: ['unverified', 'verified', 'disputed'],
    default: 'unverified'
  },
  verifiedAt: {
    type: Date
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  qrCode: {
    type: String // Base64 encoded QR code
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceInfo: String
  }
});

// Index for faster queries
transactionSchema.index({ 'sender.userId': 1, timestamp: -1 });
transactionSchema.index({ 'receiver.userId': 1, timestamp: -1 });
transactionSchema.index({ tid: 1, 'receiver.upiId': 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
