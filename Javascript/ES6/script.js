const user = {
  id: "USER-123456",
  name: {
    first: "Alice",
    last: "Liddell",
  },
  email: "alice@example.com",
  address: {
    shipping: {
      street: "123 Rabbit Hole",
      city: "Wonderland",
      state: "Fantasy",
      postalCode: "12345",
      country: "WL",
    },
    billing: {
      street: "456 Mad Hatter Lane",
      city: "Tea Party",
      state: "Fantasy",
      postalCode: "67890",
      country: "WL",
    },
  },
  payment: {
    total: "100.00",
    currency: "USD",
    details: {
      subtotal: "75.00",
      tax: "15.00",
      shipping: "10.00",
    },
    transactions: [
      { id: "TXN-123", amount: "50.00", description: "Magic Potion" },
      { id: "TXN-456", amount: "50.00", description: "Enchanted Sword" },
    ],
  },
};

const {
  name: { first, last },
  email,
} = user;

const {
  shipping: { street, city, state, postalCode, country },
  billing: {
    street: street1,
    city: city1,
    state: state1,
    postalCode: postalCode1,
    country: country1,
  },
} = user.address;

const { transactions } = user.payment;

const personal = document.getElementById("personal-info");

personal.innerHTML = `<h2>${first} ${last}</h2>
                        ${email}`;

const shippinginfo = document.getElementById("shipping-address");

shippinginfo.innerHTML = `<h3>Shipping address</h3>
<p><strong>Street:</strong> ${street}</p>
<p><strong>City:</strong> ${city}</p>
<p><strong>State:</strong> ${state}</p>
<p><strong>Postal Code:</strong> ${postalCode}</p>
<p><strong>Country:</strong> ${country}</p>`;

const billinginfo = document.getElementById("billing-address");

billinginfo.innerHTML = `<h3>Billing address</h3>
<p><strong>Street:</strong> ${street1}</p>
<p><strong>City:</strong> ${city1}</p>
<p><strong>State:</strong> ${state1}</p>
<p><strong>Postal Code:</strong> ${postalCode1}</p>
<p><strong>Country:</strong> ${country1}</p>`;

const allTransactions = document.getElementById("transactions");
const usertransactions = transactions
  .map(
    (transaction) =>
      `<li>Amount: ${transaction.amount} Item: ${transaction.description}</li>`
  )
  .join("");

allTransactions.innerHTML = `<h3>Transactions</h3>
${usertransactions}`;
