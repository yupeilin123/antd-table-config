module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/env',
      {
        modules: 'false',
        targets: {
          browsers: [
            '> 1%',
            'last 2 versions',
            'not ie <= 8',
          ],
        },
      },
    ],
    '@babel/preset-react',
  ];

  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ];

  return {
    presets,
    plugins,
  };
};
