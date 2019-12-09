/*
* Calculate shoppingCart.total by analyzing the items in the cart
* @params{cart<Object>}
* @return{total<Number>}
*/
const calculateCartTotal = function(cart){
  let total = 0;
  //track the count of each item in the cart by setting up a reference obj
  let itemHash = {};
  for(let i of cart.items){
    //add onto the item's tracked count
    if(itemHash[i.id]){
      itemHash[i.id].count++;
    }
    //track new item
    else{
      itemHash[i.id] = {
        "count" : 1,
        "unitPrice" : i.unit_price,
        //sort discount array from greatest to least for easier handling
        "volumeDiscounts" : i.volume_discounts.sort((a,b) => {
          let val = 0;
          val = (a.number > b.number) ? -1 : val;
          val = (a.number < b.number) ? 1 : val;
          return val;
        })
      }
    }
  }
  //apply item amounts and discounted (if applicable) prices to total
  for(let i of Object.values(itemHash)){
    let discounts = i.volumeDiscounts;
    //a volume discount is applicable
    if(discounts.length > 0 && i.count >= discounts[discounts.length - 1].number){
      for(let d = 0; d < discounts.length; d++){
        if(i.count >= discounts[d].number){
          total += Math.floor(i.count / discounts[d].number) * discounts[d].price;
          //dwindle down item count after discount
          i.count = i.count % discounts[d].number;
          //apply the regular price to the remainder if no other discounts are present
          if(d == discounts.length - 1){
            total += i.count * i.unitPrice;
          }
        }
      }
    }
    //apply the normal unit price
    else{
      total += i.count * i.unitPrice;
    }
  }
  return total;
}

module.exports = calculateCartTotal;
