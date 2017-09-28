function checkBh(){

	var	pjbh0=(document.querySelector('input[name="pjbh0"]'));
	var	pjbh1=(document.querySelector('input[name="pjbh1"]'));
	var	pjbh2=(document.querySelector('input[name="pjbh2"]'));

	//获得URL
	var url = document.URL.split('/')[2];

	//通过AJAX获得配件名称等
	function getData(i, bh){
		var requestURL = 'http://'+ url +'/ajax/sbwx_finish?bh='+ bh ;
		var request = new XMLHttpRequest();
		request.open('GET', requestURL);
		//console.log(requestURL);
		request.responseType = 'json';
		request.send();
		request.onload = function() {
			var data = request.response;
			var amountN = 'amount' + i;
			var amount = document.querySelector('input[name="'+ amountN +'"]');
			var priceN = 'price' + i;
			var price = document.querySelector('input[name="'+ priceN +'"]');
			var pjidN = 'pjid' + i;
			var pjid = document.querySelector('input[name="'+ pjidN +'"]');
			
			if (data){
				//console.log(data.price); 
				amount.value = 1;
				amount.removeAttribute('readonly');
				amount.setAttribute("min", 1);
				amount.setAttribute("max", data.peijian.stock );
				price.value = +data.price;	
				pjid.value = data.peijian._id
			}else{
				amount.setAttribute("readonly", "");
				amount.value = 0;
				price.value = null;	
				pjid.value = null;
			}

			
		}
	}
	
	//监听配件编号的change事件
	pjbh0.addEventListener("change",function(){
		var sr = pjbh0.value;
		getData(0, sr);
	});
	pjbh1.addEventListener("change",function(){
		var sr = pjbh1.value;
		getData(1, sr);
	});
	pjbh2.addEventListener("change",function(){
		var sr = pjbh2.value;
		getData(2 ,sr);
	});	

};
checkBh();