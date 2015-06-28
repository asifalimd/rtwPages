// Shape Object
var Shape = function() {
	this.color;
	isTransparent = false;
};

// Circle Object
var Circle = function(radius, x, y, color) {
	this.radius = radius;
	this.name = 'Circle';
	this.x = x || 100;
	this.y = y || 80
	this.color = color;
	
};

Circle.prototype = new Shape();
Circle.prototype.draw = function(ele) {	
	// console.log('draw cirlce');
	if(ele) {
		var context = ele.getContext("2d");
		context.beginPath();
		context.arc(this.x, this.y, this.radius,0, 2*Math.PI);
		context.strokeStyle = this.color;
		context.stroke();
		context.fillStyle = this.color;
		context.fill();
	} 

	return this;
}
Circle.prototype.toggleColor = function(that) {

	if(!this.isTransparent) {
		// console.log('if circle toggleColor'+ this.name,this.x);
		this.isTransparent = true;
		that.context.strokeStyle = this.color;
		that.context.stroke();
		that.context.fillStyle = '#FFFFFF';
		that.context.fill();

	} else {
		// console.log('ifelse Circle toggleColor');
		this.isTransparent = false;
		that.context.fillStyle = '#FFFFFF';
		that.context.strokeStyle = this.color;
		that.context.stroke();
		that.context.fillStyle = this.color;
		that.context.fill();			    
	}

	return this;
}


// Rectangle
var Rectangle = function(width,height,x,y, color) {
	this.width  = width;
	this.height = height;
	this.x = x || 100;
	this.y = y || 80
	this.name = 'Rectangle';
	this.color = color ;
};

Rectangle.prototype = new Shape();

Rectangle.prototype.draw = function(ele) {
	if(ele) {
		var context = ele.getContext("2d");
	 	context.fillStyle = this.color;
	 	this.rect(this.x, this.y, this.width, this.height, ele);
    }
};

Rectangle.prototype.rect = function(x,y, w, h,ele) {
	if(ele) {
		// console.log('drawing rect');
		var context = ele.getContext("2d");
		context.beginPath();
		context.rect(x, y, w, h);
		context.closePath();			
		context.fill();
	}

	return this;
}

Rectangle.prototype.toggleColor = function(that) {

	if(!this.isTransparent) {
		// console.log('if rect toggleColor');
		this.isTransparent = true;
		that.context.clearRect(this.x, this.y, this.width, this.height);
		that.context.strokeStyle = this.color;	
		that.context.strokeRect(this.x, this.y, this.width, this.height);

	} else {
		// console.log('else rect toggleColor');
		this.isTransparent = false;
		that.context.fillStyle = '#FFFFFF';
		that.context.fillRect(this.x, this.y, this.width, this.height);
		that.context.fillStyle = this.color;
		that.context.fillRect(this.x, this.y, this.width, this.height);
			    
	}

	return this;
}

// Square
var Square = function(side,x,y, color) {
	this.width = side || 50;
	this.height = side || 50;
	this.x = x || 100;
	this.y = y || 80
	this.name = 'Square';
	this.color = color;
};
Square.prototype = new Rectangle();

// Copied from http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


var c1 = new Circle(30,400,340,'#008000');
var r1 = new Rectangle(65, 50, 100,230,'#0000FF');
var s1 = new Square(40, 220, 60, '#FF0000');

var canvas;
// var shapes = (r,c,s);
// c.draw('circle');
var init = function() {
  // alert('heyee');

   canvas = new Canvas('c1');
   canvas.addShapes(r1,s1,c1);

   var btn = document.getElementById('add-shape');
   btn.addEventListener('click', function(){
   	var x, y;
   	x = Math.floor((Math.random()*450)+1);
   	y = Math.floor((Math.random()*350)+1);
   	w = Math.floor((Math.random()*70)+40);
   	h = Math.floor((Math.random()*w-10)+30);
   	console.log(x,y);
	var s1 = new Rectangle(w,h, x, y, getRandomColor());   	
	canvas.addShapes(s1);
	// var s1 = new Square(50, 320, 90, '#FF0000');   	
	// canvas.addShapes(s1);
   });

}