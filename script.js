var tbodyy=document.getElementById("tbody"),
	trs=tbody.getElementsByTagName("tr"),
	checkAll= document.getElementsByClassName("check-all"),
	checkOne=document.getElementsByClassName("check-one"),
	price = document.getElementsByClassName("price"),
	minus= document.getElementsByClassName("minus"),
	plus = document.getElementsByClassName("plus"),
	amountInput=document.getElementsByClassName("amountInput"),
	total=document.getElementsByClassName("total"),
	deleteItem=document.getElementsByClassName("deleteItem"),
	selectedAmount=document.getElementById("selectedAmount"),
	selectedTotal=document.getElementById("selectedTotal"),
	selectedViewList=document.getElementById("selectedDetail"),
	deleteAll=document.getElementById("deleteAll"),
	urls=tbody.getElementsByTagName("img");

//遍历所有已选商品，更新合计价格
function selectedTotalChange (){
	console.log("selctedTotalChange")
	var selectedTotalNumber=0;
	var selectedTotalAmount=0;
	for(let i=0;i<checkOne.length;i++){
	if(checkOne[i].checked==true){
		selectedTotalNumber+=parseFloat(total[i].innerHTML);
		selectedTotalAmount+=parseInt(amountInput[i].value);
	}
	selectedTotal.innerHTML=selectedTotalNumber.toFixed(2);
	selectedAmount.innerHTML=selectedTotalAmount;	
}
}

//更新每行的total计算，再更新合计的计算
function totalChange(index,amount){
	total[index].innerHTML=parseFloat(price[index].innerHTML)*amount;
	selectedTotalChange ();
}

function showSelected(){
	selectedViewList.innerHTML="";
	for(let i=0;i<checkOne.length;i++){
		if(checkOne[i].checked==true){
			console.log("showselected:"+i);
			let sContent=("<div><img src='")+urls[i].src+("''><span>cancel</span></div>")
			selectedViewList.innerHTML+=sContent;
			cancelSel();
		}
	}
}

//复选框点击调用合计更新函数
for(let i=0;i<checkOne.length;i++){
	checkOne[i].onclick=function(){
		console.log("i="+i)
		if(this.checked==false){
			for(let i=0;i<checkAll.length;i++){
				checkAll[i].checked=false;
			}
		}
		console.log("single check")
		selectedTotalChange();
		showSelected();
	}
}

for (let i=0;i<checkAll.length;i++){
	checkAll[i].onclick=function(){
		if(checkAll[i].checked==true){
			for(let i=0;i<checkOne.length;i++){
				checkOne[i].checked=true;
				showSelected();
			}
			for(let i=0;i<checkAll.length;i++){
				checkAll[i].checked=true;
			}
			selectedTotalChange();
		}
		else{
			for(let i=0;i<checkOne.length;i++){
				checkOne[i].checked=false;
				showSelected();
			}
			for(let i=0;i<checkAll.length;i++){
				checkAll[i].checked=false;
			}
			selectedTotalChange();
	}
}}


for(let i=0;i<minus.length;i++){
	minus[i].onclick=function(){
		console.log("minus!");
		if((this.nextElementSibling.value-1)<0){
			alert("please enter a valid number");
			return;
		}
		this.nextElementSibling.value--;
		this.parentNode.nextElementSibling.innerHTML=(this.nextElementSibling.value*parseFloat(this.parentNode.previousElementSibling.innerHTML)).toFixed(2);
		selectedTotalChange ();
	}
}

for(let i=0;i<plus.length;i++){
	plus[i].onclick=function(){
		console.log("plus!");
		this.previousElementSibling.value++;
		this.parentNode.nextElementSibling.innerHTML=(this.previousElementSibling.value*parseFloat(this.parentNode.previousElementSibling.innerHTML)).toFixed(2);
		selectedTotalChange ();
	}
}

for(let i=0;i<amountInput.length;i++){
	amountInput[i].onchange=function(){
		totalChange(i,amountInput[i].value);
	}
}

for(let i=0;i<deleteItem.length;i++){
	deleteItem[i].onclick=function(){
		console.log(i)
		this.parentNode.remove();
		showSelected();
		selectedTotalChange();
	}
}

deleteAll.onclick=function(){
	for(let i=0;i<checkOne.length; i++){
		 if(checkOne[i].checked==true){
			 checkOne[i].parentNode.parentNode.remove();
			 i--;
		}
	}
	showSelected();
}

document.getElementById("arrow-up").onclick=function(){
	console.log("arrow up")
	selectedViewList.style.visibility="visible";
}

document.getElementById("arrow-down").onclick=function(){
	console.log("arrow down")
	selectedViewList.style.visibility="hidden";
}

function cancelSel(){
	var cancelSelected = selectedViewList.getElementsByTagName("span");

	for(let i=0;i<cancelSelected.length;i++){
		cancelSelected[i].onclick=function(){
			var aImg=cancelSelected[i].previousElementSibling.src;
			console.log("aImg="+aImg)
			for(let i=0;i<trs.length;i++){
				var bImg=trs[i].firstElementChild.nextElementSibling.firstElementChild.src;
				console.log(bImg)
				if(aImg==bImg){
					console.log('bImg='+bImg);
					console.log(trs[i].firstElementChild.firstElementChild.checked);
					trs[i].firstElementChild.firstElementChild.checked=false;
					selectedTotalChange ();
				}
			}
			this.parentNode.remove();
		}


	}
}
