const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {

	constructor(_forwardWay=true) {
		this.forwardWay = _forwardWay;
	}
  getTable() {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var table = [];
    for (var i = 0; i < alphabet.length; i++) {
        table[i] = alphabet.slice(i).concat(alphabet.slice(0, i));
    }
    return table;
  }
  encrypt(message, key) {
    if(message===undefined || key===undefined){
      throw new error();
    }
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const table = this.getTable();
    var cryptStr = '';
    message = message.toUpperCase();
    key = key.toUpperCase();
    for (var i = 0,j = 0; i < message.length; i++, j++) {
      if(alphabet.indexOf(key[i]) === -1 ){//&& this.forwardWay
        key += key;
        // if(!this.forwardWay){
        //   console.log(key);
        // }
      }
      if(alphabet.indexOf(message[i]) === -1){
        cryptStr += message[i];
        j--;
        continue;
      }
      cryptStr += table[alphabet.indexOf(message[i])][alphabet.indexOf(key[j])];
    }
    if(!this.forwardWay){
      // console.log('forwardWay: '+this.forwardWay);
      // console.log('message: '+message+'; cryptStr: '+cryptStr.split('').reverse().join('')+'\n');
      return cryptStr.split('').reverse().join('');
    }
    // console.log('message: '+message+'; cryptStr: '+cryptStr);
    return cryptStr;
  }    
  decrypt(message, key) {
    if(message===undefined || key===undefined){
      throw new error();
    }
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var decryptStr = '';
    const table = this.getTable();
    key = key.toUpperCase();
    for (var i = 0,j = 0; i < message.length; i++, j++) {
      if(alphabet.indexOf(key[i]) === -1){// && this.forwardWay
        key += key;
        // if(!this.forwardWay){
        //   console.log(key);
        // }
      }
      if(alphabet.indexOf(message[i]) === -1){
        decryptStr += message[i];
        j--;
        continue;
      }
      var 
       row = alphabet.indexOf(key[j]),
       coll = table[row].indexOf(message[i]);
  
      decryptStr += alphabet[coll];
    }
    if(!this.forwardWay){
      // console.log('forwardWay: '+this.forwardWay);
      // console.log('message: '+message+'; decryptStr: '+decryptStr.split('').reverse().join('')+'\n');
      return decryptStr.split('').reverse().join('');
    }
    // console.log('message: '+message+'; decryptStr: '+decryptStr+'\n');
    return decryptStr;
  }
}

module.exports = VigenereCipheringMachine;
