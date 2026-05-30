const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function songUpload(file, fileName) {
  try {
    const response = await imagekit.upload({
      file,
      fileName,
      folder: "/songs",
      useUniqueFileName: true,
    });

    return {
      url: response.url,
      fileId: response.fileId,
      songTitle: fileName.replace(/\.[^/.]+$/, ""),
    };
  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    throw error;
  }
}

module.exports = songUpload;