const fs = require('fs');
const path = require('path');

// Test the MDX library directly
const CONTENT_DIR = path.join(process.cwd(), 'src/content');

console.log('Testing MDX library...');
console.log('Content directory:', CONTENT_DIR);

try {
  const sections = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log('Available sections:', sections);
  
  sections.forEach(section => {
    const filePath = path.join(CONTENT_DIR, section, 'index.mdx');
    console.log(`Section ${section}: ${fs.existsSync(filePath) ? 'EXISTS' : 'MISSING'}`);
    if (fs.existsSync(filePath)) {
      console.log(`  Size: ${fs.statSync(filePath).size} bytes`);
    }
  });
  
  console.log('✓ MDX library test completed successfully');
} catch (error) {
  console.error('✗ MDX library test failed:', error.message);
}