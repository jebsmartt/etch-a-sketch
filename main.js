
const body = document.querySelector('body')
body.style.display = 'flex'
body.style.flexDirection = 'column'
body.style.alignItems = 'stretch'

const createControlContainer = document.createElement('div')
createControlContainer.style.display = 'flex'
createControlContainer.style.justifyContent = 'center'

body.appendChild(createControlContainer)

const createGridButton = document.createElement('button')
createGridButton.id = 'create-grid-button'

// Get grid size from user
createGridButton.addEventListener('click', function () {
    let enteredValue;
    
    do {
        enteredValue = prompt("Enter a size for the grid (1-100):")

        if (enteredValue === null) {
            return;
        }
    } while (isNaN(enteredValue) || enteredValue < 1 || enteredValue > 100);

    gridContainer.innerHTML = ""
    createGrid(enteredValue, enteredValue)
})

createGridButton.textContent = 'Set Grid Size'

createControlContainer.appendChild(createGridButton)
createControlContainer.style.margin = '10px'

// Container for grid rows
const gridContainer = document.createElement('div')
gridContainer.id = 'grid-container'
gridContainer.style.backgroundColor = '#f5f4d5'

gridContainer.style.display = 'flex'
gridContainer.style.flexDirection = 'column'
gridContainer.style.justifyContent = 'space-evenly'

body.appendChild(gridContainer)

// Creates a single grid row. Will add child squares if passed argument.
function createGridRow(squares = 0) {
    const gridRow = document.createElement('div')
    gridRow.classList.add('grid-row')
    gridRow.style.maxWidth = '800px'
    gridRow.style.width = '100%'
    gridRow.style.marginLeft = 'auto'
    gridRow.style.marginRight = 'auto'
    gridRow.style.flexGrow = 1
    
    gridRow.style.display = 'flex'
    gridRow.style.justifyContent = 'space-evenly'
    gridRow.style.alignSelf = 'stretch'

    for (let i = 0; i < squares; i++) {
        gridRow.append(createGridSquare())
    }
    return gridRow
}

// Creates a single grid square
function createGridSquare() {
    const gridSquare = document.createElement('div')
    gridSquare.classList.add('grid-square')

    gridSquare.style.backgroundColor = '#deded7'
    gridSquare.style.minWidth = '10px'
    gridSquare.style.aspectRatio = 1

    gridSquare.style.flexGrow = 1

    // Squares turn black on mouseover
    gridSquare.addEventListener('mouseover', function () {
        
        function randomColor () {
            function randomNumber() {
                const min = 0;
                const max = 255;
                let randomInteger
    
                do {
                    randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
                } while (randomInteger % 5 !== 0);
                return randomInteger
            }
            const [r,g,b] = [randomNumber(),randomNumber(),randomNumber()]
            return `rgb(${r},${g},${b})`
        }
        
        gridSquare.style.backgroundColor = randomColor()
    })

    return gridSquare
}


// Creates rows and creates squares in rows if passed an x > 0
function createGrid(x = 16,y = 16, container = gridContainer) {
    for (let i = 0; i < y; i++) {
        container.append(createGridRow(x))
    }
    console.log(`Created a grid of ${x} by ${y} size.`)
}

createGrid()