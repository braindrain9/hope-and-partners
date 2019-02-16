let isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // REST_ENDPOINT: JSON.stringify('http://localhost:8888/wp-json/wp/v2'),
  REST_ENDPOINT: JSON.stringify('https://wptavern.com/wp-json/wp/v2'),
  CONTENT_ENDPOINT: JSON.stringify('http://hopeandpart.com/wp-content/themes/wp-vue/'),
  POSTS_PER_PAGE: JSON.stringify(9),
  GA_TRACKING_ID: JSON.stringify(isProd ? 'UA-111438908-1' : 'XXX'),
  REQUEST_CACHE_MAX: JSON.stringify(150)
};
