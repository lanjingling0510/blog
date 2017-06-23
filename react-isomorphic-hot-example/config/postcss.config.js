
module.exports = ctx => {
  return {
    plugins: [
        require('postcss-import')(),
        require('postcss-url')(),
        require('postcss-cssnext')({
            browsers: ['Chrome >= 34', '> 5%', 'last 5 versions']
        }),
        require('postcss-nested')()
    ],
  };
};
