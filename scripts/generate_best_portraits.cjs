const sharp = require('C:/Users/R.F/.gemini/antigravity/scratch/personal-trainer-landing/node_modules/sharp');
const path = require('path');

const targetDir = 'C:/Users/R.F/.gemini/antigravity/scratch/personal-trainer-landing/public/images/testimonials';
const candDir = 'C:/Users/R.F/.gemini/antigravity/brain/7218677e-95da-42f7-aea9-e60cc3c72a28/scratch/candidates';

async function generateBestPortraits() {
  // Portrait 1: Bruce Mars (Pexels 863986)
  // Fetch original high-res 6100x4067 image and crop a generous, natural upper-body portrait
  const p1Res = await fetch('https://images.pexels.com/photos/863986/pexels-photo-863986.jpeg');
  const p1Buf = Buffer.from(await p1Res.arrayBuffer());
  await sharp(p1Buf)
    .extract({ left: 300, top: 200, width: 3800, height: 3800 })
    .resize(624, 772, { fit: 'cover', position: 'top' })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, 'testimonial-portrait-1.webp'));
  console.log('Saved portrait 1 (generous upper-body with dumbbell)');

  // Portrait 2: Onur Kurt (Pexels 17210041)
  // Fetch original high-res image and crop with ample room around head and muscular arms
  const p2Res = await fetch('https://images.pexels.com/photos/17210041/pexels-photo-17210041.jpeg?auto=compress&cs=tinysrgb&w=1200');
  const p2Buf = Buffer.from(await p2Res.arrayBuffer());
  await sharp(p2Buf)
    .resize(624, 772, { fit: 'cover', position: 'top' })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, 'testimonial-portrait-2.webp'));
  console.log('Saved portrait 2 (athletic man with wrist wrap in gym)');

  // Portrait 3: Julia Larson (Pexels 8520561)
  // Fetch original high-res image and crop with ample room around smiling face and athletic activewear
  const p3Res = await fetch('https://images.pexels.com/photos/8520561/pexels-photo-8520561.jpeg?auto=compress&cs=tinysrgb&w=1200');
  const p3Buf = Buffer.from(await p3Res.arrayBuffer());
  await sharp(p3Buf)
    .resize(624, 772, { fit: 'cover', position: 'top' })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, 'testimonial-portrait-3.webp'));
  console.log('Saved portrait 3 (smiling athletic woman in black sportswear)');
}

generateBestPortraits().catch(console.error);
