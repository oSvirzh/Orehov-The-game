window.onload = init;

var map;
var ctxMap;

var helpText = {'mainText': '', 'left1': 'гц ход: 100', 'left2': 'Скорость: 2','right1': 'Стоимость: 3', 'right2': 'Кол-во: 3'};


var gameWidth = 800;
var gameHeigth = 500;

var sprBall = new Image();
sprBall.src = "img/sprBall.jpg";

var point_click = 30;
var total_point = 100000;
var pt;
var ClickerBall;
var Button1;
var Button2;
var Button3;
var Button4;
var Button5;
var Button6;


var isPlaying;
var mouseX;
var mouseY;

var requestAnimFrame = window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame

function init()
{
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeigth;

    ClickerBall = new objClickerBall();
    Button1 = new objButton1('button1', 50, 50);
    Button2 = new objButton2('button2', 50, 120);
    Button3 = new objButton3('button3', 50, 190);
    Button4 = new objButton4('button4', 50, 260);
    Button5 = new objButton5('button5', 50, 330);
    Button6 = new objButton6('button6', 50, 400);


    startLoop();

    document.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("click", mouseClick, false);
}

function loop()
{
    if(isPlaying)
    {
        draw();
        update();
        requestAnimFrame(loop);
        console.log(total_point-pt);
    }   
}

function startLoop()
{
    isPlaying = true;
    loop();
}

function stopLoop()
{
    isPlaying = false;
}


function draw()
{
    ClickerBall.draw();
    Button1.draw();
    Button2.draw();
    Button3.draw();
    Button4.draw();
    Button5.draw();
    Button6.draw();

}

function update()
{
    helpText['mainText'] = '';
    helpText['left1'] = '';
    helpText['left2'] = '';
    helpText['right1'] = '';
    helpText['right2'] = '';
    ClickerBall.update();
    Button1.update();
    Button2.update();
    Button3.update();
    Button4.update();
    Button5.update();
    Button6.update();
}


function objClickerBall() {
    this.clickerBall = document.getElementById("clickerBall");
    this.ctxClickerBall = this.clickerBall.getContext("2d");

    this.clickerBall.width = gameWidth;
    this.clickerBall.height = gameHeigth;

    this.onMouse=false;
    this.drawX = 600;
    this.drawY = 120;
    this.width = 170;
    this.height = 170;

    this.rotation =  0;
}

objClickerBall.prototype.draw = function () 
{   
    this.ctxClickerBall.clearRect(0, 0, gameWidth, gameHeigth);
    this.ctxClickerBall.translate( this.drawX, this.drawY );
    this.ctxClickerBall.rotate(this.rotation*Math.PI/180);
    this.ctxClickerBall.drawImage( sprBall, -this.width/2, -this.height/2, this.width, this.height);
    this.ctxClickerBall.rotate( -this.rotation*Math.PI/180 );
    this.ctxClickerBall.translate( -this.drawX, -this.drawY );
    setTextStyle(this.ctxClickerBall, "#3D3D3D", "bold 11pt Arial", "center", "top");
    this.ctxClickerBall.fillText(total_point + ' гц', this.drawX, this.drawY-this.height/2-10);
    this.ctxClickerBall.strokeRect(this.drawX-this.width/2-50, this.drawY+this.height/2+50, 270, 180);
    wrapText(this.ctxClickerBall, String(helpText['mainText']), this.drawX, this.drawY+this.height/2+130, 270, 20);
    setTextStyle(this.ctxClickerBall, "#3D3D3D", "bold 10pt Arial", "left", "top");
    this.ctxClickerBall.fillText(helpText['left1'], this.drawX-this.width/2-45, this.drawY+this.height/2+60);
    this.ctxClickerBall.fillText(helpText['left2'], this.drawX-this.width/2-45, this.drawY+this.height/2+75);
    setTextStyle(this.ctxClickerBall, "#3D3D3D", "bold 10pt Arial", "right", "top");
    this.ctxClickerBall.fillText(helpText['right1'], this.drawX+130, this.drawY+this.height/2+60);
    this.ctxClickerBall.fillText(helpText['right2'], this.drawX+130, this.drawY+this.height/2+75);

}

objClickerBall.prototype.update = function()
{
    this.onMouse = false;
    this.rotation = total_point;
    if(this.drawX - this.width/2 < mouseX && this.drawY-this.height/2 < mouseY && this.drawY+this.height/2> mouseY && this.drawX+this.width/2>mouseX)
        {
            this.onMouse=true;
            helpText['mainText'] = 'Пока что можешь покликать на этого парня';
        }
}


function objButton(id, drawX, drawY) {
    this.button = document.getElementById(id);
    this.ctxButton = this.button.getContext("2d");

    this.button.width = gameWidth;
    this.button.height = gameHeigth;

    this.onMouse=false;
    this.drawX = drawX;
    this.drawY = drawY;
    this.width = 300;
    this.height = 45;
    this.i = 0;

    this.name = 'ButtonName';
    this.count = 0;
    this.price = 0;
    this.point = 0;
    this.speed = 1;
    this.about = 'About Button';

    this.active = true;

}

objButton.prototype.draw = function () 
{   
    this.ctxButton.clearRect(0, 0, gameWidth, gameHeigth);
    this.ctxButton.strokeRect(this.drawX, this.drawY, this.width, this.height);
    setTextStyle(this.ctxButton, "#3D3D3D", "bold 15pt Arial", "left", "top");
    this.ctxButton.fillText( this.name, this.drawX+10, this.drawY+this.height/3);
    setTextStyle(this.ctxButton, "#3D3D3D", "bold 10pt Arial", "left", "top");
    this.ctxButton.fillText(this.price + ' гц', this.drawX, this.drawY+this.height);
    setTextStyle(this.ctxButton, "#3D3D3D", "bold 10pt Arial", "right", "top");
    this.ctxButton.fillText('['+this.count + ']', this.drawX+this.width, this.drawY+this.height);
}

objButton.prototype.update = function()
{
    this.onMouse = false;
    this.i+=1;
    if (this.i>this.speed*10){
        if (this.active){
            total_point+=this.count*this.point;
            
        }
            this.uniqueAction();
            this.i = 0;
    }
    if(this.drawX < mouseX && this.drawY < mouseY && this.drawY+this.height> mouseY && this.drawX+this.width>mouseX)
        {
            this.onMouse=true;
            helpText['mainText'] = this.about;
            helpText['left1'] = 'Gc ход: ' +this.point;
            helpText['left2'] = 'Скорость: '+this.speed;
            helpText['right1'] = 'Стоимость: '+this.price;
            helpText['right2'] = 'Кол-во: '+this.count;
        }
}

objButton.prototype.click = function()
{
    if(total_point-this.price>=0){
        total_point-=this.price;
        this.price*=2;
        this.count+=1;
    }
}

objButton.prototype.uniqueAction = function(){}

function objButton1() {
    objButton.apply(this, arguments);
    this.name = 'Java';
    this.count = 0;
    this.price = 10;
    this.point = 10;
    this.speed = 1;
    this.about = '[Приложения Java обычно транслируются в специальный байт-код. Увеличивает кол-во гц за один кликъ]';
}
objButton1.prototype = Object.create(objButton.prototype);
objButton1.prototype.constructor = objButton1
objButton1.prototype.uniqueAction = function(){point_click=point_click+this.count*10;}

function objButton2() {
    objButton.apply(this, arguments);
    this.name = 'Парень с Кировограда';
    this.count = 0;
    this.price = 50;
    this.point = 10;
    this.speed = 2;
    this.about = '[Шутит. С шансом 75% говорит с преподом и нихуя не делает. Говорить он любит так что его КПД смело можно делить на 4.]';

}
objButton2.prototype = Object.create(objButton.prototype);
objButton2.prototype.constructor = objButton2 ; 

objButton2.prototype.uniqueAction = function(){
    if (Math.random()>0.5){
        this.active = true;
    }
    else{
        this.active = false;
    }
}

function objButton3() {
    objButton.apply(this, arguments);
    this.name = 'Михаель';
    this.count = 0;
    this.price = 500;
    this.point = 1000;
    this.speed = 2;
    this.about = '[Каждый нанятых Михаешь уникальным образов увеличивает кол-во гц в секунду. С шансом 50% уходит на работу ]';

}
objButton3.prototype = Object.create(objButton.prototype);
objButton3.prototype.constructor = objButton3 ; 
objButton3.prototype.uniqueAction = function(){
    if (Math.random()>0.50 && this.count > 0){
        this.count -= 1;
    }
}

function objButton4() {
    objButton.apply(this, arguments);
    this.name = 'Дедина';
    this.count = 0;
    this.price = 5000;
    this.point = 0;
    this.speed = 8;
    this.about = '[При найме этого персонажа производительность всех парней из Кировограда удваиваеться. С шансом 42% убегает, забирая с собой Парня из кировограда]';
}
objButton4.prototype = Object.create(objButton.prototype);
objButton4.prototype.constructor = objButton4 ;

objButton4.prototype.uniqueAction = function(){
    if (Math.random()>0.75 && this.count >0 && Button2.count > 0){
        this.count -=1 ;
        Button2.count -= 1;
    }
    Button2.point = (this.count>0)? Button2.point*2 : Button2.point;
}

function objButton5() {
    objButton.apply(this, arguments);
    this.name = 'Топ тян';
    this.count = 0;
    this.price = 50000;
    this.point = 500;
    this.speed = 2;
    this.about = '[Единсвенная тня в этом списке. С помощью её можно увеличить прирост гц в сек. С кто знает каким шансом призывает одного Михаеля.]';

}
objButton5.prototype = Object.create(objButton.prototype);
objButton5.prototype.constructor = objButton5 ;

objButton5.prototype.uniqueAction = function(){
    if (Math.random()>0.666 && this.count>0){
        Button3.count += 1;
    }
}

function objButton6() {
    objButton.apply(this, arguments);
    this.name = 'Баловень';
    this.count = 0;
    this.price = 500000;
    this.point = 5000;
    this.speed = 8;
    this.about = '[Этот мощный парень, самый крутой из всех. Ходят слухи что он может ускорить топ-тян в несколько раз. Больше Михаелей !!!]';

}
objButton6.prototype = Object.create(objButton.prototype);
objButton6.prototype.constructor = objButton6 ;
objButton6.prototype.uniqueAction = function(){
    if (Math.random()>0.666 && this.count>0 ){
        Button3.count += 1;
    }
    Button5.speed = (this.count>0 && Button5.speed>=1)? Button2.speed/2 : Button2.point;
}

function mouseMove(e)   
{
    mouseX = e.pageX-map.offsetLeft;
    mouseY = e.pageY-map.offsetTop;
}

function mouseClick()
{
    if(ClickerBall.onMouse)
        {total_point +=point_click;}
    if(Button1.onMouse)
        {Button1.click();}
    if(Button2.onMouse)
        {Button2.click();}
    if(Button3.onMouse)
        {Button3.click();}
    if(Button4.onMouse)
        {Button4.click();}
    if(Button5.onMouse)
        {Button5.click();}
    if(Button6.onMouse)
        {Button6.click();}
}

function setTextStyle(ctx, color, font, align, baseline){

    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
}

function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight)
    {
        var words = text.split(" ");
        var countWords = words.length;
        var line = "";
        for (var n = 0; n < countWords; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = context.measureText(testLine).width;
            if (testWidth > maxWidth) {
                context.fillText(line, marginLeft, marginTop);
                line = words[n] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, marginLeft, marginTop);
    }