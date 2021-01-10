// text to binary (8-bit)
function getBinary(string) {
  let binary = "";
  for (let i = 0; i < string.length; i++) {
    let current = string.charCodeAt(i).toString(2);
    if (current.length < 8) {
      for (let j = current.length; j < 8; j++) {
        current = "0" + current;
      }
    }
    binary += current;
  }

  return binary;
}

// binary (8-bit) to text
function getText(binary) {
  let string = "";
  for (let i = 0; i < binary.length; i += 8) {
    let current = binary.slice(i, i + 8);
    let letter = String.fromCharCode(parseInt(current, 2));
    string += letter;
  }

  return string;
}

// keygen
function keygen(binary1, binary2) {
  if (binary1.length > binary2.length) {
    let j = 0;
    for (let i = binary2.length; i < binary1.length; i++) {
      let bit0 = binary2[j];
      let bit1 = binary2[j + 1];
      let newBit = xor(bit0, bit1);
      binary2 += newBit;
      j++;
    }
  }

  return binary2;
}

// bitwise xor addition
function xor(binary1, binary2) {
  let outcome = "";
  for (let i = 0; i < binary1.length; i++) {
    let current;
    if (binary1[i] === binary2[i]) {
      current = "0";
    } else {
      current = "1";
    }
    outcome += current;
  }

  return outcome;
}

// encryption
function encrypt() {
  let plaintext = document.getElementById("input").value;
  let key = document.getElementById("key").value;
  let binary1 = getBinary(plaintext);
  let binary2 = getBinary(key);
  binary2 = keygen(binary1, binary2);
  let outcome = xor(binary1, binary2);

  document.getElementById("output").innerHTML = outcome;
}

// decryption
function decrypt() {
  let binary1 = document.getElementById("input").value;
  let key = document.getElementById("key").value;
  let binary2 = getBinary(key);
  binary2 = keygen(binary1, binary2);
  let outcome = xor(binary1, binary2);
  let string = getText(outcome);

  document.getElementById("output").innerHTML = string;
}
