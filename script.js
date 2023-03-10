// const video = document.getElementById('webcamVideo')
// Promise.all([
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//     faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
// ]).then(startVideo)

// function startVideo() {
//     navigator.getUserMedia(
//         { video: {} },
//         stream => video.srcObject = stream,
//         err => console.log(err)
//     )
// }

// video.addEventListener('play', () => {
//     const canvas = faceapi.createCanvasFromMedia(video)
//     document.body.append(canvas)
//     const displaySize = { width: video.width, height: video.height }
//     faceapi.matchDimensions(canvas, displaySize)
//     setInterval(async () => {
//         const labeledFaceDescriptors = await loadLabeledImages()
//         const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
//         const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
//         const resizedDetections = faceapi.resizeResults(detections, displaySize)
//         canvas.getContext('2d', { willReadFrequently: true }).clearRect(0, 0, canvas.width, canvas.height)
//         const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
//         results.forEach((result, i) => {
//             console.log(results[0]._label);
//             const box = resizedDetections[i].detection.box
//             const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
//             drawBox.draw(canvas)
//         })
//         // faceapi.draw.drawDetections(canvas, resizedDetections)
//         // faceapi.draw.drawFaceLandmark(canvas, resizedDetections)
//     }, 1000)
// })

// function loadLabeledImages() {
//     const labels = ['Jisoo', 'Lisa', 'Rose', 'Jennie']
//     return Promise.all(
//         labels.map(async label => {
//             const descriptions = []
//             for (let i = 1; i <= 4; i++) {
//                 const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/BorntoDev/FaceRegJS/master/labeled_images/${label}/${i}.jpg`)
//                 const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//                 descriptions.push(detections.descriptor)
//             }

//             return new faceapi.LabeledFaceDescriptors(label, descriptions)
//         })
//     )
// }

const video = document.getElementById('webcamVideo')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models2'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models2'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models2'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models2')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    console.log(resizedDetections[0].expressions);
  }, 0)
})