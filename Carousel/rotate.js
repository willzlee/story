const carousel = document.querySelector('.carousel');
const cells = carousel.querySelectorAll('.slide');
const slideWidth = SlideDimention.width;
const WIDTH = NumberOfSlides * slideWidth;
var initialIndex = 0;
var nextCounter = 0;
var prevCounter = 0;
var selectedIndex = 0;

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

      cells[current].style.transform = `translateX(${WIDTH * stepBack}px)`;
    }

    if (selectedIndex > 0) {
      if (NumberOfSlides - selectedIndex === 1 || selectedIndex >= NumberOfSlides) {
        prevCounter = 0;
        nextCounter = Math.floor((selectedIndex + 1) / NumberOfSlides);
        const index = (selectedIndex - NumberOfSlides + 1) % NumberOfSlides;

        if (nextCounter > 0) {
          cells[index].style.transform = `translateX(${WIDTH * nextCounter}px)`;
        } else {
          cells[index].style.transform = `translateX(${WIDTH}px)`;
        }
      } else {
        cells[initialIndex+1].style.transform = 'translateX(0px)';
      }
    }
  }

  if (direction === 'prev') {
    if (selectedIndex > 0) {
      if (initialIndex === 0) {
        cells[NumberOfSlides-1].style.transform = `translateX(${(selectedIndex-NumberOfSlides) * slideWidth}px)`;
      } else {
        const prevSlide = (selectedIndex - 1) % NumberOfSlides;
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
carousel.style.width = WIDTH;
carousel.style.transition = Duration;
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
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel('prev');
});

const nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel('next');
});
