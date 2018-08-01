var proj = { "project_name_1":"Project 1", "id_1":1, "project_name_2":"Project 2", "id_2":2};
var count = 0;
for (x in proj) {
	count++;
}
count /= 2;
var str = "id";
var str2 = "project_name";
var val = "<button type = 'Submit' class = 'btn- btn-primary'>Edit</button>";
var str3 = "submit";
var i;
for ( i=0; i<count; i++){
	data1 = str.concat("_",(i+1).toString());
	document.getElementById(data1).innerHTML += proj["id"+"_"+(i+1).toString()];
	data2 = str2+"_"+(i+1).toString();
	data3 = str3.concat("_",(i+1).toString());
	document.getElementById(data2).innerHTML += proj["project_name"+"_"+(i+1).toString()];
	document.getElementById(data3).innerHTML = val;
}