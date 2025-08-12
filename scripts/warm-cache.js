/**
 * Cache warming script for preloading critical content
 */

const { warmCache } = require('../dist/lib/cache');

async function warmCacheScript() {
  console.log('Starting cache warming...');
  
  try {
    await warmCache();
    console.log('Cache warming completed successfully');
  } catch (error) {
    console.error('Cache warming failed:', error);
    process.exit(1);
  }
}

warmCacheScript();