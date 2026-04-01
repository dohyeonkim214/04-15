const qrEl = document.getElementById("fakeQr");
const SIZE = 21;

function isFinderZone(row, col, startRow, startCol) {
  return row >= startRow && row < startRow + 7 && col >= startCol && col < startCol + 7;
}

function isFinderDark(row, col, startRow, startCol) {
  const r = row - startRow;
  const c = col - startCol;
  const border = r === 0 || r === 6 || c === 0 || c === 6;
  const center = r >= 2 && r <= 4 && c >= 2 && c <= 4;
  return border || center;
}

function buildFakeQr() {
  if (!qrEl) {
    return;
  }

  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const cell = document.createElement("span");
      cell.className = "qr-cell";

      const inTopLeft = isFinderZone(row, col, 0, 0);
      const inTopRight = isFinderZone(row, col, 0, SIZE - 7);
      const inBottomLeft = isFinderZone(row, col, SIZE - 7, 0);

      let dark = false;

      if (inTopLeft) {
        dark = isFinderDark(row, col, 0, 0);
      } else if (inTopRight) {
        dark = isFinderDark(row, col, 0, SIZE - 7);
      } else if (inBottomLeft) {
        dark = isFinderDark(row, col, SIZE - 7, 0);
      } else {
        dark = ((row * 11 + col * 7 + 5) % 3) === 0;
      }

      if (dark) {
        cell.classList.add("dark");
      }

      qrEl.appendChild(cell);
    }
  }
}

buildFakeQr();
