import rotateBitmap from './rotateBitmap';

const rotateTeapot = async () => {
  const rotatedBitmapFilename = await rotateBitmap('helpfiles/teapot.bmp');

  console.log(`Rotated bitmap saved as ${rotatedBitmapFilename}`);
};

rotateTeapot();
