const classifier = require('./tools/ProcessNumberClassifier');

module.exports = {
  parse: function (process) {
    return classifier.classify(process);
  },
  parseMany: function (processes) {
    const resultList = [];
    processes.forEach(process => {
      resultList.push(classifier.classify(process));
    });
    return resultList;
  }
}