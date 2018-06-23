import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from "./Grid/Grid";
import Buttons from "./Buttons/Buttons";


class Main extends Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)) // Erstellt 50x30 Grid
        }
    }

    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull); // arrayClone als Helper Function - kopiert im gridFull (in state)
        gridCopy [row] [col] = !gridCopy [row] [col];
        this.setState({
            gridFull: gridCopy
        })
    }

    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for(let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) { // Entscheidet ob Box "on" oder "off" ist.
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i] [j] = true; // 25% Chance dass Feld angeht
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        })
    }

    playButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.play, this.speed);
    }

    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    slow = () => {
        this.speed = 1000;
        this.playButton();
    }

    fast = () => {
        this.speed = 100;
        this.playButton();
    }

    clear = () => {
       var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
       this.setState({
           gridFull: grid,
           generation: 0
       });
    }

    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 20;
                this.rows = 10;
            break;
            case "2":
                this.cols = 50;
                this.rows = 30;
            break;
            default:
                this.cols = 70;
                this.rows = 50;
        }
        this.clear(); // Stellt Ursprungszustand her
    }

    play = () => {
        let g = this.state.gridFull; // Checkt derzeitige Grid
        let g2 = arrayClone(this.state.gridFull); // Changed Squares aufm Klon

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                let count = 0;
                    if (i > 0) if (g[i - 1][j]) count++;
                    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                    if (j < this.cols - 1) if (g[i][j + 1]) count++;
                    if (j > 0) if (g[i][j - 1]) count++;
                    if (i < this.rows - 1) if (g[i + 1][j]) count++;
                    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                    if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
                    // Oben: Jede Zelle kann 8 potenzielle Nachbarn haben --> Alle durchgehen und wenn true --> count++ 
                    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false; // stirbt
                    if (!g[i][j] && count === 3) g2[i][j] = true; // Tot + 3 Nachbarn => Neue Zelle entsteht
                }
            }
        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
        })
    }

    componentDidMount() {
        this.seed();
        this.playButton();
    }

    render() {
        return (
            <div>
                <h1>Game of Life</h1>
                <Buttons 
                playButton = {this.playButton}
                pauseButton = {this.pauseButton}
                slow = {this.slow}
                fast = {this.fast}
                clear = {this.clear}
                seed = {this.seed}
                gridSize = {this.gridSize}
                />

                
                <Grid 
                gridFull = {this.state.gridFull}
                rows = {this.rows}
                cols = {this.cols}
                selectBox = {this.selectBox}
                />
                <h2>Generations: {this.state.generation}</h2>
            </div>
        );
    }
}

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main/>, document.getElementById('root'));

