$(document).ready(function (){
    var config = {
        apiKey: 
        authDomain: "train-schedule-3e122.firebaseapp.com",
        databaseURL: "https://train-schedule-3e122.firebaseio.com",
        projectId: "train-schedule-3e122",
        storageBucket: "train-schedule-3e122.appspot.com",
        messagingSenderId: "125850147682"
    };
    firebase.initializeApp(config);

        var database = firebase.database();

        var clickCounter = 0;

        $("#submit").on("click", function() {
         //Take value from the input forms
         var trainName = $("#train-name").val().trim();
         var destination = $("#destination").val().trim();
         var time = $("#time").val().trim();
         var frequency = $("#frequency").val().trim();

         //Push to firebase
         database.ref().push ({
             trainName: trainName,
             destination: destination,
             time: time,
             frequency: frequency
            });
        var newRow = $("<tr>").append(trainName);
        });
})
