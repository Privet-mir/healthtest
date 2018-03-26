// import libraries which we need
require('./login');
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import ethjsabi from 'ethjs-abi';

// Import our contract artifacts and turn them into usable abstractions.
import patient_artifacts from '../../build/contracts/Patient.json'
import condition_artifacts from '../../build/contracts/Condition.json'

// Patient is our usable abstraction, which we'll use through the code below.
var Patient = contract(patient_artifacts);
var Condition = contract(condition_artifacts);

var accounts, account, loginAccount;
var myPatientInstance;
var myConditionInstance;
var password, uaddress;


// Initialize
function initializePatient() {
  console.log("initializing patient...");
  console.log("Unlocking account..");

        web3.personal.unlockAccount(uaddress, password);
        Patient.setProvider(web3.currentProvider);
        console.log(uaddress);
        Patient.new({from:  uaddress, gas: 4712386}).then(
        function(patient) {
                console.log(patient);
                myPatientInstance = patient;
                console.log("Patient contract address...." + myPatientInstance.address);
                $("#patientContractAddress").html("Patient at: " + myPatientInstance.address);

        });

        console.log("Complete");
      }


// // Update Patient
function updatePatient(name, dob, gender, condition) {

console.log("Updating patient...");
console.log("update patinet - unlock account....");
//web3.personal.unlockAccount( uaddress,password);

console.log("Updating patient");

myPatientInstance.setPatient(name, dob, gender, condition, condition, {from:  uaddress, gas: 4712387}).then(
                        function(){
              $("#updatePatientResult").html("Patient updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
//      myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
//              function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//              function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//                      function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//              })
//              });
}

// // Update Patient Name
function updatePatientName(name) {

console.log("Updating patient name...");
console.log("update patinet name- unlock account....");
//web3.personal.unlockAccount( uaddress, password );

myPatientInstance.setName(name, {from:  uaddress, gas: 4712387}).then(
                        function(){
              $("#updatePatientResult").html("Patient name updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
//      myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
//              function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//              function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//                      function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//              })
//              });
}

// // Update Patient DOB
function updatePatientDOB(dob) {

console.log("Updating patient dob...");
console.log("update patient dob - unlock account....");
//web3.personal.unlockAccount( uaddress,password);


myPatientInstance.setDateOfBirth(dob, {from:  uaddress, gas: 4712387}).then(
                        function(){
              $("#updatePatientResult").html("Patient DOB updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
//      myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
//              function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//              function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//                      function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//              })
//              });
}

// // Update Patient Gender
function updatePatientGender(gender) {

console.log("Updating patient gender...");
console.log("update patient gender - unlock account....");
//web3.personal.unlockAccount( uaddress, password);



myPatientInstance.setGender(gender, {from:  uaddress, gas: 4712387}).then(
                        function(){
              $("#updatePatientResult").html("Patient gender updated successfully");

              getPatientChangeEventLog();
            }

          );


}

// // Update Patient Condition
function updatePatientCondition(condition) {

console.log("Updating patient condition...");
console.log("update patient condition - unlock account....");
//web3.personal.unlockAccount( uaddress,password);



myPatientInstance.addCondition(condition, condition, {from:  uaddress, gas: 4712387}).then(
                        function(){
              $("#updatePatientResult").html("Patient condition updated successfully");

              getPatientChangeEventLog();
            }

          );


}

// Read audit log
function getPatientChangeEventLog(){

//   var patientChangedEventAll = myPatientInstance.PatientChanged({},
//     {address:myPatientInstance.address
//     ,fromBlock: 0, toBlock: 'latest'});
// patientChangedEventAll.get(function(err, logs) {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   logs.forEach(function(log) {

//     console.log("Key="+ log.args.key + " Value="+ log.args.value);


//   }
//   patientChangedEventAll.stopWatching();
//   append details of result.args to UI
// });



  var logFilter = web3.eth.filter({address:myPatientInstance.address
    , fromBlock:0});
   logFilter.get(function(error, result){
    if(!error){
      console.log("Patient chnage event: " + result);

      var patientLogTable = $("#patientLog");
      var patientLogHtml = "<tr><th>Event</th><th>Name</th><th>DOB</th><th>Gender</th><th>Conditions</th><th>Block #</th></tr>";
      result.forEach(function(e) {
        var abi = patient_artifacts.abi;
        var data = ethjsabi.decodeEvent(abi[9], e.data);
        //console.log(data);
        console.log("Decode Data: " + data[0]);

        var pi = web3.eth.contract(abi).at(e.address);

        console.log("Name=" + pi.name.call(e.blockNumber));
        console.log("dateOfBirth=" + pi.dateOfBirth.call(e.blockNumber));
        console.log("gender=" + pi.gender.call(e.blockNumber));

        var name = pi.name.call(e.blockNumber);
        var dob = pi.dateOfBirth.call(e.blockNumber);
        var gender = pi.gender.call(e.blockNumber);
        var conditions = pi.getCondition.call(e.blockNumber);

        var formatedConditions = formatConditions(conditions);

        patientLogHtml = patientLogHtml + "<tr><td>" + data[0] + "</td><td>" + name + "</td><td>" + dob + "</td><td>" + gender + "</td><td>" + formatedConditions + "</td><td>" + e.blockNumber + "</td></tr>";

        // web3.eth.getBlock(e.blockNumber, function(err, block) {
          // myPatientInstance.name(e.blockNumber, function(err,name) {
            // myPatientInstance.dateOfBirth(e.blockNumber, function(err,dateOfBirth) {
              // myPatientInstance.gender(e.blockNumber, function(err,gender) {
        //         // Add an object with all the data so it can be displayed
                //console.log("Name: " + name);
                 //console.log("DOB: " + dateOfBirth);
                 //console.log("gender: " + gender);
        
       //        });
         //    });
          // });
          // });
      }
    );

    patientLogTable.html(patientLogHtml);
    }
  });


}

function formatConditions(conditions){

  var conditionAbi = condition_artifacts.abi;
  var formatedConditions = "";
  for (var i = 0; i < conditions.length; i++) {

  if(conditions[i] != null && conditions[i] != ""){
    var ci = web3.eth.contract(conditionAbi).at(conditions[i]);
    formatedConditions = formatedConditions + ci.desc();
  }

  }

  return formatedConditions;
}

window.onload = function() {

 console.log("window onload...");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://35.172.246.166:8545"));
 // window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

    web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
   // account = accounts[0];
console.log(uaddress);
var x = document.getElementById("divlogin");
var xmain = document.getElementById("divmain");
   if(typeof uaddress !== 'undefined'){     
     console.log("login"); 
       x.style.display = "none";
       xmain.style.display = "block";
   }
   else{
    console.log(" Not login");
    x.style.display = "block";
    xmain.style.display = "none";
   }
    console.log("accounts : " + accounts);

  });

        // Wire up the UI elements


  $("#updatePatient").click(function() {
                var name = $("#patientName").val();
                var dob = $("#patientDOB").val();
    var gender = $("#patientGender").val();
    var condition = $("#patientCondition").val();
                updatePatient(name, dob, gender, condition);
        });

  $("#updatePatientName").click(function() {

    var name = $("#patientName").val();
                updatePatientName(name);
        });

  $("#updatePatientDOB").click(function() {
                var dob = $("#patientDOB").val();

                updatePatientDOB(dob);

    });

  $("#updatePatientGender").click(function() {

    var gender = $("#patientGender").val();

                updatePatientGender(gender);
        });

  $("#updatePatientCondition").click(function() {

    var condition = $("#patientCondition").val();
                updatePatientCondition(condition);
        });

  $("#btnlogin").click(function() {

   login();

});

function login(){
  password = $("#txtpass").val();
  uaddress = $("#txtaddress").val();
   console.log(uaddress + " | " + password);
try{

      var acco =  web3.personal.unlockAccount(uaddress, password);
      if(acco){
              console.log("Loged in" + acco);
               initializePatient();

              alert("Login success!");
              var x = document.getElementById("divlogin");
              var xmain = document.getElementById("divmain");
          if (x.style.display == "none") {
               x.style.display = "block";
          } else {
               x.style.display = "none";
                xmain.style.display = "block";
       }
       }
     }
      catch(err)
      {
        console.log("Login fail " + err);
        alert("Login fail, please try again!");

      }
}
};
