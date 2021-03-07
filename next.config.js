const withReactSvg = require("next-react-svg");
const path = require("path");

(module.exports = withReactSvg({
  include: path.resolve(__dirname, "./public"),
  webpack(config, options) {
    return config;
  },
})),
  {
    webpack: (config, { isServer }) => {
      if (isServer) {
        require("./utils/generateSiteMap");
      }

      return config;
    },
  },
  {
    images: {
      domains: ["firebasestorage.googleapis.com"],
    },
  };
