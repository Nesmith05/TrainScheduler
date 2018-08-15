$(document).ready(function (){
    var config = {
        apiKey: "AIzaSyDl3XCHlx2IOKkZIXEGZ3k9mJ6R5QB7HYk",
        authDomain: "train-schedule-3e122.firebaseapp.com",
        databaseURL: "https://train-schedule-3e122.firebaseio.com",
        projectId: "train-schedule-3e122",
        storageBucket: "train-schedule-3e122.appspot.com",
        messagingSenderId: "125850147682"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    $("#submit").on("click", function() {
        event.preventDefault();
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
    });

    
    database.ref().on("child_added", function(childSnapshot){
        var newtrainName = childSnapshot.val().trainName;
        var newDestination = childSnapshot.val().destination;
        var  newTime = childSnapshot.val().time;
        var newFreq = childSnapshot.val().frequency;

        //////////////////////////////Time///////////////////////////////
                
       var firstTimeConverted = moment(newTime, "HH:mm").subtract(1, "years");
           console.log(firstTimeConverted);
        //current time   
        var currentTime = moment();
        console.log("It is " + currentTime);

        //calculates the difference between the times
        var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
        //calculates time apart
        var remainder = timeDifference % newFreq;
        //minutes till next train
        var tMinutesTillTrain = newFreq - remainder;
        //next train arrival
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var upTrain = moment(nextTrain).format("HH:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
//Will display on the table-body
        $("#table-body").append("<tr><td>" + newtrainName + "<td>" + newDestination + "<td>" + newFreq + "<td>" + upTrain + "<td>" + tMinutesTillTrain + "<td><tr>");

        //clear input forms
        $("#train-name", "#destination", "#time", "#frequency").val(" ");
        // return false;
        

    })

        


        
});
