import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            turn: "green-turn",
            prompt: "Fighting!",
            gameStatus: "in-progress"
        }
    }

    render() {
        return (
            <div>
                <h1>TIC-TAC-TOE</h1>
                { this.printBoard() }
                <h1>{ this.state.prompt }</h1>
                <a onClick={ (e) => this.restartGame(e) }>RESTART GAME</a>
            </div>
        )
    }

    // This function prints game board on page.
    printBoard() {

        let gameBoard = this.state.gameBoard;

        // Loop through all rows.
        let rows = gameBoard.map((rowEntry, i) => {

            // Loop through all elements in a row.
            let row = rowEntry.map((element, j) => {
                return (
                    <td key={ j } 
                        className={ this.state.turn } 
                        onClick={ (e) => this.handleClickGridItem(e) }
                        data-item-status={ 
                            gameBoard[i][j] === 0 ? "none" : 
                            gameBoard[i][j] === 1 ? "green-placed" : "red-placed"
                        }
                        data-row={ i }
                        data-col={ j } 
                    >
                        <div className="circle"></div>
                        <div className="cross-sign">
                            <div></div>
                            <div></div>
                        </div>
                    </td>
                )
            });

            return (
                <tr key={ i }>{ row }</tr>
            )
        });

        return (
            <table className="game-board" data-game-status={ this.state.gameStatus }>
                <tbody>{ rows }</tbody>
            </table>
        )
    }

    // This function handles when an grid item is clicked.
    handleClickGridItem(e) {
        e.preventDefault();

        // Get game board from state.
        // We will need to update its value.
        let gameBoard = this.state.gameBoard;
        let row = e.currentTarget.attributes["data-row"].value;
        let col = e.currentTarget.attributes["data-col"].value;
        
        let currentTurn = this.state.turn;

        // Switch turn and set "data-item-status" attribute to indicate an item has been placed.
        if(currentTurn === "green-turn") {
            // Value 1 represents green player.
            gameBoard[row][col] = 1;
            this.setState({
                turn: "red-turn",
                gameBoard: gameBoard,
            });
        } else {
            // Value 10 represents red player.
            gameBoard[row][col] = 10;
            this.setState({
                turn: "green-turn",
                gameBoard: gameBoard,
            });
        }

        this.checkForWin(gameBoard);
    }

    // Check which player wins the game.
    checkForWin(gameBoard) {

        // This variable indicates how many empty slots are left.
        // If 0 is left, it means the game board is fully placed.
        let emptySlots = 9;

        // Check row by row and column by column.
        for(let i = 0; i < 3; i ++) {
            let rowSum = 0;
            let colSum = 0;

            for(let j = 0; j < 3; j ++) {

                // Sum up row.
                rowSum += gameBoard[i][j];

                // Sum up column.
                colSum += gameBoard[j][i];

                if(gameBoard[i][j] !== 0) {
                    emptySlots --;
                }
            }

            // Winning pattern.
            if(rowSum === 3 || colSum === 3) {
                this.gameOver("Green Player Win!");
                break;
            } else if(rowSum === 30 || colSum === 30) {
                this.gameOver("Red Player Win!");
                break;
            }
        }
        
        // Handle diagonal cases.
        let leftDiagonalSum = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2];
        let rightDiagonalSum = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0];
        if(leftDiagonalSum === 3 || rightDiagonalSum === 3) {
            this.gameOver("Green Player Win!");
        } else if(leftDiagonalSum === 30 || rightDiagonalSum === 30) {
            this.gameOver("Red Player Win!");
        }

        // Case tie.
        if(emptySlots === 0) {
            this.gameOver("Oops, Tie!");
        }
    }

    // This function prompts to players who wins the game,
    // and prevent them from dropping more markers.
    gameOver(prompt) {
        this.setState({
            prompt: prompt,
            gameStatus: "game-over"
        });
    }

    // Reset state and restart game.
    restartGame(e) {
        e.preventDefault();

        this.setState({
            gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            turn: "green-turn",
            prompt: "Fighting!",
            gameStatus: "in-progress"
        });
    }
}

ReactDOM.render(<App />, document.getElementById("app"));