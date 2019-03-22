function draw(){
	switch (active_version) {
		case version_enum.VERSION_1:
			drawV1();
			break;
		case version_enum.VERSION_2:
			drawV2();
			break;
		case version_enum.VERSION_3:
			drawV3();
			break;
		default:
			drawV1();
	}
}