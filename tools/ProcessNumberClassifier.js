const { isValidCNJ } = require('./Validators');

const justiceMap = new Map([
  ["2", "CNJ"],
  ["3", "STJ"],
  ["4", "JF"],
  ["5", "JT"],
  ["6", "JE"],
  ["7", "JMU"],
  ["8", "JEDFT"],
  ["9", "JME"]
]);

const tjTrtUfs = new Map([
  ["01", "AC"],
  ["02", "AL"],
  ["03", "AP"],
  ["04", "AM"],
  ["05", "BA"],
  ["06", "CE"],
  ["07", "DF"],
  ["08", "ES"],
  ["09", "GO"],
  ["10", "MA"],
  ["11", "MT"],
  ["12", "MS"],
  ["13", "MG"],
  ["14", "PA"],
  ["15", "PB"],
  ["16", "PR"],
  ["17", "PE"],
  ["18", "PI"],
  ["19", "RJ"],
  ["20", "RN"],
  ["21", "RS"],
  ["22", "RO"],
  ["23", "RR"],
  ["24", "SC"],
  ["25", "SE"],
  ["26", "SP"],
  ["27", "TO"]
])

module.exports = {
  classify(process) {
    if(!isValidCNJ(process)) {
      return {
        process, 
        error: "Numeração inválida."
      };
    }

    const processSubstrings = processToSubstring(process);
    if(processSubstrings[3] === "0") {
      return {
        process, 
        error: "Numeração inválida."
      };
    }

    const data = getCourtByJusticeAndCourtNumber(processSubstrings[3], processSubstrings[4]);
    if(data.court === "Numeração inválida.") {
      return {
        process, 
        error: "Numeração inválida."
      };
    }

    return {
      process,
      justice: data.justice,
      court: data.court,
      courtRegion: data.courtRegion,
    }
  }
}

function getCourtByJusticeAndCourtNumber(justice, court) {
  const justiceName = justiceMap.get(justice);
  const courtData = getCourtFromData(justice, court);
  return {
    justice: justiceName,
    court: courtData.courtName,
    courtRegion: courtData.courtRegion,
  }
}

function processToSubstring(process) {
  const plainProcess = process.replace(/\D/g, "");
  return [
    plainProcess.substring(0, 7),
    plainProcess.substring(7, 9),
    plainProcess.substring(9, 13),
    plainProcess.substring(13, 14),
    plainProcess.substring(14, 16),
    plainProcess.substring(16, 20),
  ]
}

function getCourtFromData(justice, court) {
  var courtName = "Numeração inválida.";
  var courtRegion = "";
  const c = parseInt(court);

  switch(justice) {
    case "1":
      if(court === "00") {
        courtName = "STF";
      }
      break;
    case "2":
      if(court === "90") {
        courtName = "CJF ou CSJT";
      }
      break;
    case "3":
      if(court === "00") {
        courtName = "STJ";
      }
      break;
    case "4":
      if(c > 0 && c < 6){
        courtName = "STF";
        courtRegion = court + "ª região";
      }
      break;
    case "5":
      if(c > 0 && c < 25){
        courtName = "TRT";
        courtRegion = court + "ª região";
      }
      break;
    case "6":
      if(c > 0 && c < 28){
        courtName = "TRE";
        courtRegion = tjTrtUfs.get(court);
      }
      break;
    case "7":
      if(court === "00"){
        courtName = "STM";
      }
      if(c > 0 && c < 13){
        courtName = "CJM";
        courtRegion = court + "ª CJM";
      }
      break;
    case "8":
      if(c > 0 && c < 28){
        courtName = "TJ";
        courtRegion = tjTrtUfs.get(court);
      }
      break;
    default:
      if(court === "13" || court === "21" || court === "26") {
        courtName = "TM";
        if(court === "13"){
          courtRegion = "MG";
        }
        else
        if(court === "21"){
          courtRegion = "RS";
        }
        else
        {
          courtRegion = "SP";
        }
      }
  }
  if(courtRegion === "") {
    courtRegion = courtName;
  }
  return {
    courtName,
    courtRegion,
  }
}