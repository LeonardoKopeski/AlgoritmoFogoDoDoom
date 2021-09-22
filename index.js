const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const canvas = document.querySelector("canvas")
const pixelsPerSquare = 12.8
const fireUpdate = 50

var renderArray = []
function generateRenderArray(heigth, width){
    for(var h = 0; h < heigth; h++){
        var arr = []
        for(var w = 0; w < width; w++){
            arr.push(0)
        }
        renderArray.push(arr)
    }

    canvas.width = width * pixelsPerSquare
    canvas.height = heigth * pixelsPerSquare
}

function generateFireSource(){
    var arr = []
    for(var c in renderArray[0]){
        arr.push(36)
    }
    renderArray[renderArray.length-1] = arr
}

function calculatePropagation(){
    var height = renderArray.length
    var width = renderArray[0].length

    for(var y = 0; y < height-1; y++){
        for(var x = 0; x < width; x++){
            var downSquare = renderArray[y+1][x]

            var decay = Math.floor(Math.random()*3)
            renderArray[y][x] = downSquare - decay

            if(renderArray[y][x] < 0){ renderArray[y][x] = 0 }
        }
    }
}

function render(){
    var ctx = canvas.getContext("2d")
    renderArray.forEach((arr, y)=>{
        arr.forEach((elm, x) => {
            var color = fireColorsPalette[elm]
            try{
                ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
            }catch{}

            ctx.fillRect(
                x * pixelsPerSquare, 
                y * pixelsPerSquare,
                pixelsPerSquare,
                pixelsPerSquare
            )
        })
    })
}

function start(){
    generateRenderArray(50, 50)
    generateFireSource()
    setInterval(()=>{
        calculatePropagation()
        render()
    }, fireUpdate)
}
start()