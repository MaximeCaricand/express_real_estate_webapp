var express = require('express');
const { adService, grantAccess } = require('../lib/index');
var router = express.Router();

/* Redirect home page. */
router.get('/', function (req, res, next) {
    res.redirect('/content');
});

/* GET home page. */
router.get('/content', function (req, res, next) {
    res.render('pages/index', { user: req.user });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

/* GET all ads page. */
router.get('/content/all', function (req, res, next) {
    obj = ads.filter(ad => ad.published === "true");
    res.render('pages/index', { page: 'ads', user: req.user, params: { obj } });
});

/* GET sold ads page. */
router.get('/content/sale', function (req, res, next) {
    obj = ads.filter(ad => ad.published === "true").filter(ad => ad.type === typeVendre);
    res.render('pages/index', { page: 'ads', user: req.user, params: { obj } });
});

/* GET location ads page. */
router.get('/content/rent', function (req, res, next) {
    obj = ads.filter(ad => ad.published === "true").filter(ad => ad.type === typeLouer);
    res.render('pages/index', { page: 'ads', user: req.user, params: { obj } });
});

/* GET details ads page. */
router.get('/content/detail', function (req, res, next) {
    ad = ads.filter(ad => "" + ad.id === req.query.id)[0];
    res.render('pages/index', { page: 'detail', user: req.user, params: { ad } });
});

// content routes
router.get('/content/create', grantAccess(true), function (req, res, next) {
    res.render('pages/index', { page: 'create', user: req.user, params: {} });
});

router.post('/content/create', grantAccess(true), async function (req, res, next) {
    await adService.createAd(req.body, [...req.files.images]);
    res.redirect('/');
});

module.exports = router;


var typeVendre = "A VENDRE"
var typeLouer = "A LOUER"

ads = [{ id: 1, title: "MAISON DE FOU", type: typeVendre, price: "125 000€", published: "true", status: "DISPONIBLE", starting: "03/11/2021", src_images: ["images/maison_de_fou_1.jpg", "images/maison_de_fou_2.jpg", "images/maison_de_fou_3.jpg"], description: "description 1" },
{ id: 2, title: "PETIT APPARTEMENT", type: typeLouer, price: "820€ / mois", published: "true", status: "LOUÉ", starting: "14/08/2019", src_images: ["images/petit_appartement.jpg"], description: "description 2" },
{ id: 3, title: "GROSSE BARAQUE", type: typeLouer, price: "2 390€ / mois", published: "true", status: "DISPONIBLE", starting: "November 24th, 1998", src_images: ["images/grosse_baraque_1.jpeg", "images/grosse_baraque_2.jpeg", "images/grosse_baraque_3.jpeg", "images/grosse_baraque_4.jpeg", "images/grosse_baraque_5.jpeg", "images/grosse_baraque_6.jpeg"], description: "description 3" },
{ id: 4, title: "MANOIR", type: typeVendre, price: "1 490 000€", published: "true", status: "VENDU", starting: "06-06-2487", description: "description 4" },
{
    id: 5, title: "EL PALACO", type: typeVendre, price: "5 732 000€", published: "true", status: "DISPONIBLE", starting: "27-02-1999", src_images: ["images/palace_1.jpg", "images/palace_2.jpg"],
    description: "Tavira - Villa typique 'algarvia' 4 chambres, jardin-piscine, nature - Orpi Olhão - Faro - Algarve - Portugal\n" +
        "Localisée dans les collines de l'arrière-pays de Tavira, cette charmante villa d'architecture traditionnelle vous séduira pour son calme, ses espaces extérieurs et sa magnifique vue sur l'océan.\n" +
        "\n" + "\n" +
        "Intégrée dans un petit hameau le voisinage est discret et rassurant.\n" +
        "Construite en 2005 et rafraichie il y a deux ans, elle est composée d'une bâtisse principale avec piscine et d'une annexe pour vos hôtes.\n" +
        "La maison principale est composée d'une salle avec cheminée et ouverte sur l'extérieur.\n" +
        "Une mezzanine vous permet d'aménager un bureau, bibliothèque, salle de jeux ou un couchage selon votre choix.\n" +
        "La cuisine spacieuse, équipée et aménagée est ouverte sur une terrasse. Elle donne aussi accès à une buanderie avec salle de bain.\n" +
        "La suite principale avec salle de bain et dressing bénéficie elle aussi d'un accès direct au jardin et à la piscine.\n" +
        "Une chambre et un toilette indépendant viennent compléter votre confort.\n" +
        "Les magnifiques vues sur les collines voisines et l'océan sont présentes quel que soit l'espace dans laquelle vous vous trouvez.\n" +
        "L'annexe est idéale pour recevoir de la famille, des amis ou pour être louée. Elle combine parfaitement proximité et discrétion.\n" +
        "Elle se compose d'un studio avec une suite salle de bain, une cuisine équipée et aménagée. Vous bénéficiez aussi d'une seconde suite indépendante avec salle de bain.\n" +
        "Une agréable terrasse vous permet de profiter des extérieurs.\n" +
        "Le domaine est paysagé et entretenu avec goût. Il bénéficie une zone détentes autour de la piscine, de jardins, mais aussi de divers fruitiers en limite basse du terrain.\n" +
        "Un atelier vous permet de stocker vos outils, matériel de bricolages, matériel de sport, etc.\n" +
        "Les prestations sont nombreuses :\n" +
        "Système de chauffe-eau avec panneaux solaire (domestique et piscine), climatisations réversible, alarme, arrosage en goute à goute, filtration piscine au sel, forage avec unité de traitement eau potable, etc\n" +
        "Un véritable coup de cœur, les photos parlent d'elles même.\n" +
        "Idéale pour ceux en recherche de tranquillité et nature à 10 minutes de toutes commodités.\n" +
        "Vous êtes à courte distance des plages, golfs, circuits randonnés vtt ou pédestre.\n" +
        "L'aéroport de Faro est à 40 minutes.\n" + "Contacter Xavier pour vos visites.\n" +
        "Performance Énergétique: C\n" +
        "\n" +
        "\n" +
        "#ref:ORPI-MA223 "
}];
