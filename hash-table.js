const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    // Your code here
    // let letters = ["a", "b", "c", "d", "e", "f"];
    // let lettersHexValues = [10, 11, 12, 13, 14, 15];
    // let count = 0;
    // let sha = sha256(key);//64hexchar
    // console.log(sha);

    // for (let i = 7; i >= 0; i--){
    //   let hexChar = sha[i];
    //   console.log(hexChar);
    //   if (letters.includes(hexChar)) {//if true it is a letter find the value.

    //     for (let j = 0; j < letters.length; j++){
    //       let letterValue = letters[j];

    //       if (letterValue === hexChar) {
    //         count += Math.pow(16, 7 - i) * lettersHexValues[j];
    //       }
    //     }
    //   } else {//if it is a number 0-9
    //     count += Math.pow(16, 7 - i) * hexChar;
    //   }
    // }
    // return count;
    let count = 0;
    const sha = sha256(key);
    for (let i = 7; i >= 0; i--){
      const hexChar = sha[i];

      const value = Number("0x" + hexChar);
      count += Math.pow(16, 7 - i) * value;
    }
    return count;
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
  }

  insertWithHashCollisions(key, value) {
    // Your code here
  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;
