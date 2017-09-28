function switchNav(){
	var nav = document.getElementById("nav-ul");
	var sbwx = document.getElementById("nav-sbwx");

	for (var i = 0; i < nav.children.length; i++) {	
		var elm = nav.children[i];
		if(elm.className === 'active'){
			elm.className = 'inactive';
		} 
	}
	sbwx.className = 'active';	
}
switchNav();