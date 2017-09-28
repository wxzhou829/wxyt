function switchNav3(){
	var nav = document.getElementById("nav-ul");
	var bar = document.getElementById("nav-cx");

	for (var i = 0; i < nav.children.length; i++) {	
		var elm = nav.children[i];
		if(elm.className === 'active'){
			elm.className = 'inactive';
		} 
	}
	bar.className = 'active';	
}
switchNav3();