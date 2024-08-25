export const handleUp = (nextDirection) => {
  if (nextDirection !== 'ArrowDown') {
    nextDirection = 'ArrowUp';
  }
};

export const handleDown = (nextDirection) => {
  if (nextDirection !== 'ArrowUp') {
    nextDirection = 'ArrowDown';
  }
};

export const handleLeft = (nextDirection) => {
  if (nextDirection !== 'ArrowRight') {
    nextDirection = 'ArrowLeft';
  }
};

export const handleRight = (nextDirection) => {
  if (nextDirection !== 'ArrowLeft') {
    nextDirection = 'ArrowRight';
  }
};
export const handleKeyDown = (event,nextDirection) => {
  const { key } = event;

  if (key === "ArrowUp" && nextDirection != "ArrowDown") {
    nextDirection = "ArrowUp"
  } else if (key === "ArrowLeft" && nextDirection != "ArrowRight") {
    nextDirection = "ArrowLeft"
  } else if (key === "ArrowRight" && nextDirection != "ArrowLeft") {
    nextDirection = "ArrowRight"
  } else if (key === "ArrowDown" && nextDirection != "ArrowUp") {
    nextDirection = "ArrowDown"
  }
}