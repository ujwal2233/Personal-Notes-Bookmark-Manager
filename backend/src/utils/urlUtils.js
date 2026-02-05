const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Fetches the page title from a given URL
 * @param {string} url - The URL to fetch the title from
 * @returns {Promise<string|null>} - The page title or null if not found
 */
const fetchPageTitle = async (url) => {
  try {
    // Ensure URL has protocol
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = `https://${url}`;
    }

    const response = await axios.get(fullUrl, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const title = $('title').first().text().trim();
    
    return title || null;
  } catch (error) {
    console.error(`Failed to fetch title from ${url}:`, error.message);
    return null;
  }
};

module.exports = {
  fetchPageTitle
};
