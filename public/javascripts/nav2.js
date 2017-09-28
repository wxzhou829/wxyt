function switchNav2(){
	var nav = document.getElementById("nav-ul");
	var sbpj = document.getElementById("nav-sbpj");

	for (var i = 0; i < nav.children.length; i++) {	
		var elm = nav.children[i];
		if(elm.className === 'active'){
			elm.className = 'inactive';
		} 
	}
	sbpj.className = 'active';	
}
switchNav2();