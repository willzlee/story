function renderGrid() {
    SpecialSize = SpecialSize > column ? column : SpecialSize;
    
    let gridRows = row >= 100 ? row : 100;
    const specialItemSize = SpecialSize === 1 ? 2 : SpecialSize;
    const colSpan = specialItemSize <= column ? specialItemSize : column;

    const grid = document.querySelector('.grid');

    let col = 1;
    let colPosition = Special ? colSpan + 1 : 1;
    let currentRow = 1;
    let displayCells = 0;
    let gridCellLayout = '';
    let screen = Mobile;

    if (Width >= Tablet_Low && Width <= Tablet_High) {
        col = 2;
        screen = Tablet;
    }
    if (Width >= Desktop_Low) {
        col = column >= SpecialSize ? column : 3;
        screen = Desktop;
    }

    if (Special) {
        displayCells = Display >= 3 ? Display - 1 : 1;
    } else {
        displayCells = Display > 0 ? Display : 1;
    }

    displayCells = displayCells <= column * gridRows - 1 ? displayCells : column * gridRows - 1;

    if (screen === Mobile) {
        gridRows = displayCells + SpecialSize + 2;
    }

    for (let i = 0; i < displayCells; i++) {
        const rowSpan = colSpan + 1;
        let current = Special ? i + (colSpan - 1) : i;

        if ((i > 0 && current % col === 0 && currentRow < gridRows) && screen !== Tablet) {
            currentRow += 1;
            colPosition = 1;
        }

        if (i > 0 && screen === Tablet && (i + 1) % col === 0) {
            colPosition = 1;
            currentRow += 1;
        }

        if (Special && i === 0) {
            if (screen === Mobile) {
                gridCellLayout += `grid-column: 1 / 2;`;
                gridCellLayout += `grid-row: 1 / ${rowSpan}`;
                currentRow += rowSpan + 1;
            } else if (screen === Tablet) {
                gridCellLayout += `grid-column: 1 / 3;`;
                gridCellLayout += `grid-row: 1 / 2`;
            } else {
                gridCellLayout += `grid-column: 1 / ${colPosition};`;
                gridCellLayout += `grid-row: 1 / 2`;
            }
        } else {
            gridCellLayout += `grid-column: ${colPosition} / ${colPosition + 1};`;
            gridCellLayout += `grid-row: ${currentRow} / ${currentRow + 1}`;

            colPosition += 1;
        }

        // generate grid cells
        let div = document.createElement('div');
        if (Special && i === 0) {
            if (screen === Mobile) {
                const specialHeight = colSpan * Height;
                gridCellLayout += `;height: ${specialHeight}`;
            }
            div.setAttribute('class', 'item special');
        } else {
            div.setAttribute('class', 'item');
        }

        div.setAttribute('id', i);

        let t = document.createTextNode(i + 1);
        div.appendChild(t);

        div.setAttribute('style', gridCellLayout);

        grid.appendChild(div);

        gridCellLayout = '';
    }
}

window.addEventListener("DOMContentLoaded", (e) => {
    renderGrid();
});
