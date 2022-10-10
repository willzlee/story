const carousel = document.querySelector('.carousel');
const container = document.querySelector('.container');
const cells = carousel.querySelectorAll('.slide');
const NumberOfSlides = ShowNumberOfSlides <= cells.length
  ? ShowNumberOfSlides
  : cells.length;
const shortList = (NumberOfSlides === 2 || NumberOfSlides === 3) ? true : false;
const slideWidth = SlideDimention.width;
const WIDTH = NumberOfSlides * slideWidth;
var delay;
var initialIndex = 0;
var nextCounter = 0;
var prevCounter = 0;
var selectedIndex = 0;

const moveDebounce = (fn, timeout = Duration) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, []);
    }, timeout);
  };
};

const debounce = (fn, timeout = Duration) => {
  let timer;
  return (...args) => {
    if (!timer) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
};

function rotateCarousel(direction) {
  if (NumberOfSlides <= 1) {
    return;
  }

  if (Loopback) {
    if (selectedIndex < 0) {
      carousel.style.transform = `translateX(${(NumberOfSlides - 1) * slideWidth * -1}px)`;
      selectedIndex = NumberOfSlides - 1;
    } else if (selectedIndex === NumberOfSlides) {
      carousel.style.transform = `translateX(0px)`;
      selectedIndex = 0;
    } else {
      carousel.style.transform = `translateX(${selectedIndex * slideWidth * -1}px)`;
    }

    return;
  }

  carousel.style.transform = `translateX(${selectedIndex * slideWidth * -1}px)`;

  if (selectedIndex < 0) {
    if (selectedIndex % NumberOfSlides === 0) {
      initialIndex = 0;
    } else {
      initialIndex = NumberOfSlides + selectedIndex % NumberOfSlides;
    }
  } else {
    initialIndex = selectedIndex % NumberOfSlides;
  }

  if (direction === 'next') {
    if (selectedIndex <= 0) {
      const current = (initialIndex + 1) % NumberOfSlides;
      const stepBack = Math.floor((selectedIndex+1) / NumberOfSlides);

      if (shortList) {
        delay = moveDebounce(() => {
          cells[current].style.transform = `translateX(${WIDTH * stepBack}px)`;
        });
      } else {
        cells[current].style.transform = `translateX(${WIDTH * stepBack}px)`;
      }
    }

    if (selectedIndex > 0) {
      if (NumberOfSlides - selectedIndex === 1 || selectedIndex >= NumberOfSlides) {
        prevCounter = 0;
        nextCounter = Math.floor((selectedIndex + 1) / NumberOfSlides);
        const index = (selectedIndex - NumberOfSlides + 1) % NumberOfSlides;

        if (nextCounter > 0) {
          if (shortList) {
            delay = moveDebounce(() => {
              cells[index].style.transform = `translateX(${WIDTH * nextCounter}px)`;
            });
          } else {
            cells[index].style.transform = `translateX(${WIDTH * nextCounter}px)`;
          }
        } else {
          if (shortList) {
            delay = moveDebounce(() => {
              cells[index].style.transform = `translateX(${WIDTH}px)`;
            });
          } else {
              cells[index].style.transform = `translateX(${WIDTH}px)`;
          }
        }
      } else {
        if (shortList) {
          delay = moveDebounce(() => {
            cells[initialIndex+1].style.transform = 'translateX(0px)';
          });
        } else {
          cells[initialIndex+1].style.transform = 'translateX(0px)';
        }
      }
    }
    if (shortList) {
      delay();
    }
  }

  if (direction === 'prev') {
    if (selectedIndex >= 0) {
      if (initialIndex === 0) {
        if (NumberOfSlides === 2) {
          cells[initialIndex].style.transform = `translateX(${selectedIndex * slideWidth}px)`;
        } else {
          cells[NumberOfSlides-1].style.transform = `translateX(${(selectedIndex-NumberOfSlides) * slideWidth}px)`;
        }
      } else {
        let prevSlide = (selectedIndex - 1) % NumberOfSlides;
        if (NumberOfSlides === 2) {
          prevSlide = initialIndex;
        }
        cells[prevSlide].style.transform = `translateX(${(selectedIndex-initialIndex) * slideWidth}px)`;
      }
    }

    if (selectedIndex < 0) {
      prevCounter = Math.floor(Math.abs(selectedIndex) / NumberOfSlides);
      const prevIndex = selectedIndex % NumberOfSlides;

      if(prevIndex === 0) {
        if (prevCounter > 0) {
          cells[prevIndex].style.transform = `translateX(${WIDTH * prevCounter * -1}px)`;
        } else {
          cells[prevIndex].style.transform = `translateX(${WIDTH * -1}px)`;
        }
      } else {
        if (selectedIndex > -1 * NumberOfSlides) {
          prevCounter = 0;
        }
        if (prevCounter > 0) {
          cells[NumberOfSlides+prevIndex].style.transform = `translateX(${WIDTH * (prevCounter+1) * -1}px)`;
        } else {
          cells[NumberOfSlides+prevIndex].style.transform = `translateX(${WIDTH * -1}px)`;
        }
      }
    }
  }
}

/**
 * Config Carousel via customized values
 */
container.style.height = SlideDimention.height + 4;
container.style.width = SlideDimention.width + 4;
carousel.style.width = WIDTH;
carousel.style.transition = `${Duration}ms`;
cells.forEach((cell, i) => {
  cell.style.transition = SlideTransition;
  cell.style.height = SlideDimention.height;
  cell.style.width = SlideDimention.width;

  if (i >= NumberOfSlides) {
    cell.style.display = 'none';
  } else {
    cell.style.display = 'inline-block';
  }
});

const prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', debounce(() => {
  selectedIndex--;
  rotateCarousel('prev');
}));

const nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', debounce(() => {
  selectedIndex++;
  rotateCarousel('next');
}));

document.addEventListener('keydown', debounce((e) => {
  if (e.code === 'ArrowLeft') {
      selectedIndex--;
      rotateCarousel('prev');
   } else if (e.code === 'ArrowRight') {
       selectedIndex++;
       rotateCarousel('next');
   }
}));
