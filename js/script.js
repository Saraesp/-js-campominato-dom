//ESERCIZIO
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

function createBombs(min, max)
{
    let bombs = [];
    let i = 0;
    while(i < 16){
        let numRandom = Math.floor(Math.random() * (max - min + 1)) + min;

        if(!bombs.includes(numRandom)){
            bombs.push(numRandom);
            i++;
        }

    }
    return bombs;
}

function createNewGame(){
    let difficulty = parseInt(document.getElementById('level').value);

    let cellsNumber;
    let cellsRow;

    switch(difficulty){
        case 1:
            cellsNumber = 100;
            cellsRow = 10;
            break;
        case 2:
            cellsNumber = 81;
            cellsRow = 9;
            break;
        case 3:
            cellsNumber = 49;
            cellsRow = 7;
            break;
        default:
            cellsNumber = 100;
            cellsRow = 10;
    }

    let arrayBombs = createBombs(1, cellsNumber);
    console.log(arrayBombs)
    
    generateGameGrid(arrayBombs, cellsNumber, cellsRow)
}

function createSingleSquare(num, cells_per_row){
    const cell = document.createElement('div');
    cell.classList.add('square');
    let sideLength = `100px`;

    cell.style.width = sideLength;
    cell.style.height = sideLength;

    cell.innerText = num;

    return cell
}

function generateGameGrid(bombs, cellsNumber, cellsRow)
{
    document.querySelector('.container').innerHTML = '';

    const grid = document.createElement('div');
    grid.classList.add('grid');

    const grid_side = cellsRow * 100;
    grid.style.width = `${grid_side}px`
    grid.style.height = `${grid_side}px`

    for(let i = 0; i < cellsNumber; i++){
        const cell = createSingleSquare(i+1, cellsRow);
        cell.addEventListener('click', function(){
            this.classList.toggle('clicked');
            if(bombs.includes(parseInt(this.innerText))){
               alert('Hai cliccato su una bomba '+this.innerText);
            }
        })

        grid.appendChild(cell);
    }

    document.querySelector('.container').appendChild(grid)

}

document.getElementById('play-game').addEventListener('click', function(){
    createNewGame();
})