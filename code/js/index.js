window.onload = () => {
  // for all increment buttons
  const incrementButton = document.querySelectorAll('button[id^="+"]');

  incrementButton.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.id.split("_")[1];
      const countSpan = document.getElementById(`count_${bookId}`);
      let count = parseInt(countSpan.textContent);
      if (count > 0) {
        count--;
        countSpan.textContent = count;
      }
    });
  });

  // for all decrement buttons
  const decrementButton = document.querySelectorAll('button[id^="-"]');

  decrementButton.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.id.split("_")[1];
      const countSpan = document.getElementById(`count_${bookId}`);
      let count = parseInt(countSpan.textContent);
      if (count >= 0) {
        count++;
        countSpan.textContent = count;
      }
    });
  });
  // for all pay buttons
  const paybutton = document.querySelectorAll('button[id^="pay"]');

  paybutton.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.id.split("_")[1];
      const countSpan = document.getElementById(`count_${bookId}`);
      const count = parseInt(countSpan.textContent);
      const price = parseFloat(
        document
          .querySelector(`.book_info #price_${bookId}`)
          .textContent.replace("price:£", "")
      );
      const totalCost = count * price;

      // Store order details in localStorage
      const orderDetails = {
        bookId: bookId,
        count: count,
        price: price,
        totalCost: totalCost,
      };
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

      // if one or more book selected, Redirect to bookversePay.html
      if (count > 0) {
        window.location.href = "pay.html";
      }
    });
  });
};
