const sharp = require('sharp');
const path = require('node:path');

const imgDir = path.join(__dirname, '..', 'public', 'images');
const testDir = path.join(imgDir, 'testimonials');

async function generateSlideImages() {
  const danilo = path.join(testDir, 'danilo-calic.png');
  const alexander = path.join(testDir, 'alexander-jawfox.png');
  const coach = path.join(imgDir, 'about', 'coach-workout.png');
  const couple = path.join(imgDir, 'qualifications', 'couple-training-gym.png');

  // Slide 2: Crop vertical 312x772 from couple & coach
  const left2 = await sharp(couple)
    .extract({ left: 100, top: 50, width: 360, height: 800 })
    .resize(312, 772, { fit: 'cover', position: 'center' })
    .toBuffer();

  const right2 = await sharp(coach)
    .extract({ left: 200, top: 40, width: 360, height: 800 })
    .resize(312, 772, { fit: 'cover', position: 'center' })
    .toBuffer();

  await sharp({
    create: {
      width: 624,
      height: 772,
      channels: 4,
      background: { r: 31, g: 31, b: 31, alpha: 1 },
    },
  })
    .composite([
      { input: left2, left: 0, top: 0 },
      { input: right2, left: 312, top: 0 },
    ])
    .webp({ quality: 90 })
    .toFile(path.join(testDir, 'slide2-combined.webp'));

  console.log('Created slide2-combined.webp');

  // Slide 3: Crop vertical 312x772 from couple (partner training) & alexander
  const left3 = await sharp(couple)
    .extract({ left: 550, top: 60, width: 360, height: 800 })
    .resize(312, 772, { fit: 'cover', position: 'center' })
    .toBuffer();

  const right3 = await sharp(alexander)
    .resize(312, 772, { fit: 'cover' })
    .modulate({ brightness: 1.05, saturation: 1.1 })
    .toBuffer();

  await sharp({
    create: {
      width: 624,
      height: 772,
      channels: 4,
      background: { r: 31, g: 31, b: 31, alpha: 1 },
    },
  })
    .composite([
      { input: left3, left: 0, top: 0 },
      { input: right3, left: 312, top: 0 },
    ])
    .webp({ quality: 90 })
    .toFile(path.join(testDir, 'slide3-combined.webp'));

  console.log('Created slide3-combined.webp');
}

generateSlideImages().catch(console.error);
