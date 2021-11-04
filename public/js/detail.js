function switchImage(newImage) {
    document.getElementById("myImageView").src = newImage;
}

function textarea_height(minHeight) {
    let textareaDescript = document.getElementById('description');
    let textareaRows = textareaDescript.value.split("\n");

    if (textareaRows.length > 0 && textareaRows.length > minHeight)
        nbLignes = textareaRows.length;
    else
        nbLignes = minHeight;

    alert(nbLignes);
    document.getElementById('description').rows = nbLignes;
}