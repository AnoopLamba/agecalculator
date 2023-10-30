// limiting the input length in the numbers
const allNumberInputs = document.querySelectorAll('input[type="number"]');
allNumberInputs.forEach((element) => {
  element.addEventListener("input", () => {
    if (element.value.length > element.maxLength) {
      element.value = element.value.slice(0, element.maxLength);
    }
  });
});

// id for the form, day input, month input, year input
const yearForm = document.forms["year-form"];
const dayInput = yearForm["day-input"];
const monthInput = yearForm["month-input"];
const yearInput = yearForm["year-input"];

// // change focus from one input to next
// if (dayInput.value.length >= 2) {
//   monthInput.focus();
//   if (monthInput.value.length >= 2) {
//   }
// }

// form validation checkup
yearForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const dayLabel = document.getElementById("dayLabel");
  const monthLabel = document.getElementById("monthLabel");
  const yearLabel = document.getElementById("yearLabel");

  const dayEmpty = document.getElementById("day-empty");
  const dayInvalid = document.getElementById("day-invalid");
  const monthEmpty = document.getElementById("month-empty");
  const monthInvalid = document.getElementById("month-invalid");
  const yearEmpty = document.getElementById("year-empty");
  const yearInvalid = document.getElementById("year-invalid");

  // day empty check
  if (dayInput.value === "") {
    dayEmpty.style.display = "block";
    dayLabel.style.color = "var(--Light-red)";
    return false;
  } else {
    dayEmpty.style.display = "none";
    dayLabel.style.color = "var(--Smokey-grey)";
    if (dayInput.value <= 0 || dayInput.value > 31) {
      dayInvalid.style.display = "block";
      dayLabel.style.color = "var(--Light-red)";
      return false;
    } else {
      dayInvalid.style.display = "none";
      dayLabel.style.color = "var(--Smokey-grey)";
    }
  }

  // month empty check
  if (monthInput.value === "") {
    monthEmpty.style.display = "block";
    monthLabel.style.color = "var(--Light-red)";
    return false;
  } else {
    monthEmpty.style.display = "none";
    monthLabel.style.color = "var(--Smokey-grey)";
    if (
      monthInput.value <= 0 ||
      monthInput.value > 12 ||
      !isDaysOkInThisMonth(monthInput.value, dayInput.value)
    ) {
      monthInvalid.style.display = "block";
      monthLabel.style.color = "var(--Light-red)";
      return false;
    } else {
      monthInvalid.style.display = "none";
      monthLabel.style.color = "var(--Smokey-grey)";
    }
  }

  // year empty check
  if (yearInput.value === "") {
    yearLabel.style.color = "var(--Light-red)";
    yearEmpty.style.display = "block";
    return false;
  } else {
    yearEmpty.style.display = "none";
    yearLabel.style.color = "var(--Smokey-grey)";
    let currentYear = new Date().getFullYear();
    if (
      yearInput.value <= 0 ||
      yearInput.value > currentYear ||
      !areDaysOkForThisYear(yearInput.value, monthInput.value, dayInput.value)
    ) {
      yearInvalid.style.display = "block";
      yearLabel.style.color = "var(--Light-red)";
      return false;
    } else {
      yearInvalid.style.display = "none";
      yearLabel.style.color = "var(--Smokey-grey)";
    }
  }

  // calculating the age below
  var d1 = dayInput.value;
  var m1 = monthInput.value;
  var y1 = yearInput.value;

  var today = new Date();

  var d2 = today.getDate();
  var m2 = today.getMonth() + 1;
  var y2 = today.getFullYear();

  let d3, m3, y3;

  y3 = y2 - y1;

  if (m2 >= m1) {
    m3 = m2 - m1;
  } else {
    y3--;
    m3 = 12 + m2 - m1;
  }

  if (d2 >= d1) {
    d3 = d2 - d1;
  } else {
    m3--;
    d3 = getDaysInMonth(y1, m1) + d2 - d1;
  }

  if (m3 < 0) {
    m3 = 11;
    y3--;
  }

  document.getElementById("age-years").innerHTML = y3;
  document.getElementById("age-months").innerHTML = m3;
  document.getElementById("age-days").innerHTML = d3;
});

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function isDaysOkInThisMonth(month, days) {
  if (month == 1 && days > 31) {
    return false;
  }
  if (month == 2 && days > 29) {
    return false;
  }
  if (month == 3 && days > 31) {
    return false;
  }
  if (month == 4 && days > 30) {
    return false;
  }
  if (month == 5 && days > 31) {
    return false;
  }
  if (month == 6 && days > 30) {
    return false;
  }
  if (month == 7 && days > 31) {
    return false;
  }
  if (month == 8 && days > 31) {
    return false;
  }
  if (month == 9 && days > 30) {
    return false;
  }
  if (month == 10 && days > 31) {
    return false;
  }
  if (month == 11 && days > 30) {
    return false;
  }
  if (month == 12 && days > 31) {
    return false;
  }

  return true;
}

function areDaysOkForThisYear(year, month, day) {
  if (year % 4 === 0 && month == 2) {
    if (day > 29) {
      return false;
    }
  } else if (year % 4 != 0 && month == 2) {
    if (day > 28) {
      return false;
    }
  }

  return true;
}
