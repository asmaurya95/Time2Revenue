$(document).ready(function(){
  $("#Dis_plan_enddt").change(function () {
    var startDate = document.getElementById("Dis_plan_strdt").value;
    var endDate = document.getElementById("Dis_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dis_plan_enddt").value = '';
    }
    $("#Dis_comment").prop('required',true);
  });
  $("#Dis_plan_strdt").change(function () {
    var startDate = document.getElementById("Dis_plan_strdt").value;
    var endDate = document.getElementById("Dis_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dis_plan_strdt").value = '';
    }
    $("#Dis_comment").prop('required',true);
  });
  $("#Des_plan_enddt").change(function () {
    var startDate = document.getElementById("Des_plan_strdt").value;
    var endDate = document.getElementById("Des_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Des_plan_enddt").value = '';
    }
    $("#Des_comment").prop('required',true);
  });
  $("#Des_plan_strdt").change(function () {
    var startDate = document.getElementById("Des_plan_strdt").value;
    var endDate = document.getElementById("Des_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Des_plan_strdt").value = '';
    }
    $("#Des_comment").prop('required',true);
  });
  $("#Dev_plan_enddt").change(function () {
    var startDate = document.getElementById("Dev_plan_strdt").value;
    var endDate = document.getElementById("Dev_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dev_plan_enddt").value = '';
    }
    $("#Dev_comment").prop('required',true);
  });
  $("#Dev_plan_strdt").change(function () {
    var startDate = document.getElementById("Dev_plan_strdt").value;
    var endDate = document.getElementById("Dev_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dev_plan_strdt").value = '';
    }
    $("#Dev_comment").prop('required',true);
  });
  $("#env_plan_enddt").change(function () {
    var startDate = document.getElementById("env_plan_strdt").value;
    var endDate = document.getElementById("env_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("env_plan_enddt").value = '';
    }
    $("#env_comment").prop('required',true);
  });
  $("#env_plan_strdt").change(function () {
    var startDate = document.getElementById("env_plan_strdt").value;
    var endDate = document.getElementById("env_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("env_plan_strdt").value = '';
    }
    $("#env_comment").prop('required',true);
  });
  $("#golv_plan_enddt").change(function () {
    var startDate = document.getElementById("golv_plan_strdt").value;
    var endDate = document.getElementById("golv_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("golv_plan_enddt").value = '';
    }
    $("#golv_comment").prop('required',true);
  });
  $("#golv_plan_strdt").change(function () {
    var startDate = document.getElementById("golv_plan_strdt").value;
    var endDate = document.getElementById("golv_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("golv_plan_strdt").value = '';
    }
    $("#golv_comment").prop('required',true);
  });
  $("#tes_plan_enddt").change(function () {
    var startDate = document.getElementById("tes_plan_strdt").value;
    var endDate = document.getElementById("tes_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("tes_plan_enddt").value = '';
    }
    $("#tes_comment").prop('required',true);
  });
  $("#tes_plan_strdt").change(function () {
    var startDate = document.getElementById("tes_plan_strdt").value;
    var endDate = document.getElementById("tes_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("tes_plan_strdt").value = '';
    }
    $("#tes_comment").prop('required',true);
  });
});
