function listFiles(folderPath) {
    var folder = new Folder(folderPath);
    var files = folder.getFiles();
    var fileListHTML = "";

    if (files.length === 0) {
        fileListHTML = "<li>Aucun fichier trouvé</li>";
    } else {
        for (var i = 0; i < files.length; i++) {
            fileListHTML += "<li>" + files[i].name + "</li>";
        }
    }

    return fileListHTML;
}

// Assurez-vous que la fonction est accessible globalement
$.global.listFiles = listFiles;