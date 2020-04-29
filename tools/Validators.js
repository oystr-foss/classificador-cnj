// const ptn_email = /[^@]+@[^.]+\.*.+/;

module.exports = {
  isValidCNJ(number) {
    if(!number) {
      return false;
    }
    const plainNumber = number.replace(/\D/g, "");
    return plainNumber.length == 20;
  }
}