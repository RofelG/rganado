const listItems = document.querySelectorAll(".card-spring");
const springConstant = 0.2; // adjust this value to change the strength of the spring
const dampingFactor = 0.8; // adjust this value to change the damping of the spring
const targetY = 50; // adjust this value to change the target position of the spring
const scrollSpeed = 0.1; // adjust this value to change scroll sensitivity

// create an array to store the current position and velocity of each list item
const itemState = [];
listItems.forEach((item, index) => {
  itemState.push({
    currentY: 10 * (index + 1),
    velocity: 0,
    springConstant: 0.1 * (index + 1),
    dampingFactor: 0.8,
    scrollSpeed: 0.1 - ((index + 1)/50),
  });
});

let lastScrollTop = 0;

function updateSpringAnimation() {
  // get the current scroll position of the page
  const scrollTop = document.documentElement.scrollTop;

  
  // update the position and velocity of each list item
  listItems.forEach((item, index) => {
    
    // calculate the new target position based on the scroll position
    const newTargetY = targetY - (scrollTop * itemState[index].scrollSpeed);

    // calculate the spring force
    const springForce = -(itemState[index].currentY - newTargetY) * itemState[index].springConstant;

    // update the velocity and current position of the spring
    itemState[index].velocity += springForce;
    itemState[index].velocity *= itemState[index].dampingFactor;
    itemState[index].currentY += itemState[index].velocity;

    // update the position of the list item
    item.style.transform = `translateY(${itemState[index].currentY}px)`;

    console.log('Updated position of item', index, 'to', itemState[index].currentY);
  });

  // schedule the next animation frame
  requestAnimationFrame(updateSpringAnimation);
}

// start the animation, with a delay for each subsequent item
updateSpringAnimation();
