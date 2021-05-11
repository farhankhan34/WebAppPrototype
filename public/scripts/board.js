class Board {
    constructor(name) {
        this.name = name;          
    }
    render(container){
          /* add a swimline (column) as a board */
        let boardLane =  document.createElement('div');
        boardLane.setAttribute('class','board');

        /* add a label for the board */ 
        let boardLabel =  document.createElement('div');
        boardLabel.setAttribute('class','label');
        boardLabel.innerHTML =  this.name;

        boardLane.appendChild(boardLabel);
        container.appendChild(boardLane);
    }    
}