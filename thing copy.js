var str = ""
let last = 0
let present = 0
let neww = 0


const chunk = []
const par = []
const signOrder = ["^", ["*", "/"], ["+", "-"]]

function updatePar(){
    /* Here the code updates the positions of the parentheses in the chunk array.
    This is done because putting together the numbers in the chunk array causes it to get shorter. */
    par.splice(0, par.length)
    for (let i = 0; i < chunk.length; i++){
        if (chunk[i] === "(" || chunk[i] === ")"){
            par.push([chunk[i], i])
        }

    }
}

function powerOfPar(){
    /* This function calculates things to the power of something else. */
    for (let x = par[i][1]; x < par[i+1][1]; x++){
        if (chunk[x] === "^"){
            neww = chunk[x-1]**chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = par[i][1]
            updatePar()
        }
    }
}

function powerOf(){
    /* This function does the same as the one above, except outside of parentheses. */
    for (let x = 0; x < chunk.length; x++){
        if (chunk[x] === "^"){
            neww = chunk[x-1]**chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = 0
        }
    }
}

function multiDivisionPar(){
    /* This function "handles" division and multiplication. */
    for (let x = par[i][1]; x < par[i+1][1]; x++){
        if (chunk[x] === "*"){
            neww = chunk[x-1]*chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = par[i][1]
            updatePar()
        }else if (chunk[x] === "/"){
            neww = chunk[x-1]/chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = par[i][1]
            updatePar()
        }
    }
}

function multiDivision(){
    /* This function does the same as the one above, except outside of parentheses. */
    for (let x = 0; x < chunk.length; x++){
        if (chunk[x] === "*"){
            neww = chunk[x-1]*chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = 0
        }else if (chunk[x] === "/"){
            neww = chunk[x-1]/chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = 0
        }
    }
}

function addSubPar(){
    /* This function "gets rid of any problems" surrounding addition and "subtraction". */
    for (let x = par[i][1]; x < par[i+1][1]; x++){
        if (chunk[x] === "+"){
            neww = chunk[x-1]+chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = par[i][1]
            updatePar()
        }else if (chunk[x] === "-"){
            neww = chunk[x-1]-chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = par[i][1]
            updatePar()
        }
    }
}

function addSub(){
    /* This function does the same as the one above, except outside of parentheses. */
    for (let x = 0; x < chunk.length; x++){
        if (chunk[x] === "+"){
            neww = chunk[x-1]+chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = 0
        }else if (chunk[x] === "-"){
            neww = chunk[x-1]-chunk[x+1]
            chunk.splice(x-1, 3, neww)
            x = 0
        }
    }
}

function chunky(){
    /* This function "separates" the string into shorter ints and strings to put in the chunk array. */
    for (let i = 0; i < str.length; i++){
        if (["+", "-", "(", ")", "*", "/", "^"].indexOf(str[i]) != -1){
            present = i
            if (["+", "-", "(", ")", "*", "/", "^"].indexOf(str.slice(last, present)) === -1 && last != present){
                chunk.push(parseInt(str.slice(last, present)))
            }
            chunk.push(str[i])
            console.log(i)
            last = present + 1
        }
    }
    present = str.length
    if (["+", "-", "(", ")", "*", "/", "^"].indexOf(str[present]) === -1 && last != present){
        chunk.push(parseInt(str.slice(last, present)))
    }
}



function handleOnClick(){
    str = document.getElementById("textInput1").value
    last = 0
    present = 0
    neww = 0
    chunk.splice(0, chunk.length)
    par.splice(0, par.length)
    chunky()
    updatePar()
    for (let i = 0; i < par.length; i++){
        if (par[i][0] === "(" && par[i+1][0] === ")"){
            powerOfPar()
            multiDivisionPar()
            addSubPar()
            updatePar()
            chunk.splice(par[i+1][1], 1)
            chunk.splice(par[i][1], 1)
            par.splice(i, 2)
            i = -1
        }
    }
    powerOf()
    multiDivision()
    addSub()
    document.getElementById("textInput2").value = chunk.toString()
}

