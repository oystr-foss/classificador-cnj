const classifier = require('./tools/ProcessNumberClassifier');

module.exports = {
  parse: function (process) {
    return classifier.classify(process);
  },
  parseMany: function (processes) {
    return processes.map(classifier.classify);
  }
}