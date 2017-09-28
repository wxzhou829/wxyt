
function header(){	
var c=document.getElementById("myCanvas1");
var ctx1=c.getContext("2d");
//createRadialGradient(x,y,r,x1,y1,r1) - 创建一个径向/圆渐变
var grd1=ctx1.createRadialGradient(115,50,5,130,60,100);
grd1.addColorStop(0,"deeppink");
grd1.addColorStop(0.4,"chocolate");
grd1.addColorStop(1,"green");
ctx1.shadowOffsetX = 5;
ctx1.shadowOffsetY = 5;
ctx1.shadowColor = 'rgba(100,100,100,0.5)';
ctx1.shadowBlur = 3;
ctx1.font="58px 黑体";//font - 定义字体
ctx1.fillStyle=grd1;// Fill with gradient
ctx1.fillText("无锡骏达",0,70);//fillText(text,x,y) - 在 canvas 上绘制实心的文本	
}
header();