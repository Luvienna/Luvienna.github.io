// ================== Avatar Setup ==================
(function applyAvatar() {
  const DEFAULT = "portfolio images/avatar -- p - no bg.png";
  const saved = localStorage.getItem("avatarOutfitSrc") || DEFAULT;
  document.querySelectorAll("#mainAvatar, #miniAvatar9, #miniAvatar11")
    .forEach(img => { if (img) img.src = saved; });
})();

// ================== Dialogues ==================
const DIALOGS = {
  "8": [
    "We did it! We have all the pieces of my files. Now, all that's left is to put them back together.",
    "It's like a puzzle; each piece has a specific place. It might look a little tricky, but if we pay close attention, we can make this file whole again.",
    "It's a symbolic step, isn't it? Putting the pieces of my story and skills together. Just like in real life, every part of the journey counts."
  ],
  "9": [
    "It is simple, put the pieces together and we will have the full file."
  ],
  "10": [
    "You did it! The file is complete, and it's perfect.",
    "I can't thank you enough for all your help. You stuck with me through every challenge, every bug, and every piece of this adventure. With your help, I now have everything I need to take the next step in my journey."
  ],
  "11": [
    "As a token of my immense gratitude, I have a special reward for you"
  ]
};

// ================== Scene Navigation ==================
function showSceneByNumber(num) {
  document.querySelectorAll(".scene").forEach(s => s.style.display = "none");
  const el = document.getElementById(`contact-scene-${num}`);
  if (el) {
    el.style.display = "block";
    if (DIALOGS[num]) runDialogForScene(num);
  }
}

// ================== Typewriter Dialog ==================
function runDialogForScene(sceneNum) {
  const lines = DIALOGS[sceneNum];
  const textEl = document.getElementById(`dialog-text-${sceneNum}`);
  const nextBtn = document.getElementById(`next-btn-${sceneNum}`);
  const backBtn = document.getElementById(`back-btn-${sceneNum}`);
  const startBtn = document.getElementById(`start-btn-${sceneNum}`);

  let idx = 0;
  let timer = null;
  let typing = false;

  function showLine(i) {
    idx = i;
    if (backBtn) backBtn.style.display = i > 0 ? "inline-block" : "none";
    if (nextBtn) nextBtn.style.display = i < lines.length - 1 ? "inline-block" : "none";
    if (startBtn) startBtn.style.display = i === lines.length - 1 ? "inline-block" : "none";

    clearInterval(timer);
    textEl.textContent = "";
    let c = 0;
    typing = true;
    timer = setInterval(() => {
      textEl.textContent += lines[i][c] || "";
      c++;
      if (c > lines[i].length) { clearInterval(timer); typing = false; }
    }, 28);
  }

  function finishTyping() {
    clearInterval(timer);
    textEl.textContent = lines[idx];
    typing = false;
  }

  if (nextBtn) nextBtn.onclick = () => typing ? finishTyping() : (idx < lines.length - 1 && showLine(idx + 1));
  if (backBtn) backBtn.onclick = () => typing ? finishTyping() : (idx > 0 && showLine(idx - 1));
  if (startBtn) startBtn.onclick = () => {
    if (typing) return finishTyping();
    if (sceneNum === "8") return showSceneByNumber("9");
    if (sceneNum === "9") {
      const wrapper = document.getElementById("puzzle-wrapper");
      wrapper.style.display = "flex";
      initPuzzle();
      startBtn.style.display = "none";
      return;
    }
    if (sceneNum === "10") return showSceneByNumber("11");
  };

  showLine(0);
}

// ================== Puzzle ==================
const PUZZLE_SRC = "portfolio images/puzzle.jpg"; 
const GRID = 3;
const BOARD_PX = 360;
const PIECE_SIZE = BOARD_PX / GRID;

let puzzleInit = false;
function initPuzzle() {
  if (puzzleInit) return;
  puzzleInit = true;

  const board = document.getElementById("puzzle-board");
  const tray = document.getElementById("puzzle-tray");
  const result = document.getElementById("puzzle-result");
  board.innerHTML = ""; tray.innerHTML = ""; result.textContent = "";

  board.style.width = BOARD_PX + "px";
  board.style.height = BOARD_PX + "px";

  // slots
  for (let i = 0; i < GRID * GRID; i++) {
    const slot = document.createElement("div");
    slot.className = "puzzle-cell";
    slot.dataset.slotIndex = i;
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", handleDrop);
    board.appendChild(slot);
  }

  // pieces
  const indices = shuffle([...Array(GRID * GRID).keys()]);
  indices.forEach(idx => {
    const col = idx % GRID, row = Math.floor(idx / GRID);
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    piece.dataset.pieceIndex = idx;
    piece.draggable = true;
    piece.style.width = PIECE_SIZE + "px";
    piece.style.height = PIECE_SIZE + "px";
    piece.style.backgroundImage = `url("${PUZZLE_SRC}")`;
    piece.style.backgroundSize = `${BOARD_PX}px ${BOARD_PX}px`;
    piece.style.backgroundPosition = `-${col * PIECE_SIZE}px -${row * PIECE_SIZE}px`;
    piece.addEventListener("dragstart", e => e.dataTransfer.setData("text/plain", idx));
    tray.appendChild(piece);
  });

  function handleDrop(e) {
    const pieceIdx = e.dataTransfer.getData("text/plain");
    if (!pieceIdx || this.children.length > 0) return;
    if (this.dataset.slotIndex === pieceIdx) {
      const piece = document.querySelector(`.puzzle-piece[data-piece-index="${pieceIdx}"]`);
      this.appendChild(piece);
      piece.style.width = "100%"; piece.style.height = "100%";
      piece.draggable = false;
      checkWin();
    }
  }

  function checkWin() {
    const cells = board.querySelectorAll(".puzzle-cell");
    if ([...cells].every(c => c.firstChild && c.firstChild.dataset.pieceIndex === c.dataset.slotIndex)) {
      result.textContent = "🎉 File reassembled!";
      setTimeout(() => showSceneByNumber("10"), 800);
    }
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ================== Gift Box ==================
const box = document.querySelector(".box");
const overlay = document.getElementById("giftOverlay");
if (box && overlay) {
  box.addEventListener("click", () => {
    box.classList.add("open");
    setTimeout(() => overlay.classList.add("active"), 1000);
  });
}
function closeOverlay() {
  overlay.classList.remove("active");
  box.classList.remove("open");
}

// ================== Init ==================
window.addEventListener("DOMContentLoaded", () => {
  showSceneByNumber("8");
});
