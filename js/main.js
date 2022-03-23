function updateYear() {
    var current = new Date().getFullYear();
    var start = 2019;
    return current - start
}

document.getElementById("workingYear").innerHTML = updateYear();