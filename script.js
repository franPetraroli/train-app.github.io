const alamein = ['Flinders Street', 'Richmond', 'East Richmond', 'Burnley', 'Hawthorn', 'Glenferrie']
const glenWaverly = ['Flagstaff', 'Melbourne Central', 'Parliament', 'Richmond', 'Kooyong', 'Tooronga']
const sandringham = ['Southern Cross', 'Richmond', 'South Yarra', 'Prahran', 'Windsor']
const trainLines = [alamein, glenWaverly, sandringham]

const origin = 'Melbourne Central'
const destination = 'Richmond'

//Get Form Elelments
const inputOrigin = document.getElementById('origin')
const inputDestination = document.getElementById('destination')
const submit = document.getElementById('submit')

function findRoute(origin, destination) {
  //Convert origin and destination to lowercase and no space
  let originToLower = origin.toLowerCase().replace(/\s+/g, "") 
  let desToLower = destination.toLowerCase().replace(/\s+/g, "") 
  let result;

  //Check the origin exist if it exist save details
  let originObject = checkIfExists(originToLower)

  //Check the destination exist if it exist save details
  let destinationObject = checkIfExists(desToLower)
  if(originObject === undefined && destinationObject === undefined){
    console.log('Origin and destination not found, please enter valid origin staion');
    return result = ['Origin and destination not found, please enter a valid origin staion']
  }else if(originObject === undefined){
    console.log('Origin not found, please enter valid staion');
    return result = ['Origin not found, please enter a valid staion']
  }else if(destinationObject === undefined){
    console.log('Destination not found, please enter valid staion');
    return result = ['Destination not found, please enter a valid staion']
  }else{
  
  //Check if origin and destination are on the same lione
  if (checkIfOnSameLine(originObject, destinationObject)) {
    
    if(checkIfRichmond(originObject, destinationObject)){
      destinationObject = findRichmond(originObject.lineFound)
    }
    result = checkIfGreater(originObject, destinationObject)
    console.log(result);
    return result
    
  } else {
    //if not on the same line find Richmond on origin line
    let richmondIndexOrigin = findRichmond(originObject.lineFound)
    //Find richmond on destination line
    let richmondIndexDest = findRichmond(destinationObject.lineFound)

    // Slice the portion from origin to Richmond
    let route1 = checkIfGreater(originObject, richmondIndexOrigin)
    
    //Slice the portion from Richmond to destiantion
    let route2 = checkIfGreater(destinationObject,richmondIndexDest).reverse()
    //Creeate ideal route 
    result = [].concat(route1).concat(route2)
    console.log(result);
    return result
  }}
}

function checkIfExists(stationToSearch) {
  for (i = 0; i < trainLines.length; i++) {
    for (j = 0; j < trainLines[i].length; j++) {
      if (stationToSearch == trainLines[i][j].toLowerCase().replace(/\s+/g, "")) {
        let lineFound = trainLines.indexOf(trainLines[i])
        let stationFound = trainLines[i].indexOf(trainLines[i][j])        
        return {
          lineFound,
          stationFound
        }
      }
    }
  }
}

function checkIfOnSameLine(origin, destination) {
  for (i = 0; i < trainLines[origin.lineFound].length; i++) {
    if (trainLines[destination.lineFound][destination.stationFound] === trainLines[origin.lineFound][i]) {
      return true
    }
  }
}


//get index station on a specific line
function getStationOnLine(line, station){
  for(i= 0; i < trainLines[line].length ; i++){
    let iteration = trainLines[line][i].toLowerCase().replace(/\s+/g, "")
    if(iteration === station){
      return trainLines[line].indexOf(trainLines[line][i])
    }
  }
}

//return richmond index on a specific line if it exist
function findRichmond(line) {
  for (i = 0; i < trainLines[line].length; i++) {
    if (trainLines[line][i] === 'Richmond') {
      let lineFound = trainLines.indexOf(trainLines[line])
      let stationFound = trainLines[line].indexOf(trainLines[line][i])
      return {
        lineFound,
        stationFound
      }
    }

  }
}

function checkIfGreater(origin, destination){
  let result = []
  if (origin.stationFound > destination.stationFound) {
    return result = trainLines[origin.lineFound].slice(destination.stationFound, origin.stationFound+=1).reverse();
  }else{
    return result = trainLines[origin.lineFound].slice(origin.stationFound , destination.stationFound += 1);
  }
}

function checkIfRichmond(origin, destination){
  let line = destination.lineFound
  let station = destination.stationFound
  if(trainLines[line][station].toLocaleLowerCase() == 'richmond'){
    return findRichmond(origin.lineFound)
  }  
}

// findRoute(origin, destination)

submit.addEventListener('click', ()=>{
  let result = findRoute(inputOrigin.value, inputDestination.value)
  // console.log(result);
  
  localStorage.setItem('result', JSON.stringify(result) )
})