var config = {
    apiKey: "AIzaSyBcphVcqqH9lJ9-dlFMyawZxRusktb2ROk",
    authDomain: "train-schedule-9287c.firebaseapp.com",
    databaseURL: "https://train-schedule-9287c.firebaseio.com",
    projectId: "train-schedule-9287c",
    storageBucket: "train-schedule-9287c.appspot.com",
    messagingSenderId: "680469970880"
};

firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var train = "";
var destination = "";
var firstTrain = 0;
var frequency = "";
// var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);
// var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);
// var tRemainder = diffTime % frequency;
//     console.log(tRemainder);
// var tMinutesTillTrain = frequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
$("#add-train").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text-boxes
    train = $("#train-Input").val().trim();
    destination = $("#destination-Input").val().trim();
    firstTrain = $("#firstTrain-Input").val().trim();
    frequency = $("#frequency-Input").val().trim();

    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,

        // minutesUntil: tMinutesTillTrain,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("#train-Input").val("");
    $("#destination-Input").val("");
    $("#firstTrain-Input").val("");
    $("#frequency-Input").val("");
});


database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().train);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Change the HTML to reflect
    $("#trainTable > tbody").append(
        $("<tr>").append(
            $("<td>").text(snapshot.val().train),
            $("<td>").text(snapshot.val().destination),
            $("<td>").text(snapshot.val().frequency),
            $("<td>").text(nextTrain.format("hh:mm")),
            $("<td>").text(tMinutesTillTrain)

        )
    )
},

    // function (errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
);
