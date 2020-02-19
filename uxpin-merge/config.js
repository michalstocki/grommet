const { getMergePropsFromComponentDoc } = require('./getMergePropsFromComponentDoc');

module.exports = {
  components: {
    categories: [
      {
        name: "Evaluated components",
        include: [
          "src/js/components/Box/Box.js",
          "src/js/components/Button/Button.js",
        ]
      }
    ],
    plugins: {
      serialization: getMergePropsFromComponentDoc,
    }
  },
  name: "Grommet"
}
