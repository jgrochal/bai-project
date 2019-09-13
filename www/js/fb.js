// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA1VTH3WnVLguFzMudS14HXn37nk-Dh69E",
  authDomain: "projekt-bai.firebaseapp.com",
  databaseURL: "https://projekt-bai.firebaseio.com",
  projectId: "projekt-bai",
  storageBucket: "projekt-bai.appspot.com",
  messagingSenderId: "236592044371",
  appId: "1:236592044371:web:30117a478f018def1329a6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function emailRegister()
{
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(result =>
  {
    // Actions after registration
  })
}

function signOut()
{
    firebase.auth().signOut();
    window.location = 'index.html';
}

function emailLogin()
{
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(result =>
  {
    console.log(`Logged in ${result.user.uid}`);
    window.location = 'google-api.html';
  })
}

function testLogin()
{
  var email = "test@mail.il";
  var password = "tttttt";
  firebase.auth().signInWithEmailAndPassword(email, password).then(result =>
  {
    console.log(`Logged in ${result.user.uid}`);
    window.location = 'google-api.html';
  })
}

function googleLogin()
{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
        .then(function() { return firebase.auth().getRedirectResult(); })
        .then(function(result) 
        {
            var token = result.credential.accessToken; 
            var user = result.user;
            console.log(`Logged in ${user.uid}`);
        })
        .catch(function(error)
        { 
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

function twitterLogin(){
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider)
        .then(function() { return firebase.auth().getRedirectResult(); })
        .then(function(result) 
        {
            var token = result.credential.accessToken; 
            var user = result.user;
            console.log(`Logged in ${user.uid}`);
        })
        .catch(function(error)
        { 
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

function dummyFuncToCallSelectFromDb(){
    console.log(getRecordsFromDbByUid("bl1"));
}

function insertIntoDb(uid, latit, longt, link)
{
  const time = + new Date(); 
  const insert = { user: uid, latitude: latit, longitude: longt, image: link, timestamp: time };
  const db = firebase.firestore();
  var usersRef = db.collection("users");
  usersRef.add(insert);
}


function getRecordsFromDbByUid(uid){
  var queryResults = [];
  db.collection("users").where("user", "==", uid)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          queryResults.push(doc.data());
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  return queryResults;
}
