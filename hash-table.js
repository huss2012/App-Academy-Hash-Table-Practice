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

    //1.Create the keyValuePair:
    let keyValuePair = new KeyValuePair(key, value);
    //if count exced the capcity throw error:
    if (this.count === this.capacity || this.data.includes(keyValuePair)) {
      throw Error("hash collision or same key/value pair already exists!")
    }
    //2.Create the hash:
    let index = this.hashMod(key);//will return the index;
    this.data[index] = keyValuePair;
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    //1.Create the keyValuePair:
    let keyValuePair = new KeyValuePair(key, value);
    //2.Create the index => where to put the keyvaluepair:
    let index = this.hashMod(key);
    //3.Check if the index is not null => means ecupied
    if (this.data[index] !== null) {//means there is keyvaluepair
      keyValuePair.next = this.data[index];
    }
    this.data[index] = keyValuePair;
    this.count++;
  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;
