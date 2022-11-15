/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
    if (kind === 'chicken') {
    if (internalTemp < 165) {
      return false;
    } else if (internalTemp >= 165) {
      return true;
    } else {
      console.log('improper internal tempValue');
      return false;
    }
  } else if ( kind === 'beef' ) {
    if (doneness ==='well') {
      return (internalTemp >= 155 && internalTemp < 185);
    } else if (doneness ==='medium') {
      return (internalTemp >= 135 && internalTemp < 155);
    } else if (doneness ==='rare') {
      return (internalTemp >= 125 && internalTemp < 135);
    } else {
      console.log('improper inputs or your beef is cooked');
      return false;
    }
  } else {
    console.log('Improper food entered');
  }
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true