var Canvas = function(ele, color) {
	this.color = color || '#008000';
	this.element = document.getElementById(ele);
	this.shapes = [];
	this.width   = this.element.getAttribute('width');
	this.height  = this.element.getAttribute('height');
	this.context = this.element.getContext("2d");
	this.movingShape ;
	this.dragging = false;
	this.dragged = false;
	var that = this;

	// Toggle the fillColor effect in Shape
	this.element.addEventListener('click', function(e) {

		// console.log('click event');
		// console.log(that.dragged === false, typeof that.movingShape !== undefined , that.movingShape.name === 'Circle');
		if (that.dragged === false && typeof that.movingShape !== undefined) {
					
			that.movingShape.toggleColor(that);	
		}

		that.dragged = false;		
		//return true;

	});

	// Capture the mousedown 
	this.element.addEventListener('mousedown', function(e) {
		
		// console.log('event mousedown');
		that.setMovingShape(e);

		return this;
	});

// Capture the mousedown 
	this.element.addEventListener('mousemove', function(e) {
		
		// console.log('event mousemove');
		// console.log(typeof that.movingShape !== undefined, that.movingShape !=null);
		if(typeof that.movingShape !== undefined && that.movingShape !=null && that.dragging === true) {
			// console.log('inside move');
			// Remove the existing shape
			that.context.clearRect(that.movingShape.x, that.movingShape.y, that.movingShape.width, that.movingShape.height);
			//Set ne position 
			that.movingShape.x = e.pageX - this.offsetLeft;
			that.movingShape.y = e.pageY - this.offsetTop;			

			// Re draw the entire canvas
			that.clear();
			that.draw();	
			that.dragged  = true;
		}
	});


	this.element.addEventListener('mouseup', function(e){
		// console.log('event mouseup');
		 that.dragging = false;
		 this.removeEventListener('mousemove', function(){
		 	// console.log('removed mousemove');
		 });
		 
	});

}

Canvas.prototype.clear = function() {
	this.context.clearRect(0,0,this.width, this.height);
	return this;
};

Canvas.prototype.addShapes = function() {
	var i;
	for(i in arguments) {
		// console.log('shape:'+i+ arguments[i]);
		this.shapes.push(arguments[i]);
	}
	return this.draw();
};

Canvas.prototype.draw = function() {
	var i;
	for(i in this.shapes) {
		// console.log('shape:'+i+ this.shapes[i]);
		this.shapes[i].draw(this.element);
	}

	return this;
};

Canvas.prototype.setMovingShape = function(e) {

	// console.log(e.pageX, e.pageY);	
	var i, boundary={}, shapes=[], selectedIndex, x1, y1;
	for(i in this.shapes) {
		var s = this.shapes[i];
		
		x1 = parseInt(this.element.offsetLeft)+ parseInt(s.x) ;
		y1 = parseInt(this.element.offsetTop)+ parseInt(s.y);
		if(s.name === 'Circle') {
			
			boundary.x1 = x1 - parseInt(s.radius);
			boundary.y1 = y1 - parseInt(s.radius);			
			boundary.x2 = x1 + parseInt(s.radius);
			boundary.y2 = y1 + parseInt(s.radius);			

		} else {
	
			boundary.x1 = x1;
			boundary.y1 = y1;			
			boundary.x2 = x1 + parseInt(s.width);
			boundary.y2 = y1 + parseInt(s.height);
			
		}
		
		// console.log('Shape x,y'+s.name +s.x+','+s.y);
		// console.log('boundary x,y'+boundary.x1+','+boundary.x2+'-'+boundary.y1+','+boundary.y2)
		// console.log(e.pageX >= boundary.x1, e.pageX <= boundary.x2, e.pageY >= boundary.y1, e.pageY<= boundary.y2);

		if(e.pageX >= boundary.x1 && e.pageX <= boundary.x2 && e.pageY >= boundary.y1 && e.pageY<= boundary.y2){
			console.log('Clicked Shape is '+s.name +':'+s.x+','+s.y);
			shapes.push(i);
			this.dragging=true;
		}

	}
	// If more than one shape in the slecte area select the highest index shape.
	if(shapes.length >0) {
	    selectedIndex = shapes.pop();
		this.movingShape = this.shapes[selectedIndex];
	}

}
