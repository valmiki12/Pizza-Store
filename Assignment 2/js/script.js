document.addEventListener('DOMContentLoaded', function () {
    // References to the elements
    calculateBtn = document.querySelector('.calculateBtn');
    orderForm = document.getElementById('orderForm');
    totalPriceElement = document.getElementById('totalPrice');

    // Calculate the total price and update the display
    calculateBtn.addEventListener('click', function () {
        size = orderForm.size.value;
        pizzaType = orderForm['pizza-type'].value;
        toppings = Array.from(orderForm.querySelectorAll('input[name="toppings"]:checked')).map(input => input.value);
        quantity = 1; 

        // PRICES FOR THE PIZZA TYPE AND SIZES OF THE PIZZA
        basePrice = {
            marg: 10.99,
            veg: 11.99,
            pep: 12.99,
            haw: 13.99,
            small: 0,
            medium: 3,
            large: 5,
            'x-large': 8
        };

        // PRICES FOR ALL THE EXTRA ADD-ONS
        toppingsPrice = {
            cheese: 0.5,
            pepperoni: 1.0,
            mushrooms: 0.75,
            mozzarella: 1.75,
            cheddar: 1.5,
            feta: 1.75,
            parmesan: 1.75,
            gouda: 2.0,
            bacon: 1.99,
            ham: 1.99,
            sausage: 1.99,
            beef: 1.99,
            onions: 0.5,
            tomato: 0.5,
            'black-olives': 0.5
        };

        // Calculate the total price without tax
        totalPriceWithoutTax = basePrice[size];
        
        if (basePrice.hasOwnProperty(pizzaType)) {
            totalPriceWithoutTax += basePrice[pizzaType];
        }

        toppingsTotalPrice = toppings.reduce((acc, topping) => acc + toppingsPrice[topping], 0);
        totalPriceWithoutTax += toppingsTotalPrice;

        // Add 13% tax to the total price
        taxRate = 0.13; 
        taxAmount = totalPriceWithoutTax * taxRate;
        totalPrice = totalPriceWithoutTax + taxAmount;

        // Calculate the tip and update the total amount
        tipNoneRadio = document.querySelector('input[name="tip"][value="t-none"]');
        tipTenRadio = document.querySelector('input[name="tip"][value="t-ten"]');
        tipTwentyRadio = document.querySelector('input[name="tip"][value="t-twenty"]');
        tipThirtyRadio = document.querySelector('input[name="tip"][value="t-thirty"]');

        let tipPercentage = 0;
        if (tipTenRadio.checked) {
            tipPercentage = 0.10;//10% Tip
        } else if (tipTwentyRadio.checked) {
            tipPercentage = 0.20;//20% Tip
        } else if (tipThirtyRadio.checked) {
            tipPercentage = 0.30;//30% Tip
        }

        totalAmountWithTip = totalPrice + (totalPrice * tipPercentage);
        totalPriceElement.textContent = `$${totalAmountWithTip.toFixed(2)}`;
    });

    // Showing alert when the Order button is clicked
    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Order Placed Successfully!');
    });
});
