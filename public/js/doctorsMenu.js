// public/js/doctorsMenu.js

// Get references to page elements
var medId = sessionStorage.getItem("id");
var medName = sessionStorage.getItem("name");

if ((medId === null) || (medName === null)) {
    window.location = "/";
}

$("#nombreMedico").empty();
$("#nombreMedico").append("Dr. " + medName);

//----------------------------------------------------------------------

// The API object contains methods for each kind of request we'll make
var API = {
  savePat: function(record) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/patients",
      data: JSON.stringify(record)
    });
  },
  getPat: function() {
    return $.ajax({
      url: "api/patients",
      type: "GET"
    });
  },
  deletePat: function(id) {
    return $.ajax({
      url: "api/patients/" + id,
      type: "DELETE"
    });
  }
};

//----------------------------------------------------------------------
//Submit, create reg, and clears form fields
var handleFormSubmit = function(event) {
  event.preventDefault();
  if (
    !$patFirstname.val().trim() ||
    !$patLastname.val().trim() ||
    !$patBirthdate.val().trim() ||
    !$patGender.val().trim() ||
    !$patEmail.val().trim() ||
    !$patPhone.val().trim()
  ) {
    swal({
      title: "Wait!",
      text: "Please fill all the fields with the requested information",
      icon: "error"
    });
    return;
  }
  var reg = {
    firstname: $patFirstname.val().trim(),
    lastname: $patLastname.val().trim(),
    birthdate: $patBirthdate.val().trim(),
    gender: $patGender.val().trim(),
    email: $patEmail.val().trim(),
    phone: $patPhone.val().trim()
  };

  API.savePat(reg).then(function() {
  });

  $patFirstname.val("");
  $patLastname.val("");
  $patBirthdate.val("");
  $patGender.val("");
  $patEmail.val("");
  $patPhone.val("");
};

//----------------------------------------------------------------------
//Log out
var processLogout = function() {
  sessionStorage.clear();
  window.location = "/";
};

//----------------------------------------------------------------------
// Add event listeners
$("#logoutBtn").on("click", processLogout);

$("#patientUlList").on("click", "#patientDetails", function(){
  var id = $(this).data("id");
  var name = $(this).data("name");
  sessionStorage.setItem("patientId", id);
  sessionStorage.setItem("patientName", name);
  window.location = "/patients/" + id;
});
