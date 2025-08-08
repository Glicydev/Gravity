/**
 * @author GlicyDev
 * @date 07.08.2025
 * @description A simple gravity simulation with a bouncing ball. There is no classes and other files because this is a simple project and I didn't have much time to do it.
 * @version 1.0.0
 */

const ball = document.getElementById("ball");

const interval = 1; // ms
const gravity = 0.06; // newton/frame
const friction = 0.002; // newton/frame
const yBounceDamping = 0.85; // newton/bounce
const xChange = 0.9; // newton/boucne

let fall;

function getMaxes() {
  return {
    maxX: window.innerWidth - ball.clientWidth,
    maxY: window.innerHeight - ball.clientHeight
  }
}

function isBetween(value, min, max) {
  return value >= min && value <= max;
}

async function simulate() {

  // Error handling
  if (!ball) {
    console.error("Ball element not found.");
    return;
  }

  // Clean
  clearInterval(fall);

  // Bounding and initial values
  let { maxX, maxY } = getMaxes();

  let position = {
    x: 0,
    y: 0,
  };

  let yVelocity = 15;
  let xVelocity = 14.5;

  // Change on resize
  window.addEventListener("resize", () => ({ maxX, maxY } = getMaxes()));

  // ---> FALL LOGIC <---
  fall = setInterval(() => {
    // Y changes
    position.y += yVelocity;
    position.y = Math.min(Math.max(0, position.y), maxY);
    yVelocity -= gravity;

    // X changes
    position.x += xVelocity;
    position.x = Math.min(Math.max(0, position.x), maxX);

    if (xVelocity > 0) {
      xVelocity -= friction;
    } else if (xVelocity < 0) {
      xVelocity += friction;
    }

    // Change position
    if (position.x === 0 || position.x >= maxX) {
      xVelocity = -xVelocity * xChange;
    }

    if (position.y === 0 || position.y >= maxY) {
      if (yVelocity === 0 && xVelocity === 0) {
        clearInterval(fall);
      }
      else if (!isBetween(yVelocity, -0.5, 0.5)) {
        xVelocity *= xChange;
      }

      yVelocity = -yVelocity * yBounceDamping - 0.5;
    }

    ball.style.bottom = `${position.y}px`;
    ball.style.left = `${position.x}px`;
  }, interval);
}
