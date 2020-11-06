$(document).ready(function() {

    // Affichage du mot de passe lors du click sur l'icone.
    $('#affichage-mdp, #affichage-mdp-inscription, #affichage-mdp-confirmation').on('mousedown', function() {
        // on change la valeur de l'attribut type du champ. Le fait de le passer en text permet l'affichage de la saisie
        // $('#mdp, #mdp-inscription, #mdp-confirmation').attr('type', 'text');

        // .parent() est un selecteur jquery permettant de récupérer l'element parent immédiat

        /*
        <div> <!-- ce div est le direct parent de la balise p -->
            <p>Test</p>
        </div>
        */

        // .next() est un selecteur jquery permettant de récupérer l'element html suivant au même niveau 
        /*
        <div id="depart"><div ></div></div>
        <div></div><!-- element .next() depuis le div id="depart" -->
        <div></div><!-- element .next().next() depuis le div id="depart" -->
        <div></div><!-- element .next().next().next() depuis le div id="depart" -->
        */
        $(this).parent().next().attr('type', 'text');


        // on change la classe de l'icone pour afficher un icone non barré
        $(this).attr('class', 'fas fa-eye');

        // exercice mettre en place un evenement "mouseup" pour remettre le type password et remettre l'icone initial
        
        $('body').on('mouseup', function() {
            $('#mdp, #mdp-inscription, #mdp-confirmation').attr('type', 'password');
            $("#affichage-mdp, #affichage-mdp-inscription, #affichage-mdp-confirmation").attr('class', 'fas fa-eye-slash');
        });      

    });

    /*
    $('#affichage-mdp').on('mouseleave', function() {
        $('#mdp').attr('type', 'password');
        $(this).attr('class', 'fas fa-eye-slash');
    });
    */

    /*
    $('#affichage-mdp').on('mouseup', function() {
        $('#mdp').attr('type', 'password');
        $(this).attr('class', 'fas fa-eye-slash');
    });
    */



    

    // Controle sur la validité des saisies du formulaire inscription.
    // on met en place un evenement sur la validation du formulaire afin de le  bloquer pour appliquer nos controles
    // un formulaire peut être validé de plusieurs façon (click sur le bouton, entrée dans un champ input ...), dans ce cas l'évènement qui couvre toutes ces actions : "submit"
    $('#modal-inscription form').on('submit', function (e) {
        // on bloque le submit
        e.preventDefault();

        // on vide les eventuels messages précédents
        $('#message').html('');

        // pour récupérer la valeur d'un champ de formulaire :
        // En natif : 
        var valeurPseudo = document.getElementById('pseudo-inscription').value;
        // avec jQuery
        let valPseudo = $('#pseudo-inscription').val();

        // la methode trim() permet d'enlever les espaces en début et en fin de chaine mais pas au milieu de chaine
        console.log(valPseudo);
        valPseudo = valPseudo.trim();
        console.log(valPseudo);

        // 1er controle : la pseudo doit avoir entre 4 et 14 caractères inclus, sinon message d'erreur pour l'utilisateur.
        let taillePseudo = valPseudo.length;
        console.log(taillePseudo);

        if(taillePseudo < 4 || taillePseudo > 14) {
            // cas d'erreur !
            // .append() permet de rajouter du contenu notamment html à l'élément sélectionné
            $('#message').append('<div class="alert alert-danger mb-3">Attention,<br>le pseudo doit avoir entre 4 et 14 caractères inclus !</div>');
        }

        // 2eme controle : on vérifie les saisies du mdp et de la confirmation du mdp
        // on récupère les valerus des deux champs.
        let valMdp = $('#mdp-inscription').val().trim();
        let valConfirmMdp = $('#mdp-confirmation').val().trim();

        if(valMdp != valConfirmMdp) {
            $('#message').append('<div class="alert alert-danger mb-3">Attention,<br>le mot de passe est différent de la confirmation du mot de passe, veuillez vérifier vos saisies !</div>');
        }

        // 3eme controle : on vérifie si le code postal fait 5 caractères et s'il n'y a que des chiffres.
        let valCp = $('#cp-inscription').val().trim();

        if(valCp.length != 5 || isNaN(valCp) || valCp.indexOf('.') != -1 || valCp.indexOf('+') != -1 || valCp.indexOf('-') != -1) {
            // si la taille de valCp est différente de 5 || si valCp n'est pas une valeur numérique || si le point d'un chiffre décimal est présent dans  la chaine
            $('#message').append('<div class="alert alert-danger mb-3">Attention,<br>le code postal doit avoir 5 caractères et doit contenir uniquement des chiffres !</div>');
        }




        // pour valider le formulaire .submit()
        // si le div id="message" est vide : alors il n'y a pas eu d'erreur, on valide le formulaire.
        let contenuMessage = $('#message').html();
        // if(contenuMessage == '') {}
        if(contenuMessage.length < 1) {
            // on valide le formulaire
            this.submit();
        }


    });



    // mise en place du calendrier sur le champ date de naissance via le plugin jQuery-ui Datepicker
    $('#naissance-inscription').datepicker();

    

    $.datepicker.regional['fr'] = {
        clearText: 'Effacer',
        closeText: 'Fermer', 
        prevText: '&lt;Préc', 
        nextText: 'Suiv&gt;', 
        monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
        'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
        'Jul','Aoû','Sep','Oct','Nov','Déc'],
        weekHeader: 'Sm', 
        dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
        dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
        dateFormat: 'dd/mm/yy', 
        firstDay: 1, 
        isRTL: false};
    $.datepicker.setDefaults($.datepicker.regional['fr']);

    


}); // END DOCUMENT READY