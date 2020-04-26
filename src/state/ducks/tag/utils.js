const delivery =  {
    _id: '5ea57aeee5e742f6169003db',
    name: 'Bochila',
    pickUpLocation: 'Home Delivery',
    country: '5e8218a9a0be4401500e4d37',
    countryCode: 'BD',
    countryName: 'Bangladesh',
    city: ['Dhaka'],
    charge: { '0': '100', '500': '0' },
    time: '6 Hours',
  };

const totalPrice = 10; 

let deliveryAmount = Object.keys(delivery.charge);
deliveryAmount.sort((a, b) => a - b);

let deliveryCharge;

// get the delivery charge according to totalPrice

if (totalPrice < deliveryAmount[0]) {
  console.log('your shit is lower than minium order'); 
} else if (totalPrice >= deliveryAmount[deliveryAmount.length - 1]) {
  // higher than all amount
  deliveryCharge = delivery.charge[deliveryAmount.length - 1];
} else {
  // iterate through all items

  for (let index in deliveryAmount) {
    // check if price is between the current amount and the next

    if (
      totalPrice >= deliveryAmount[index] &&
      totalPrice < deliveryAmount[+index + 1]
    ) {
      // set the charge of the amount as delivery charge
      deliveryCharge = delivery.charge[deliveryAmount[index]];
      break;
    }
  }
}


console.log('deliveryCharge',deliveryCharge); 