const getPosition = (event) => {
  if ('touches' in event && event.touches.length > 0) {
    const { pageX, pageY } = event.touches[0];
    return { x: pageX, y: pageY };
  }

  const { screenX, screenY } = event;
  return { x: screenX, y: screenY };
};

const onMouseDown = (event) => {
  movedX = 0;
  handleSwipeStart(event);
};

const onMouseMove = (event) => {
  handleSwipeMove(event);
};

const onMouseUp = (event) => {
  handleSwipeEnd(event);
};

const handleSwipeStart = (event) => {
  movedX = 0;
  const { x, y } = getPosition(event);
  positionX = x;
  positionY = y;
}

const handleSwipeMove = (event) => {
  const { x, y } = getPosition(event);
  movedX = x - positionX;
  event.preventDefault();
};

const handleSwipeEnd = (event) => {
  const { x, y } = getPosition(event);
  event.preventDefault();
  if (Swipe) {
    if (positionX - x > movingEdge || (movedX < -movingEdge)) {
      nextButton.click();
    }
    if (positionX - x < -movingEdge || (movedX > movingEdge)) {
      prevButton.click();
    }
  }
};

carousel.addEventListener('mousedown', onMouseDown);
carousel.addEventListener('touchstart', handleSwipeStart);
carousel.addEventListener('mousemove', onMouseMove);
carousel.addEventListener('touchmove', handleSwipeMove);
carousel.addEventListener('mouseup', onMouseUp);
carousel.addEventListener('touchend', handleSwipeEnd);
