//selection DOM  elements
const grossIncomeValue = document.querySelector("#grossIncome");
const extraIncomeValue = document.querySelector("#extraIncome");
const ageGroupValue = document.querySelector("#ageGroup");
const deductionAmountVAlue = document.querySelector("#deductions");
const results = document.querySelector(".results");
const result = document.querySelector("#result");
const error_icon = document.querySelectorAll(".error-icon");
const error_tooltip = document.querySelector(".error-tooltip");
const overlay = document.querySelector(".overlay");
const exit = document.querySelectorAll(".exit");
const calculatebtn = document.querySelector(".btn");

//calculation Button
calculatebtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  const grossIncome = +grossIncomeValue.value;
  console.log(grossIncome);
  const extraIncome = +extraIncomeValue.value;
  console.log(extraIncome);
  const ageGroup = ageGroupValue.value;
  console.log(ageGroup);
  const deductionAmount = +deductionAmountVAlue.value;
  console.log(deductionAmount);

  // let errorMessage = "";

  // object containing input field deatils
  const inputs = [
    {
      element: grossIncomeValue,
      value: grossIncome,
      name: "Gross income",
      errorIcon: grossIncomeValue.parentNode.querySelector(".error-icon"),
    },
    {
      element: extraIncomeValue,
      value: extraIncome,
      name: "Extra income",
      errorIcon: extraIncomeValue.parentNode.querySelector(".error-icon"),
    },
    {
      element: deductionAmountVAlue,
      value: deductionAmount,
      name: "Deduction",
      errorIcon: deductionAmountVAlue.parentNode.querySelector(".error-icon"),
    },
  ];

  //Validating input fields
  inputs.forEach((input) => {
    let isValid;
    if (input.value !== 0) {
      isValid = isValidNumber(input.value);
    } else {
      isValid = false;
    }
    if (isValid) {
      input.errorIcon.classList.add("d-none");
      // overlay.classList.remove("hidden");
      // results.classList.remove("hidden");
    } else {
      input.errorIcon.classList.remove("d-none");
    }
  });

  // to display error message when there is particular invalid input fields.(not asked)

  // if (errorMessage !== "") {
  //   errorMessage = "<p>Please fill out th following fields:" + errorMessage;
  //   const html = `<p>${errorMessage}</p>`;
  //   document.querySelector("#errors").insertAdjacentHTML("beforeend", html);
  //   overlay.classList.remove("hidden");
  //   results.classList.remove("hidden");
  // }
  function checkAllInputsValid() {
    return inputs.every((input) => {
      let value = input.value;
      return value !== 0;
    });
  }
  if (checkAllInputsValid()) {
    overlay.classList.remove("hidden");
    results.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
    results.classList.add("hidden");
  }

  // calculating tax
  const { income_after_tax, taxAmount } = totalAmountAfterTax(
    grossIncome,
    extraIncome,
    ageGroup,
    deductionAmount
  );

  //Inserting resulted income after tax deduction
  result.innerHTML = `Your overall Income after tax deduction is ${numberWithCommas(
    income_after_tax
  )} with dedcution of ${numberWithCommas(taxAmount)}`;
});

//overlay ,when click it closes modal
overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
  results.classList.add("hidden");
});
//exit ,when click it closes modal
exit.forEach((exit) => {
  exit.addEventListener("click", () => {
    console.log("exited");
    overlay.classList.add("hidden");
    results.classList.add("hidden");
  });
});

// a function to calculate total income after tax dedecution

function totalAmountAfterTax(
  grossIncome,
  extraIncome,
  ageGroup,
  deductionAmount
) {
  const totalIncome = grossIncome + extraIncome - deductionAmount;
  const taxableAmount = totalIncome - 800000;
  if (totalIncome <= 800000) {
    return { income_after_tax: totalIncome, taxAmount: 0 };
  }
  let tax_rate;
  if (ageGroup === "<40") tax_rate = 0.3;
  if (ageGroup === ">=40&<60") tax_rate = 0.4;
  if (ageGroup === ">=60") tax_rate = 0.1;

  const taxAmount = taxableAmount * tax_rate;
  const income_after_tax = totalIncome - taxAmount;

  return { income_after_tax, taxAmount };
}

//converting number input fields with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// validating either enter number is valid or not
function isValidNumber(num) {
  return /^\d+(\.\d+)?$/.test(num);
}
