const body = document.getElementById('body');
const circle = document.getElementById('breath-circle');
const counter = document.getElementById('counter');
const buttons = document.getElementById('buttons');
const homepage = document.getElementById('homepage');
const textBelow = document.getElementById('text-below');

let breathInterval;
let currentPhase = 'inhale';
let seconds = 0;
const initialSize = 400;
const phases = {
  inhale: { duration: 4, next: 'exhale', action: 'Inhale' },
  exhale: { duration: 8, next: 'complete', action: 'Exhale' },
};

function startBreathing() {
  circle.style.display = 'block';
  counter.style.display = 'block';
  buttons.style.display = 'none';
  circle.style.width = `${initialSize}px`;
  circle.style.height = `${initialSize}px`;
  updateDisplay();
  breathInterval = setInterval(updateBreathing, 1000);
}

function updateBreathing() {
  seconds++;

  // Update circle size
  const phase = phases[currentPhase];
  const progress = seconds / phase.duration;
  const size =
    currentPhase === 'inhale'
      ? initialSize + progress * 100
      : initialSize - progress * 100;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  // Check if phase completed
  if (seconds >= phase.duration) {
    currentPhase = phase.next;
    seconds = 0;

    if (currentPhase === 'complete') {
      clearInterval(breathInterval);
      circle.style.display = 'none';
      textBelow.style.display = 'none';
      counter.style.display = 'none';
      homepage.style.display = 'flex';
      showButtons();
    }
  }

  updateDisplay();
}

function updateDisplay() {
  if (currentPhase === 'complete') return;

  const phase = phases[currentPhase];
  counter.innerHTML = `
  <p class="counter-phase">${phase.action}</p>
  <span class="counter-numbers">${seconds + 1}</span>
  `;
}

function showButtons() {
  buttons.style.display = 'grid';
  document.getElementById('one-more').addEventListener('click', reset);
  document.getElementById('share').addEventListener('click', share);
  document.getElementById('mentor').addEventListener('click', () => {
    window.open('https://wisepals.ai', '_blank');
  });
  document.getElementById('close').addEventListener('click', () => {
    // window.location.href = 'https://www.google.com';
    body.innerHTML = '';
  });
}

function reset() {
  currentPhase = 'inhale';
  seconds = 0;
  startBreathing();
}

async function share() {
  const tooltip = document.getElementById('tooltip');
  await navigator.clipboard.writeText(
    'Check this breathing exercise extension: https://example.com',
  );
  tooltip.style.display = 'block';
  setTimeout(() => {
    tooltip.style.display = 'none';
  }, 3000);
  // alert('Link copied to clipboard!');
}

// Start the exercise
startBreathing();
