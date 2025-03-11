document.addEventListener("DOMContentLoaded", function () {
    var csInterface = new CSInterface();

    csInterface.evalScript('$.writeln("Script chargé dans main.js")');

    var selectButton = document.getElementById("selectFolderButton");
    var refreshButton = document.getElementById("refreshButton");
    var fileInput = document.getElementById("fileInput");
    var folderPathElement = document.getElementById("folderPath");

    // Fonction pour lister les fichiers d'un dossier
    function listFiles(folderPath) {
        var script = `
            function listFiles(folderPath) {
                var folder = new Folder(folderPath);
                var files = folder.getFiles();
                var fileListHTML = "";

                if (files.length === 0) {
                    fileListHTML = "<li>Aucun fichier trouvé</li>";
                } else {
                    for (var i = 0; i < files.length; i++) {
                        var fileName = decodeURIComponent(files[i].name);
                        var filePath = folderPath + "/" + fileName;
                        fileListHTML += '<li><a href="#" onclick="window.executeScript(\\'' + filePath.replace(/\\\\/g, '\\\\\\\\') + '\\')" class="file-link">' + fileName + '</a></li>';
                    }
                }

                return fileListHTML;
            }
            listFiles("${folderPath.replace(/\\/g, '\\\\')}");
        `;

        csInterface.evalScript(script, function (result) {
            var fileList = document.getElementById("fileList");
            fileList.innerHTML = result;
            folderPathElement.textContent = folderPath;
        });
    }

    // Fonction pour exécuter un script
    window.executeScript = function(filePath) {
        var script = '$.evalFile("' + filePath.replace(/\\/g, '\\\\') + '")';
        csInterface.evalScript(script);
    };

    // Appeler la fonction pour lister les fichiers du dossier local au chargement
    var localFolderPath = "C:\\Users\\plans\\Documents\\SCRIPTS SAI";
    listFiles(localFolderPath);

    if (selectButton && fileInput) {
        csInterface.evalScript('$.writeln("Bouton et input trouvés")');
        selectButton.addEventListener("click", function () {
            console.log("Clic sur Charger le dossier détecté (console JS)");
            csInterface.evalScript('$.writeln("Clic sur Charger le dossier détecté (ExtendScript)")');

            // Déclencher la sélection de fichier/dossier
            fileInput.click();
        });

        fileInput.addEventListener("change", function () {
            var files = fileInput.files;
            if (files.length > 0) {
                var folderPath = files[0].webkitRelativePath.split("/")[0];

                csInterface.evalScript('$.writeln("Chemin détecté : ' + folderPath + '")');
                if (folderPath) {
                    listFiles(folderPath);
                } else {
                    document.getElementById("fileList").innerHTML = "<li>Aucun dossier sélectionné</li>";
                }
            }
        });
    } else {
        csInterface.evalScript('$.writeln("Erreur : Bouton ou input non trouvé")');
    }

    // Ajouter l'événement d'actualisation
    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            console.log("Clic sur Actualiser détecté (console JS)");
            csInterface.evalScript('$.writeln("Clic sur Actualiser détecté (ExtendScript)")');
            listFiles(localFolderPath);
        });
    }
});