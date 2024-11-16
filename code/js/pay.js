window.onload = () => {
  // Retrieve details of order from localStorage
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

  // Display order summary
  if (orderDetails) {
    const totalBooksOrdered = orderDetails.count;
    // Format total cost with 2 decimal places
    const totalCost = orderDetails.totalCost.toFixed(2);

    // Display total books ordered and total cost
    document.getElementById("totalBooks").textContent = totalBooksOrdered;
    document.getElementById("totalCost").textContent = "£" + totalCost;
  } else {
    // when no order details are found
    console.error("No order details found.");
  }

  //validate name
  const validate_name = (name) => {
    let isValid = true;

    // Return false if name is null, empty, or not a string
    if (name === null || name === "" || typeof name !== "string") {
      isValid = false;
    }

    // Regular expression to allow letters and spaces
    let re = /^[a-zA-Z ]+$/;

    // Test if the name entered matches the regular expression
    if (re.test(name) === false) {
      isValid = false;
    }

    return isValid;
  };

  //validate card Number
  const validate_card_number = (cardNumber) => {
    // Return false if the input is null, empty, or not a string
    if (
      cardNumber === null ||
      cardNumber === "" ||
      typeof cardNumber !== "string"
    ) {
      return false;
    }
    // Return false if the card number donot have exactly 16 digits
    if (cardNumber.length !== 16) {
      return false;
    }

    // Check if the credit card number starts with 51, 52, 53, 54, or 55 (for MasterCard)
    const first_two_digits = parseInt(cardNumber.substring(0, 2));
    if (first_two_digits >= 51 && first_two_digits <= 55) {
      return true;
    } else {
      return false;
    }

    // Return true if all true
    return true;
  };

  //validate expiration date
  const validate_expiration_date = (expirationMonth, expirationYear) => {
    // Return false if input is null, empty, or not a string for both month and year
    if (
      expirationMonth === null ||
      expirationMonth === "" ||
      typeof expirationMonth !== "string" ||
      expirationYear === null ||
      expirationYear === "" ||
      typeof expirationYear !== "string"
    ) {
      return false;
    }

    // Check if the CVV contains only digits AND Check if the expiration Month has exactly 2 digits AND expiration Year has exactly 4 digits
    const reMonth = /^\d+$/;
    const reYear = /^\d+$/;

    if (
      !reMonth.test(expirationMonth) ||
      !reYear.test(expirationYear) ||
      expirationMonth.length !== 2 || expirationYear.length !== 4    ) {
      return false;
    }
     // Check if the expiration month is within the valid range (1-12)
  if (expirationMonth < 1 || expirationMonth > 12) {
    return false;
  }

    //get the current year from date
    const currentYear = new Date().getFullYear();
    //get the current month from date
    const currentMonth = new Date().getMonth() + 1; //

    // Convert expirationMonth and expirationYear to numbers
    const expMonth = parseInt(expirationMonth, 10);
    const expYear = parseInt(expirationYear, 10);

    // Check if the card has not expired
    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth )
    ) {
      return false;
    }

    // If conditions are met, return true
    return true;
  };
  const validate_CVV = (cardCvv) => {
    // Check if the input is null, empty, or not a string for both month and year
    if (cardCvv === null || cardCvv === "" || typeof cardCvv !== "string") {
      return false;
    }

    // Check if the CVV has either three or four digits
    const cvvLength = cardCvv.length;
    if (cvvLength !== 3 && cvvLength !== 4) {
      return false;
    }

    // Check if the CVV contains only digits
    const reCvv = /^\d+$/;
    if (!reCvv.test(cardCvv)) {
      return false;
    }

    // Return true if all true
    return true;
  };

  // Get the form element and input fields

  const singupForm = document.getElementById("card_details");
  const nameInput = document.getElementById("card_name");
  const numberInput = document.getElementById("card_number");
  const monthInput = document.getElementById("expiration_Month");
  const yearInput = document.getElementById("expiration_Year");
  const cvvInput = document.getElementById("CVV");

  // Add event listener to the form and check for validation
  singupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validate_name(nameInput.value)) {
      alert("Please enter a valid card Name");
      return;
    }
    if (!validate_card_number(numberInput.value)) {
      alert("Please enter a valid card Number");
      return;
    }
    if (!validate_expiration_date(monthInput.value, yearInput.value)) {
      alert("The card is expired or the expiration date is invalid");
      return;
    }
    if (!validate_CVV(cvvInput.value)) {
      alert("Please enter a valid Security code");
      return;
    }
    //format the data to be sent to the server

    var formData = {
  "master_card": parseInt(numberInput.value),
  "exp_year": parseInt(yearInput.value),
  "exp_month": parseInt(monthInput.value),
  "cvv_code": cvvInput.value,
};

    // if all valid, send a POST request to the server
    fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      // Check if the response is ok
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Bad request: Invalid data sent to the server");
        } else if (response.status === 404) {
          throw new Error("Server endpoint not found");
        } else if (response.status === 201) {
          throw new Error("Verification was unsuccessful");
        } else {
          throw "Something went wrong";
        }
      })
      // If the response is ok, display a success message
      .then((reJson) => {
        alert(reJson.message);
        // Get the last four digits of the card number
        const lastFourDigits = numberInput.value.slice(-4);
        // Get the total cost of the order
        const totalCost = parseFloat(orderDetails.totalCost);
        const successMessage = `Your payment of £${totalCost.toFixed(
          2
        )} with card ending in **** **** **** ${lastFourDigits} was successful!`;
        // Store the success message in localStorage
        sessionStorage.setItem("successMessage", successMessage);
        // Redirect to the success page with the success message as a query parameter
        window.location.replace("success.html");
      })
      // Else if there is an error, display an alert with the error message
      .catch((error) => {
        alert(error);
      });
  });

  //console log for testing the functions

  console.log(validate_name("Adeel Chaudhry") + ", Expected: true");
  console.log(validate_name("Adeel") + ", Expected: true");
  console.log(validate_name("Adeel123456") + ", Expected: false");
  console.log(validate_card_number("5112345678901234") + ", Expected: true");
  console.log(validate_card_number("5712345678901234") + ", Expected: false");
  console.log(validate_card_number("501234567890123") + ", Expected: false");
  console.log(validate_expiration_date("08", "2024") + ", Expected: True");
  console.log(validate_expiration_date("0809", "20245") + ", Expected: false");
  console.log(validate_expiration_date("09", "2020") + ", Expected: false");
  console.log(validate_expiration_date("0", "2020") + ", Expected: false");
  console.log(validate_CVV("2343") + ",Expected:true");
  console.log(validate_CVV("233343") + ",Expected:false");
  console.log(validate_CVV("233!") + ",Expected:false");
};
