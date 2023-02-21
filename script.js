const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
ctx.lineWidth="2";
ctx.strokeStyle="blue";

const canvasHeight = canvas.height,
  minY = 100,
  maxY = canvasHeight - 99,
  animationTime = 700,
  framesAmount = animationTime / 16.6,
  updateInterval = animationTime / framesAmount,
  arrayXCoords = [100, 150, 200, 250, 300, 350, 400, 450, 500];

let arrayFromYCoords,
  arrayToYCoords,
  pointsArrayFrom,
  pointsArrayTo;

const generateRandomY = () => {
  return Math.floor(minY + Math.random() * (maxY - minY));
}

arrayFromYCoords = arrayXCoords.map(() => {
  return generateRandomY()
})

const generateNewRandomCoords = () => {
  arrayToYCoords = arrayXCoords.map(() => {
    return generateRandomY()
  })

  pointsArrayFrom = arrayXCoords.map((i, ind) => {
    return {
      x: i,
      y: arrayFromYCoords[ind]
    }
  })
  pointsArrayTo = arrayXCoords.map((i, ind) => {
    return {
      x: i,
      y: arrayToYCoords[ind]
    }
  })
  return {
    arrayToYCoords,
    pointsArrayFrom,
    pointsArrayTo
  }
}
generateNewRandomCoords();
let points = pointsArrayFrom;

const drawGraph = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(point => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
}
drawGraph();

canvas.addEventListener('click', (e) => {

  let frameDifferent = arrayFromYCoords.map((arrayFromYCoords, i) => {
    let res = (arrayFromYCoords - arrayToYCoords[i])/framesAmount;
    return res;
  });

  let pointsFramesYArray = arrayFromYCoords;

  const updateNewFrame = () => {
    pointsFramesYArray = pointsFramesYArray.map((pointsFramesYArray, i) => {
      return pointsFramesYArray - frameDifferent[i];
      }
    );
    let pointsFramesArray = arrayXCoords.map((i, ind) => {
      return {
        x: i,
        y: pointsFramesYArray[ind]
      }
    });
    points = pointsFramesArray;
    drawGraph();
  }

  if (points == pointsArrayFrom) {
    const animateGraph = setInterval(() => {
      updateNewFrame();
    }, updateInterval)

    setTimeout(() => {
      clearInterval(animateGraph);
      drawGraph();

      arrayFromYCoords = arrayToYCoords;
      generateNewRandomCoords();
      points = pointsArrayFrom;
    }, animationTime);
  }
})