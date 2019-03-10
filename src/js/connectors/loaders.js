function loadVersion1(){
	if(active_version === version_enum.VERSION_1) return;
	active_version = version_enum.VERSION_1;
	setup();
}

function loadVersion2(){
	if(active_version === version_enum.VERSION_2) return;
	active_version = version_enum.VERSION_2;
	setup();
}

function loadVersion3(){
	if(active_version === version_enum.VERSION_3) return;
	active_version = version_enum.VERSION_3;
	setup();
}