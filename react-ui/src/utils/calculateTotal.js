/*
* Calculate the total for any group of items with the discount
* @params{item<Object>, itemCount<Number>}
* @return{total<Number>}
*/
const calculateTotal = function(item, itemCount){
  let total = 0;
  let amount = itemCount;
  //sort discounts from greatest number to least number
  let discounts = item.volume_discounts.sort((a,b) => {
    let val = 0;
    val = (a.number > b.number) ? -1 : val;
    val = (a.number < b.number) ? 1 : val;
    return val;
  });
  //apply discounted (if applicable) prices to total
  if(discounts.length > 0 && amount >= discounts[discounts.length - 1].number){
    for(let d = 0; d < discounts.length; d++){
      if(amount >= discounts[d].number){
        total += Math.floor(amount / discounts[d].number) * discounts[d].price;
        //dwindle down itemAmount after discount
        amount = amount % discounts[d].number;
        //apply the regular price to the remainder if no other discounts are present
        if(d == discounts.length - 1){
          total += amount * item.unit_price;
        }
      }
    }
  }
  //apply the normal unit price
  else{
    total += amount * item.unit_price;
  }
  return total;
}

module.exports = calculateTotal;
