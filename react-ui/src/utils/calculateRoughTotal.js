/*
* Calculate the total of all shoppingCart Items without the discount
* @params{cart<Object>}
* @return{total<Number>}
*/
const calculateRoughTotal = function(cart){
  let total = 0;
  for(let i of cart.items){
    total += i.unit_price;
  }
  return total;
}

module.exports = calculateRoughTotal;
