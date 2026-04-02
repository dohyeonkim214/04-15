const priceInput = document.getElementById("priceInput");
const tipButtons = document.getElementById("tipButtons");
const finalPrice = document.getElementById("finalPrice");

let selectedTip = 10;

function formatKRW(value) {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

function calculateFinalPrice() {
  const rawPrice = Number(priceInput.value);
  const basePrice = Number.isFinite(rawPrice) && rawPrice > 0 ? rawPrice : 0;
  const total = basePrice * (1 + selectedTip / 100);
  finalPrice.textContent = formatKRW(total);
}

function setActiveTipButton(targetTip) {
  const buttons = tipButtons.querySelectorAll("button");
  buttons.forEach((button) => {
    if (Number(button.dataset.tip) === targetTip) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

tipButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tip]");
  if (!button) {
    return;
  }

  selectedTip = Number(button.dataset.tip);
  setActiveTipButton(selectedTip);
  calculateFinalPrice();
});

priceInput.addEventListener("input", calculateFinalPrice);

calculateFinalPrice();
