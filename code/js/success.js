window.onload = () => {
  // Retrieve success message from localStorage
  const successMessage = sessionStorage.getItem("successMessage");

  //constant to include success message
  const successMessageDiv = document.getElementById("successMessage");
  // Display the success message
  successMessageDiv.textContent = successMessage;
};
