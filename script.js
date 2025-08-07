/**
 * @author GlicyDev
 * @date 07.08.2025
 * @description A simple gravity simulation with a bouncing ball. There is no classes and other files because this is a simple project and I didn't have much time to do it.
 * @version 1.0.0
 */

const ball = document.getElementById("ball");
const interval = 1;
const gravity = 0.05;
const friction = 0.004;
const yBounceDamping = 0.85;
const xChange = 0.999;

let fall;

async function simulate() {
  clearInterval(fall);
  // Bounding
  const maxX = window.innerWidth - ball.clientWidth;
  const maxY = window.innerHeight - ball.clientHeight;

  let position = {
    x: 0,
    y: 0,
  };

  let yVelocity = 10;
  let xVelocity = 4.5;

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
      xVelocity = -xVelocity;
    }

    if (position.y === 0 || position.y >= maxY) {
      if (yVelocity === 0 && xVelocity === 0) {
        clearInterval(fall);
      }

      yVelocity = -yVelocity * yBounceDamping - 0.5;
    }

    ball.style.bottom = `${position.y}px`;
    ball.style.left = `${position.x}px`;
  }, interval);
}
