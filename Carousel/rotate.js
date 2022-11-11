const carousel = document.querySelector('.carousel');
const container = document.querySelector('.container');
const cells = carousel.querySelectorAll('.slide');
const NumberOfSlides = ShowNumberOfSlides <= cells.length
  ? ShowNumberOfSlides
  : cells.length;
const shortList = (NumberOfSlides === 2 || NumberOfSlides === 3) ? true : false;
const slideWidth = SlideDimention.width >= 200 ? SlideDimention.width : 200;
const slideHeight = SlideDimention.height >= 124 ? SlideDimention.height : 124;
const WIDTH = NumberOfSlides * slideWidth;
var autoInterval;
var autoTimer;
var delay;
var initialIndex = 0;
var nextCounter = 0;
var prevCounter = 0;
var selectedIndex = 0;

const moveDebounce = (fn, timeout = shortList ? Duration : 100) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, []);
    }, timeout);
  };
};

const debounce = (fn, timeout = shortList ? Duration : 100) => {
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

const translate = (position) => {
  return `translateX(${position}px)`;
};

function rotateCarousel(direction) {
  if (NumberOfSlides <= 1) {
    return;
  }

  const dotter = document.querySelectorAll('.item');

  carousel.style.transform = translate(selectedIndex * slideWidth * -1);

  if (selectedIndex < 0) {
    if (selectedIndex % NumberOfSlides === 0) {
      initialIndex = 0;
    } else {
      initialIndex = NumberOfSlides + selectedIndex % NumberOfSlides;
    }
  } else {
    initialIndex = selectedIndex % NumberOfSlides;
  }

  for (var i = 0; i < dotter.length; i++) {
    dotter[i].classList.remove('selected');
  }
  dotter[initialIndex].classList.add('selected');

  if (Loopback) {
    if (selectedIndex < 0) {
      carousel.style.transform = translate((NumberOfSlides - 1) * slideWidth * -1);
      selectedIndex = NumberOfSlides - 1;
    } else if (selectedIndex === NumberOfSlides) {
      carousel.style.transform = translate(0);
      selectedIndex = 0;
    } else {
      carousel.style.transform = translate(selectedIndex * slideWidth * -1);
    }

    return;
  }

  if (direction === 'next') {
    if (selectedIndex <= 0) {
      const current = (initialIndex + 1) % NumberOfSlides;
      const stepBack = Math.floor((selectedIndex+1) / NumberOfSlides);

      if (shortList) {
        delay = moveDebounce(() => {
          cells[current].style.transform = translate(WIDTH * stepBack);
        });
      } else {
        cells[current].style.transform = translate(WIDTH * stepBack);
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
              cells[index].style.transform = translate(WIDTH * nextCounter);
            });
          } else {
            cells[index].style.transform = translate(WIDTH * nextCounter);
          }
        } else {
          if (shortList) {
            delay = moveDebounce(() => {
              cells[index].style.transform = translate(WIDTH);
            });
          } else {
              cells[index].style.transform = translate(WIDTH);
          }
        }
      } else {
        if (shortList) {
          delay = moveDebounce(() => {
            cells[initialIndex+1].style.transform = translate(0);
          });
        } else {
          cells[initialIndex+1].style.transform = translate(0);
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
          cells[initialIndex].style.transform = translate(selectedIndex * slideWidth);
        } else {
          cells[NumberOfSlides-1].style.transform = translate((selectedIndex-NumberOfSlides) * slideWidth);
        }
      } else {
        let prevSlide = (selectedIndex - 1) % NumberOfSlides;
        if (NumberOfSlides === 2) {
          prevSlide = initialIndex;
        }
        cells[prevSlide].style.transform = translate((selectedIndex-initialIndex) * slideWidth);
      }
    }

    if (selectedIndex < 0) {
      prevCounter = Math.floor(Math.abs(selectedIndex) / NumberOfSlides);
      const prevIndex = selectedIndex % NumberOfSlides;

      if(prevIndex === 0) {
        if (prevCounter > 0) {
          cells[prevIndex].style.transform = translate(WIDTH * prevCounter * -1);
        } else {
          cells[prevIndex].style.transform = translate(WIDTH * -1);
        }
      } else {
        if (selectedIndex > -1 * NumberOfSlides) {
          prevCounter = 0;
        }
        if (prevCounter > 0) {
          cells[NumberOfSlides+prevIndex].style.transform = translate(WIDTH * (prevCounter+1) * -1);
        } else {
          cells[NumberOfSlides+prevIndex].style.transform = translate(WIDTH * -1);
        }
      }
    }
  }
}

/**
 * Config Carousel via customized values
 */
container.style.height = slideHeight + 4;
container.style.width = slideWidth + 4;
carousel.style.width = WIDTH;
carousel.style.transition = `${Duration}ms`;
cells.forEach((cell, i) => {
  cell.style.transition = SlideTransition;
  cell.style.height = slideHeight;
  cell.style.width = SlideDimention.width;

  if (i >= NumberOfSlides) {
    cell.style.display = 'none';
  } else {
    cell.style.display = 'inline-block';
  }
});

const dotIndicator = document.querySelector('.dotControl');
for(var i = 0; i < NumberOfSlides; i++) {
  let li = document.createElement('li');
  if (i === 0) {
    li.setAttribute('class', 'item selected');
  } else {
    li.setAttribute('class', 'item');
  }

  li.setAttribute('id', i);

  let t = document.createTextNode(i);
  li.appendChild(t);

  if (NumberOfSlides > 1) {
    dotIndicator.appendChild(li);
  }
}

const autoPlayInterval = Interval >= 3000 ? Interval : 3000;
const autoPlayFn = () => {
  if (AutoPlay) {
    autoInterval = setInterval(() => {
      selectedIndex++;
      rotateCarousel('next');
    }, autoPlayInterval);
  }
};

const prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', debounce(() => {
  clearInterval(autoInterval);
  clearTimeout(autoTimer);

  selectedIndex--;
  rotateCarousel('prev');
  autoTimer = setTimeout(autoPlayFn, autoPlayInterval);
}));

const nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', debounce(() => {
  clearInterval(autoInterval);
  clearTimeout(autoTimer);

  selectedIndex++;
  rotateCarousel('next');
  autoTimer = setTimeout(autoPlayFn, autoPlayInterval);
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

autoPlayFn();
