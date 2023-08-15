module.exports = {
  packagerConfig: {
    asar: false ,
    electronVersion:"26.0.0"
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    }
  ],
  plugins: [
  ],
};
