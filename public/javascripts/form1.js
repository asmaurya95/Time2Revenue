$(document).ready(function(){
  $("#Dis_plan_enddt").change(function () {
    var startDate = document.getElementById("Dis_plan_strdt").value;
    var endDate = document.getElementById("Dis_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dis_plan_enddt").value = '';
    }
    $("#Dis_plan_strdt").prop('required',true);
  });

  $("#Dis_act_enddt").change(function () {
    var startDate = document.getElementById("Dis_act_strdt").value;
    var endDate = document.getElementById("Dis_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dis_act_enddt").value = '';
    }
    $("#Dis_act_strdt").prop('required',true);
  });

  $("#Dis_plan_strdt").change(function () {
    var startDate = document.getElementById("Dis_plan_strdt").value;
    var endDate = document.getElementById("Dis_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dis_plan_strdt").value = '';
    }
    else{
    $("#Dis_plan_enddt").prop('required',true);
    $("#Dis_act_strdt").prop('required',true);
    $("#Dis_act_enddt").prop('required',true);
  }
  });

  $("#Dis_act_strdt").change(function () {
    var startDate = document.getElementById("Dis_act_strdt").value;
    var endDate = document.getElementById("Dis_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dis_act_strdt").value = '';
    }
    $("#Dis_act_enddt").prop('required',true);
  });

  $("#Des_plan_enddt").change(function () {
    var startDate = document.getElementById("Des_plan_strdt").value;
    var endDate = document.getElementById("Des_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Des_plan_enddt").value = '';
    }
    $("#Des_plan_strdt").prop('required',true);
  });

  $("#Des_act_enddt").change(function () {
    var startDate = document.getElementById("Des_act_strdt").value;
    var endDate = document.getElementById("Des_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Des_act_enddt").value = '';
    }
    $("#Des_act_strdt").prop('required',true);
  });

  $("#Des_plan_strdt").change(function () {
    var startDate = document.getElementById("Des_plan_strdt").value;
    var endDate = document.getElementById("Des_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Des_plan_strdt").value = '';
    }
    else{
    $("#Des_plan_enddt").prop('required',true);
    $("#Des_act_strdt").prop('required',true);
    $("#Des_act_enddt").prop('required',true);
    }
  });

  $("#Des_act_strdt").change(function () {
    var startDate = document.getElementById("Des_act_strdt").value;
    var endDate = document.getElementById("Des_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Des_act_strdt").value = '';
    }
    $("#Des_act_enddt").prop('required',true);
  });

  $("#Dev_plan_enddt").change(function () {
    var startDate = document.getElementById("Dev_plan_strdt").value;
    var endDate = document.getElementById("Dev_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dev_plan_enddt").value = '';
    }
    $("#Dev_plan_strdt").prop('required',true);
  });

  $("#Dev_act_enddt").change(function () {
    var startDate = document.getElementById("Dev_act_strdt").value;
    var endDate = document.getElementById("Dev_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dev_act_enddt").value = '';
    }
    $("#Dev_act_strdt").prop('required',true);
  });

  $("#Dev_plan_strdt").change(function () {
    var startDate = document.getElementById("Dev_plan_strdt").value;
    var endDate = document.getElementById("Dev_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dev_plan_strdt").value = '';
    }
    else{
    $("#Dev_plan_enddt").prop('required',true);
    $("#Dev_act_enddt").prop('required',true);
    $("#Dev_act_strdt").prop('required',true);
  }
  });

  $("#Dev_act_strdt").change(function () {
    var startDate = document.getElementById("Dev_act_strdt").value;
    var endDate = document.getElementById("Dev_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("Dev_act_strdt").value = '';
    }
    $("#Dev_act_enddt").prop('required',true);
  });


  $("#env_plan_enddt").change(function () {
    var startDate = document.getElementById("env_plan_strdt").value;
    var endDate = document.getElementById("env_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("env_plan_enddt").value = '';
    }
  });

  $("#env_act_enddt").change(function () {
    var startDate = document.getElementById("env_act_strdt").value;
    var endDate = document.getElementById("env_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("env_act_enddt").value = '';
    }
    $("#env_act_strdt").prop('required',true);
  });


  $("#env_plan_strdt").change(function () {
    var startDate = document.getElementById("env_plan_strdt").value;
    var endDate = document.getElementById("env_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("env_plan_strdt").value = '';
    }
    else{
    $("#env_plan_enddt").prop('required',true);
    $("#env_act_strdt").prop('required',true);
    $("#env_act_enddt").prop('required',true);
  }
  });

  $("#env_act_strdt").change(function () {
    var startDate = document.getElementById("env_act_strdt").value;
    var endDate = document.getElementById("env_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("env_act_strdt").value = '';
    }
    $("#env_act_enddt").prop('required',true);
  });


  $("#golv_plan_enddt").change(function () {
    var startDate = document.getElementById("golv_plan_strdt").value;
    var endDate = document.getElementById("golv_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("golv_plan_enddt").value = '';
    }
    $("#golv_plan_strdt").prop('required',true);
  });

  $("#golv_act_enddt").change(function () {
    var startDate = document.getElementById("golv_act_strdt").value;
    var endDate = document.getElementById("golv_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("golv_act_enddt").value = '';
    }
    $("#golv_act_strdt").prop('required',true);
  });


  $("#golv_plan_strdt").change(function () {
    var startDate = document.getElementById("golv_plan_strdt").value;
    var endDate = document.getElementById("golv_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("golv_plan_strdt").value = '';
    }
    else{
    $("#golv_plan_enddt").prop('required',true);
    $("#golv_act_strdt").prop('required',true);
    $("#golv_act_enddt").prop('required',true);
    }
  });

  $("#golv_act_strdt").change(function () {
    var startDate = document.getElementById("golv_act_strdt").value;
    var endDate = document.getElementById("golv_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("golv_act_strdt").value = '';
    }
    $("#golv_act_enddt").prop('required',true);
  });


  $("#tes_plan_enddt").change(function () {
    var startDate = document.getElementById("tes_plan_strdt").value;
    var endDate = document.getElementById("tes_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("tes_plan_enddt").value = '';
    }
    $("#tes_plan_strdt").prop('required',true);
  });

  $("#tes_act_enddt").change(function () {
    var startDate = document.getElementById("tes_act_strdt").value;
    var endDate = document.getElementById("tes_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("tes_act_enddt").value = '';
    }
    $("#tes_act_strdt").prop('required',true);
  });


  $("#tes_plan_strdt").change(function () {
    var startDate = document.getElementById("tes_plan_strdt").value;
    var endDate = document.getElementById("tes_plan_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("tes_plan_strdt").value = '';
    }
    {
    $("#tes_plan_enddt").prop('required',true);
    $("#tes_act_strdt").prop('required',true);
    $("#tes_act_enddt").prop('required',true);
  }
  });

  $("#tes_act_strdt").change(function () {
    var startDate = document.getElementById("tes_act_strdt").value;
    var endDate = document.getElementById("tes_act_enddt").value;
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("tes_act_strdt").value = '';
    }
    $("#tes_act_enddt").prop('required',true);
  });

});
