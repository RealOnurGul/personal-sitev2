// Ignore missing source map from @mediapipe/tasks-vision (dependency of @react-three/drei).
// The package references vision_bundle_mjs.js.map which is not published to npm.
module.exports = {
  webpack: {
    configure: (config) => {
      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        /Failed to parse source map/,
      ];
      return config;
    },
  },
};
