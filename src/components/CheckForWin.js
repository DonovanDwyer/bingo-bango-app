export function CheckForWin(bingoCard, activeValues){

  function includesSelectedValues(box){
    return activeValues.includes(bingoCard[box])
  }

  if(["b1","b2","b3","b4","b5"].every(includesSelectedValues)){
    return true
  } else if(["i1","i2","i3","i4","i5"].every(includesSelectedValues)){
    return true
  } else if(["n1","n2","n4","n5"].every(includesSelectedValues)){
    return true
  } else if(["g1","g2","g3","g4","g5"].every(includesSelectedValues)){
    return true
  } else if(["o1","o2","o3","o4","o5"].every(includesSelectedValues)){
    return true
  } else if(["b1","i1","n1","g1","o1"].every(includesSelectedValues)){
    return true
  } else if(["b2","i2","n2","g2","o2"].every(includesSelectedValues)){
    return true
  } else if(["b3","i3","g3","o3"].every(includesSelectedValues)){
    return true
  } else if(["b4","i4","n4","g4","o4"].every(includesSelectedValues)){
    return true
  } else if(["b5","i5","n5","g5","o5"].every(includesSelectedValues)){
    return true
  } else if(["b1","i2","g4","o5"].every(includesSelectedValues)){
    return true
  } else if(["b5","i4","g2","o1"].every(includesSelectedValues)){
    return true
  } else {
    return false
  }
  
}
