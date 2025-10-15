// ===== Avatar Setup =====
const DEFAULT_OUTFIT = "portfolio images/avatar -- p - no bg.png"; 
const saved = localStorage.getItem("avatarOutfitSrc") || DEFAULT_OUTFIT;

const mainAvatar = document.getElementById("mainAvatar");
if (mainAvatar) mainAvatar.src = saved;

const miniAvatar2 = document.getElementById("miniAvatar2");
if (miniAvatar2) miniAvatar2.src = saved;

const miniAvatar3 = document.getElementById("miniAvatar3");
if (miniAvatar3) miniAvatar3.src = saved;

// Apply saved outfit to all avatar spots
document.querySelectorAll("#mainAvatar, #miniAvatar2, #miniAvatar3")
  .forEach(img => { if (img) img.src = saved; });

// ===== Dialogue Text =====
const aboutDialogs = {
  scene1: [
    "So, here we are at our first stop! Beautiful, isn't it?",
    "This is my castle. I know I've seen it a million times, but it still takes my breath away. It's the first place I ever created for this world, and it holds so many important memories, including the very first PC I used.",
    "I've been tracking the pieces of the files, and it looks like two of them are hiding right here in the castle.",
    "One piece is 'The person behind the world' file, and the other holds my 'Skills' file. I think we should start with the one about me. I have a feeling that file is hidden right here, at my very own statue.",
    "And since it's about me as a person, finding it won't be a challenge. I can give you that information myself, so let's get to know me a little better!"
  ],
  scene2: [
    "You see, these files you're helping me find aren't just for coding. they're the magic I use to build and protect this world. With my trusty keyboard and mouse, I fight off the dreaded bugs that try to break everything. But beyond the myth, I'm a young and driven programmer. I'm just a 19-year-old student named Lu-Vienna St.Jago, studying at Frater Aurelio SBO in the ICT sector, and I'm eager to expand my skills and gain hands-on experience in the IT field.",
    "I'm a self-taught programmer, guided by countless YouTube tutorials and courses. I've built several personal projects to sharpen my technical abilities, creativity, and problem-solving skills. I've tried both front-end and back-end programming, and while I enjoy the logic and functionality of the back-end, my heart truly belongs to the front-end because I can see my code bloom to life into something beautiful and interactive. I'm highly motivated, curious, creative, and I'm not afraid to ask questions or tackle challenges outside my comfort zone. I am also eager to explore new technologies and roles within the field.",
    "And that's why this file is so important. This is more than just a showcase of my work; it's the key to my next step into the world of technology. This file represents the disciplined skills I've built, and it shows my full potential as I search for a development internship. I can unlock new possibilities and showcase my full potential as a professional developer.",
    "Amazing! now that you have all the info about me needed, we can go search for the next piece."
  ],
  scene3: [
    "Look we have reach the heart of this castle. The pc, my very first and the one that is keeping this place alive.",
    "It seems that the skills file is hiding inside the PC. Unfortunately, it seems a bug has corrupted the password, and I can't access it. I need your help to crack the code so we can find the skills file.",
    "Ooh, i see. The bug turned my password into a memory game. You'll see a grid of cards, and your job is to flip them over two at a time to find matching pairs. Once you find all the pairs, the password will be revealed. I believe in us! Let's get to it."
  ],
  scene4: [
    "YES! You did it!",
    "The bug is gone and the password is restored. You've just unlocked my skills file. With this piece, we now have everything we need from this castle.",
    "You can check out, my skills before moving on...",
    "Now, let's go on our next mission and continue this adventure."
  ]
};

// ===== Dialogue Typing Function =====
function typeDialog(sceneKey, textElement, nextBtn, backBtn, startBtn) {
  const dialogs = aboutDialogs[sceneKey];
  let index = 0;
  let typingInterval = null;
  let isTyping = false;

  function showDialog(i) {
    let text = dialogs[i];
    let charIndex = 0;
    textElement.textContent = "";

    if (typingInterval) clearInterval(typingInterval);
    isTyping = true;

    typingInterval = setInterval(() => {
      textElement.textContent += text[charIndex];
      charIndex++;
      if (charIndex === text.length) {
        clearInterval(typingInterval);
        isTyping = false;
      }
    }, 30);

    backBtn.style.display = i > 0 ? "inline-block" : "none";
    nextBtn.style.display = i < dialogs.length - 1 ? "inline-block" : "none";
    startBtn.style.display = i === dialogs.length - 1 ? "inline-block" : "none";
  }

  function finishTyping() {
    if (isTyping) {
      clearInterval(typingInterval);
      textElement.textContent = dialogs[index];
      isTyping = false;
    }
  }

  nextBtn.onclick = () => {
    if (isTyping) {
      finishTyping();
    } else if (index < dialogs.length - 1) {
      showDialog(++index);
    }
  };

  backBtn.onclick = () => {
    if (isTyping) {
      finishTyping();
    } else if (index > 0) {
      showDialog(--index);
    }
  };

  startBtn.onclick = () => {
    if (isTyping) {
      finishTyping();
      return;
    }
    if (sceneKey === "scene1") {
      showScene("about-scene-2", 2);
    } else if (sceneKey === "scene2") {
      showScene("about-scene-3", 3);
    } else if (sceneKey === "scene3") {
      // handled separately by startBtn3 listener
    } else if (sceneKey === "scene4") {
      window.location.href = "experience.html";
    }
  };

  showDialog(index);
}

// ===== Scene Switching =====
function showScene(sceneId, sceneNumber) {
  document.querySelectorAll(".scene").forEach(scene => scene.style.display = "none");
  const scene = document.getElementById(sceneId);
  scene.style.display = "block";
  scene.scrollIntoView({ behavior: "smooth" });

  // update level title when switching
  updateLevelTitle(sceneNumber);
}

// ======= scene title =======
function updateLevelTitle(sceneNumber) {
  const levelTitle = document.getElementById("level-title");
  if (!levelTitle) return;

  if (sceneNumber === 1 || sceneNumber === 2) {
    levelTitle.textContent = "Level 1 — The Person Behind the World";
  } else if (sceneNumber >= 3) {
    levelTitle.textContent = "Level 1 — The Skills";
  }
}

// ===== Initialize Dialogs =====
typeDialog("scene1", document.getElementById("dialog-text-1"),
  document.getElementById("next-btn-1"), document.getElementById("back-btn-1"), document.getElementById("start-btn-1"));

typeDialog("scene2", document.getElementById("dialog-text-2"),
  document.getElementById("next-btn-2"), document.getElementById("back-btn-2"), document.getElementById("start-btn-2"));

typeDialog("scene3", document.getElementById("dialog-text-3"),
  document.getElementById("next-btn-3"), document.getElementById("back-btn-3"), document.getElementById("start-btn-3"));

typeDialog("scene4", document.getElementById("dialog-text-4"),
  document.getElementById("next-btn-4"), document.getElementById("back-btn-4"), document.getElementById("start-btn-4"));

// Initialize title for first scene
updateLevelTitle(1);

// ===== Pixel Hearts for Skills =====
document.querySelectorAll('.hearts').forEach(el => {
  const level = parseInt(el.dataset.lvl, 10);
  el.textContent = "♥".repeat(level);
});

//=============== Memory Flip Game ===============
const icons = ["✨","˚.🎀","🎮","🐻‍❄️ྀིྀི","💗᪲᪲᪲","🌸"];
let cards = [...icons, ...icons];
let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initMemoryGame() {
  const grid = document.querySelector(".memory-grid");
  grid.innerHTML = "";
  matchedPairs = 0;
  firstCard = null;
  lockBoard = false;

  shuffle(cards).forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("memory-card", "pixel-frame");
    card.innerHTML = `<span class="front">?</span><span class="back">${icon}</span>`;
    card.addEventListener("click", () => flipCard(card, icon));
    grid.appendChild(card);
  });
}

function flipCard(card, icon) {
  if (lockBoard || card.classList.contains("flipped")) return;
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = { card, icon };
    return;
  }

  if (firstCard.icon === icon) {
    matchedPairs++;
    firstCard = null;

    if (matchedPairs === icons.length) {
      document.getElementById("memory-result").textContent = "🎉 You unlocked the Prism Core!";
      setTimeout(() => {
        document.getElementById("memory-game").style.display = "none"; // hide game
        showScene("about-scene-4", 4);
      }, 1500);
    }

  } else {
    lockBoard = true;
    setTimeout(() => {
      card.classList.remove("flipped");
      firstCard.card.classList.remove("flipped");
      firstCard = null;
      lockBoard = false;
    }, 1000);
  }
}

// ===== Show memory game when Scene 3 dialog ends =====
const startBtn3 = document.getElementById("start-btn-3");
if (startBtn3) {
  startBtn3.addEventListener("click", () => {
    const game = document.getElementById("memory-game");
    game.style.display = "block";
    initMemoryGame();
    setTimeout(() => game.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  });
}

