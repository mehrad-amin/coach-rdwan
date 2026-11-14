const sharp = require('C:/Users/R.F/.gemini/antigravity/scratch/personal-trainer-landing/node_modules/sharp');
const fs = require('fs');
const path = require('path');

const targetDir = 'C:/Users/R.F/.gemini/antigravity/scratch/personal-trainer-landing/public/images/testimonials';
const candDir = 'C:/Users/R.F/.gemini/antigravity/brain/7218677e-95da-42f7-aea9-e60cc3c72a28/scratch/candidates';

async function processPortraits() {
  // Portrait 1: Pexels 863986 (Bruce Mars - smiling athletic woman in red top with dumbbell)
  // Target dimensions: 624x772 (retina for 312x386 panel)
  // Frame with focus on face and upper body
  const p1Source = path.join(candDir, 'pexels-863986.jpg');
  await sharp(p1Source)
    .resize(624, 772, {
      fit: 'cover',
      position: sharp.position.center, // face and torso well centered
    })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, 'testimonial-portrait-1.webp'));
  console.log('Generated testimonial-portrait-1.webp');

  // Portrait 2: Pexels 17210041 (Onur Kurt - muscular athletic man in gym with wrist wrap)
  const p2Source = path.join(candDir, 'pex-17210041.jpg');
  await sharp(p2Source)
    .resize(624, 772, {
      fit: 'cover',
      position: sharp.position.top, // prioritize face and muscular upper body
    })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, 'testimonial-portrait-2.webp'));
  console.log('Generated testimonial-portrait-2.webp');

  // Portrait 3: Pexels 8520561 (Julia Larson - confident athletic woman smiling in activewear)
  const p3Source = path.join(candDir, 'pexels-8520561.jpg');
  await sharp(p3Source)
    .resize(624, 772, {
      fit: 'cover',
      position: sharp.position.top, // keep smiling face and athletic shoulders prominent
    })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, 'testimonial-portrait-3.webp'));
  console.log('Generated testimonial-portrait-3.webp');
}

processPortraits().catch(console.error);
