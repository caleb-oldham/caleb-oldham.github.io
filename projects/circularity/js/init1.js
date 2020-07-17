var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        var numCircles = prompt('How many circles would you like?');
         function randomNumberBetween(min, max) {
            var difference = max - min;
            var randomValue = Math.random() * difference;
            return min + randomValue;
         }
       
        var circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
        var circles = [];
  
        
        
        function drawCircle(circle){
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
            circle.velocityX = randomNumberBetween(-1, 1);
            circle.velocityY = randomNumberBetween(-1, 1);
            view.addChild(circle);
            circles.push(circle);
        }



      
        for (var count = 1; count <= numCircles; count++){
           drawCircle(circle[count]);
        }

        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
          for (var i = 0; i <=circles.length-1; i++){
            circles[i].x = circles[i].x + circles[i].velocityX;
            circles[i].y = circles[i].y + circles[i].velocityY;
            game.checkCirclePosition(circles[i]);
          } 
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {
            if (circle.x > canvas.width + circle.radius) {
    			circle.x = 0 - circle.radius;
			} else if (circle.x < 0 - circle.radius) {
    			circle.x = canvas.width + circle.radius;
			}
			if(circle.y > canvas.height + circle.radius){
				circle.y = 0 - circle.radius;
			} else if (circle.y < 0 - circle.radius){
				circle.y = canvas.height + circle.radius;
				}
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
