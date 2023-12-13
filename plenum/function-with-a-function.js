function functioWithFunctionParameter(functionParameter){
    console.log(functionParameter());
}

function anotherFunction(){
    return "Hallo Welt";
}

functioWithFunctionParameter(anotherFunction);