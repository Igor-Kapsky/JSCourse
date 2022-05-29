function selectRandomID(max, min = 1) {  
  max = Math.floor(max);
  min = Math.ceil(min);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { selectRandomID };