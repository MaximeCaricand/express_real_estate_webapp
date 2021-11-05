//This function is used to change the source of an image after an onclick
function switchImage(newImage) {
    document.getElementById("myImageView").src = newImage;
}

//This function is used to register a new question for an ad
//idProperty : the id of the ad, for which the question is added
function askQuestion(idProperty) {
    alert(idProperty + " askQuestion : " + document.getElementById('askQuestion').value);
    //Maxime, faut ajouter le commentaire dans la base
    

    location = location;
}

//This function is used to record a new answer for a question in an ad
//idProperty : the id of the ad, for which the answer is added
//indQuestion: the index of the question, which is answered
function ansQuestion(idProperty, indQuestion) {
    alert(idProperty + " ansQuestion : " + document.getElementById('ansQuestion').value + " q°" + indQuestion);
    //Maxime, faut ajouter la réponse dans la base
    

    location = location;
}