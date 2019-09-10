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
  function emailRegister(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(result =>
    {
      // Actions after registration
    })
  }

  function emailLogin(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(result =>
    {
      // Actions after login - go to map?
      // document.body.append(`Logged in ${result.user.uid}`);
    })
  }


