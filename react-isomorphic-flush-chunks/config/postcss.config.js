module.exports = ctx => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-mixins')(),
    require('postcss-cssnext')({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
    }),
    require('postcss-nested')()
  ]
});
