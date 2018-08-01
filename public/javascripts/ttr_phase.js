$("#data").click(function(){

	var selectedNode = document.getElementById("data").value;
    //selectedNode = elem.options[elem.selectedIndex];

	if (selectedNode === "select"){


			$("#disc_phase").hide();
			$("#des_phase").hide();
			$("#env_phase").hide();
			$("#dev_phase").hide();
			$("#test_phase").hide();
			$("#golv_phase").hide();


	}


	if (selectedNode === "disc_phase"){


		$("#disc_phase").show();
		$("#des_phase").hide();
		$("#env_phase").hide();
		$("#dev_phase").hide();
		$("#test_phase").hide();
		$("#golv_phase").hide();


	}
	if (selectedNode === "des_phase"){

		$("#disc_phase").hide();
		$("#des_phase").show();
		$("#env_phase").hide();
		$("#dev_phase").hide();
		$("#test_phase").hide();
		$("#golv_phase").hide();
	}
	if (selectedNode === "env_phase"){

		$("#disc_phase").hide();
		$("#des_phase").hide();
		$("#env_phase").show();
		$("#dev_phase").hide();
		$("#test_phase").hide();
		$("#golv_phase").hide();
	}
	if (selectedNode === "dev_phase"){

		$("#disc_phase").hide();
		$("#des_phase").hide();
		$("#env_phase").hide();
		$("#dev_phase").show();
		$("#test_phase").hide();
		$("#golv_phase").hide();
	}
	if (selectedNode === "test_phase"){

		$("#disc_phase").hide();
		$("#des_phase").hide();
		$("#env_phase").hide();
		$("#dev_phase").hide();
		$("#test_phase").show();
		$("#golv_phase").hide();
	}
	if (selectedNode === "golv_phase"){

		$("#disc_phase").hide();
		$("#des_phase").hide();
		$("#env_phase").hide();
		$("#dev_phase").hide();
		$("#test_phase").hide();
		$("#golv_phase").show();
	}

});
