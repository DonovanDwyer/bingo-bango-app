import React from 'react';

export const BingoBox = props => {
    return <div
        className={props.id === "n3" ? "bingo-box activated" : props.active}
        onClick={() => props.clickHandler(props.value)}
      >
      {props.id === "n3" ? <p id="free-box">FREE</p> : <p>{props.value}</p>}
    </div>
}
