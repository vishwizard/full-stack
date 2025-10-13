const QRCode = require('qrcode');

exports.generateQRCode = async (data) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(data), {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      width: 300
    });
    return qrCodeDataURL;
  } catch (error) {
    throw new Error('QR Code generation failed');
  }
};

exports.generateTID = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `TXN${timestamp}${randomStr}`.toUpperCase();
};
