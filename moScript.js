//Run the script in the terminal. Have fun!

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Set up a random number generator for Step 7
const randNumber = () => {
  const randomNumber = Math.floor(Math.random() * 30);
  return randomNumber;
};

//Step 3
function pAequorFactory(number, dnaArray) {
  return {
    specimenNum: number,
    dna: dnaArray,
    //Step 4
    mutate() {
      //Choose random bases and indecies
      const ranDnaBase = ["G", "T", "A", "C"];
      let randBase = ranDnaBase[Math.floor(Math.random() * 4)];

      let selectBase = this.dna.indexOf(
        this.dna[Math.floor(Math.random() * this.dna.length)]
      );

      //Compare and switch the random bases, if they are coincedentally the same you have to try again

      /*First try:
      if (randBase !== this.dna[selectBase]){
        this.dna[selectBase] = [randBase];
      } else {
        return "Try again!";
      }
      */

      //Second try:
      let selBaseTwo;
      do {
        selBaseTwo = Math.floor(Math.random() * this.dna.length);
      } while (randBase === this.dna[selBaseTwo]);

      this.dna[selBaseTwo] = randBase;

      //Return the changed DNA
      return this.dna;
    },
    //Step 5
    compareDNA(pAequor) {
      let counter = 0;
      let result;
      //Here we iterate through two arrays at once and compare the elements. When true the counter goes up. We need the counter to calculate the percentage:
      this.dna.forEach((element1, index) => {
        const element2 = pAequor.dna[index];
        if (element1 === element2) {
          counter++;
        }
      });
      //Final calculation:
      result = (counter / (this.dna.length + pAequor.dna.length)) * 100;
      /* //Manipulated the original function for the last challenge//
      console.log(
        `Specimen #${this.specimenNum} and specimen #${
          pAequor.specimenNum
        } have ${result.toFixed(2)} DNA in common.`
      );
      */
      return result;
    },
    //Step 6
    willLikelySurvive() {
      //First we set a counter and iterate through the objects dna array; counter goes up by 1 when there is a 'C' or 'G' base in the object's dna.
      let counter = 0;
      this.dna.forEach((element) => {
        if (element === "C" || element === "G") {
          counter++;
        }
      });
      //Here we calculate the percentage of 'C' or 'G' in the object's dna.
      let percentage = Math.floor((counter / this.dna.length) * 100);
      //Finally we check if the percentage is bigger than 60
      if (percentage >= 60) {
        return true;
      } else {
        return false;
      }
    },
    //Challenge 1:
    complementStrand() {
      //Empty Array for the complement strand
      const complementStrand = [];
      //Here we iterate through the passed in array and push the complement base into the empty array:
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case "A":
            complementStrand.push("T");
            break;
          case "T":
            complementStrand.push("A");
            break;
          case "C":
            complementStrand.push("G");
            break;
          case "G":
            complementStrand.push("C");
            break;
        }
      }
      return complementStrand;
    },
  };
}

let exampleDNA = pAequorFactory(1, mockUpStrand());
let exampleDNATwo = pAequorFactory(2, mockUpStrand());

//console.log(exampleDNA.dna);
//console.log(exampleDNA.mutate());

//console.log(exampleDNA.dna);
//console.log(exampleDNATwo.dna);

//exampleDNA.compareDNA(exampleDNATwo);

//console.log(exampleDNATwo.willLikelySurvive());

//Factory-Factory-Function ^^^
const factoryFunction = () => {
  const pAequorArray = [];
  let mostRelated = [];
  const willSurviveArray = [];
  //Here we create thirty instances of pAequor objects
  let invokeCounter = 0;
  while (invokeCounter < 30) {
    pAequorArray.push(pAequorFactory(randNumber(), mockUpStrand()));
    invokeCounter++;
  }
  //Here we check if the objects can survive and if true push them into an seperate array
  pAequorArray.forEach((element) => {
    if (element.willLikelySurvive() === true) {
      willSurviveArray.push(element);
    }
  });
  //return willSurviveArray;
  
  //Challenge 2:
  //Here we try to find the two most related instances of pAequor:
  for (let i = 0; i < pAequorArray.length; i++) {
    mostRelated = pAequorArray.filter(
      (element) => (element.compareDNA(pAequorArray[i]) >= 25)
    );
  }
  return mostRelated;
};

console.log(factoryFunction());
/*
console.log(exampleDNA.dna);
console.log(exampleDNA.complementStrand());
*/
