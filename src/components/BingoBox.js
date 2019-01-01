import React from 'react';

export const BingoBox = props => {
    return <div
        className={props.id === "n3" ? "bingo-box activated" : props.active}
        onClick={() => props.clickHandler(props.value)}
      >
      <p>{props.value}</p>
    </div>
}
