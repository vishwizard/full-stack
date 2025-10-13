const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

// @route   POST /api/verification/verify
// @desc    Verify transaction by scanning QR code
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const { tid } = req.body;

    if (!tid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide transaction ID'
      });
    }

    // Find transaction
    const transaction = await Transaction.findOne({ tid });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'Transaction not found'
      });
    }

    // Check if current user is the receiver
    const isReceiver = transaction.receiver.userId.toString() === req.user._id.toString();

    if (!isReceiver) {
      return res.status(403).json({
        success: false,
        verified: false,
        message: 'You are not the receiver of this transaction'
      });
    }

    // Check transaction status
    if (transaction.status !== 'completed') {
      return res.status(400).json({
        success: false,
        verified: false,
        message: `Transaction status: ${transaction.status}`
      });
    }

    // Mark as verified
    if (transaction.verificationStatus === 'unverified') {
      transaction.verificationStatus = 'verified';
      transaction.verifiedAt = new Date();
      await transaction.save();
    }

    res.json({
      success: true,
      verified: true,
      data: {
        tid: transaction.tid,
        amount: transaction.amount,
        sender: {
          name: transaction.sender.name,
          upiId: transaction.sender.upiId
        },
        timestamp: transaction.timestamp,
        verifiedAt: transaction.verifiedAt,
        description: transaction.description
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/verification/pending
// @desc    Get pending verifications for receiver
// @access  Private
router.get('/pending', protect, async (req, res) => {
  try {
    const pendingTransactions = await Transaction.find({
      'receiver.userId': req.user._id,
      status: 'completed',
      verificationStatus: 'unverified'
    }).sort({ timestamp: -1 });

    res.json({
      success: true,
      count: pendingTransactions.length,
      data: pendingTransactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
