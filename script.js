let lastBettingTime = 0;
let tokenIndex = 0;

const tokens = [
  "demo", 
  "demo", 
  "demo" 
];

function getAuthorizationToken() {
  const token = tokens[tokenIndex];
  tokenIndex = (tokenIndex + 1) % tokens.length;
  return `Bearer ${token}`;
}

async function checkSignal() {
  const url = 'https://crash-gateway-cc-cr.gamedev-tech.cc/users-count/1____1play_luckyjet';
  const response = await fetch(url, {
    headers: {
      'Authorization': getAuthorizationToken()
    }
  });
  const data = await response.json();
  const state = data.current_state;

  const luckyJetIcon = document.getElementById('luckyJetIcon');
  const waitingText = document.getElementById('waitingText');
  const endingText = document.getElementById('endingText');

  if (state === "betting" && Date.now() - lastBettingTime > 5000) {
    luckyJetIcon.src = "boy.gif"; 
    luckyJetIcon.classList.remove('ending');
    luckyJetIcon.classList.add('flying');
    waitingText.classList.add('show'); 
    endingText.classList.remove('show'); 
    lastBettingTime = Date.now();
  } else if (state === "ending") {
    luckyJetIcon.src = "boy.gif"; 
    luckyJetIcon.classList.remove('flying');
    luckyJetIcon.classList.add('ending');
    waitingText.classList.remove('show'); 
    endingText.classList.add('show');
  } else if (state === "flying") {
    luckyJetIcon.src = "boy.gif"; 
    luckyJetIcon.classList.remove('ending');
    luckyJetIcon.classList.add('flying');
    waitingText.classList.add('show'); 
    endingText.classList.remove('show');
  } 
}

setInterval(checkSignal, 1000); // Проверяйте состояние каждые 1 секунду
