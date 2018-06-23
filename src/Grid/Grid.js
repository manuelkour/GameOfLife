import React, { Component } from "react";
import Box from "../Box/Box";

class Grid extends Component {
    render() {
        const width = this.props.cols * 14;
        var rowsArr = []

        var boxClass = "";
        for (var i = 0; i < this.props.rows; i++) {
            for (var j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j; // ID für jedes Box Element

                boxClass = this.props.gridFull[i][j] ? "box on" : "box off" // Check die Grid die gepassed wurde bzw. den spezifischen Spot 
                rowsArr.push( // Boxen werden in Array gepushed
                    <Box 
                    boxClass = {boxClass}
                    key = {boxId}
                    boxId = {boxId}
                    row = {i}
                    col = {j}
                    selectBox = {this.props.selectBox}
                    />
                );

            }
        }

        return (
            <div className = "grid" style = {{width: width}}>
                {rowsArr}
            </div>
        )
    }
}

export default Grid;