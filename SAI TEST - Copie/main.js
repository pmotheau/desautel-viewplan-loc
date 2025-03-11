document.addEventListener("DOMContentLoaded", function() {
    var csInterface = new CSInterface();

    csInterface.evalScript('$.writeln("Script chargé dans main.js")');

    var selectButton = document.getElementById("selectFolderButton");
    var fileInput = document.getElementById("fileInput");

    if (selectButton && fileInput) {
        csInterface.evalScript('$.writeln("Bouton et input trouvés")');
        selectButton.addEventListener("click", function() {
            console.log("Clic sur Charger le dossier détecté (console JS)");
            csInterface.evalScript('$.writeln("Clic sur Charger le dossier détecté (ExtendScript)")');

            // Déclencher la sélection de fichier/dossier
            fileInput.click();
        });

        fileInput.addEventListener("change", function() {
            var files = fileInput.files;
            if (files.length > 0) {
                var folderPath = files[0].webkitRelativePath.split("/")[0];

                csInterface.evalScript('$.writeln("Chemin détecté : ' + folderPath + '")');
                if (folderPath) {
                    csInterface.evalScript('listFiles("' + folderPath + '")', function(result) {
                        var fileList = document.getElementById("fileList");
                        fileList.innerHTML = result;
                    });
                } else {
                    document.getElementById("fileList").innerHTML = "<li>Aucun dossier sélectionné</li>";
                }
            }
        });
    } else {
        csInterface.evalScript('$.writeln("Erreur : Bouton ou input non trouvé")');
    }
});