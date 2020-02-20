const { getMergePropsFromComponentDoc } = require('./getMergePropsFromComponentDoc');

module.exports = {
  components: {
    categories: [
      {
        name: "Evaluated components",
        include: [
          "src/js/components/Box/Box.js",
          "src/js/components/Button/Button.js",
          "src/js/components/Accordion/Accordion.js",
          "src/js/components/AccordionPanel/AccordionPanel.js",
          "src/js/components/Calendar/Calendar.js",
          "src/js/components/Menu/Menu.js",
        ]
      }
    ],
    plugins: {
      serialization: getMergePropsFromComponentDoc,
    }
  },
  name: "Grommet"
}
