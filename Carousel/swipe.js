const getPosition = (event) => {
  if ('touches' in event) {
    const { pageX, pageY } = event.touches[0];
    return { x: pageX, y: pageY };
  }

  const { screenX, screenY } = event;
  return { x: screenX, y: screenY };
};

const onMouseDown = (event) => {
  handleSwipeStart(event);
};

const onMouseMove = (event) => {
  handleSwipeMove(event);
};

const onMouseUp = (event) => {
  handleSwipeEnd(event);
};

const handleSwipeStart = (event) => {
  const { x, y } = getPosition(event);
  positionX = x;
  positionY = y;
}

const handleSwipeMove = (event) => {
  event.preventDefault();
};

const handleSwipeEnd = (event) => {
  const { x, y } = getPosition(event);
  if (Swipe) {
    if (positionX > x) {
      nextButton.click();
    }
    if (positionX < x) {
      prevButton.click();
    }
  }
};

carousel.addEventListener('mousedown', onMouseDown);
carousel.addEventListener('mousemove', onMouseMove);
carousel.addEventListener('mouseup', onMouseUp);
