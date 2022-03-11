//
//
//
//
//https://www.youtube.com/watch?v=Qg2_VFFcAI8

//node command to upload: Terminal: node BulkUploader.js

var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "",
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  files.forEach(function (file) {
    var lastDotIndex = file.lastIndexOf(".");

    var menu = require("./files/" + file);

    console.log(menu);

    menu.forEach(function (obj) {
      firestore.collection(
        file
          .substring(0, lastDotIndex)
          .doc(obj.id_cate)
          .set(obj)
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (err) {
            console.error("Error adding document: ", err);
          })
      );
    });
  });
});
