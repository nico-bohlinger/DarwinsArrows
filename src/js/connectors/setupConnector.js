function setup(){
	switch (active_version) {
		case version_enum.VERSION_1:
			setupV1();
			break;
		case version_enum.VERSION_2:
			break;
		case version_enum.VERSION_3:
			break;
		default:
			setupV1();
	}
}