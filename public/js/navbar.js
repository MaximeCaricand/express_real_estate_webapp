function findPropertyByTitle() {
    let searchObj = [{ id: 1, title: "MAISON DE FOU" },
    { id: 2, title: "PETIT APPARTEMENT" },
    { id: 3, title: "GROSSE BARAQUE" },
    { id: 4, title: "MANOIR" },
    { id: 5, title: "EL PALACO" }];


    let titre = document.getElementById('inputsearch').value;

    for (let n = 0; n < searchObj.length; n++) {
        if (searchObj[n].title.toUpperCase() === titre.toUpperCase()) {
            location.href = '/content/detail?id=' + searchObj[n].id;
        }
    }

    alert("No properties ads corresponds to the requested content !\n\n'" + titre + "'");
    document.getElementById('inputsearch').value = "";
}