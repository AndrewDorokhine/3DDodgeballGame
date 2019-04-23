
// ------------------------------------- //
// ------------- Snake Game------------- //
// Project ----------------------------- //
// Jonathan Ismail, Andrew Dorokhine --- //
// ------------------------------------- //
// ------------------------------------- //
// SOURCES : http://buildnewgames.com/webgl-threejs/

// scene object variables
var renderer, scene, closeCamera, farCamera, pointLight, spotLight;

// field variables
var fieldWidth = 400, fieldHeight = 200;

// ball variables
var ball, ball2, ball3, ball4,ball5, pickup;
var ballDirX = 1, ballDirY = 0, ballSpeed = 1;
var ball2DirX = -0.7, ball2DirY = 0.5, ball2Speed = 1; 
var ball3DirX = -0.7, ball3DirY = 0.5, ball3Speed = 1; 
var ball4DirX = -0.7, ball4DirY = 0.5, ball3Speed = 1; 
var ball5DirX = -0.7, ball5DirY = 0.5, ball3Speed = 1; 
var ball6DirX = -0.7, ball6DirY = 0.5, ball3Speed = 1; 

var xballDirX = -0.7, xballDirY = 0.5, xballSpeed = 1; 
var xball2DirX = -0.7, xball2DirY = 0.5; 
var xball3DirX = -0.7, xball3DirY = 0.5; 
var xball4DirX = -0.7, xball4DirY = 0.5;
var xball5DirX = -0.7, xball5DirY = 0.5;
var xball6DirX = -0.7, xball6DirY = 0.5;
var xball7DirX = -0.7, xball7DirY = 0.5;
var xball8DirX = -0.7, xball8DirY = 0.5;
var xball9DirX = -0.7, xball9DirY = 0.5;
var xball10DirX = -0.7, xball10DirY = 0.5;

var count = 0;

var xball, xball2, xball3, xball4, xball5, xball6, xball7, xball8, xball9, xball10;
var ballarray = [xball, xball2, xball3, xball4, xball5, xball6, xball7, xball8, xball9, xball10];
var ballXarray = [xballDirX,xball2DirX,xball3DirX,xball4DirX,xball5DirX,xball6DirX,xball7DirX,xball8DirX,xball9DirX,xball10DirX];
var ballYarray = [xballDirY,xball2DirY,xball3DirY,xball4DirY,xball5DirY,xball6DirY,xball7DirY,xball8DirY,xball9DirY,xball10DirY];

var ballXcollision1, ballXcollision2, ballXcollision3, ballXcollision4, ballXcollision5, ballXcollision6, ballXcollision7, ballXcollision8, ballXcollision9, ballXcollision10;
var ballcollisionarray = [ballXcollision1, ballXcollision2, ballXcollision3, ballXcollision4, ballXcollision5, ballXcollision6, ballXcollision7, ballXcollision8, ballXcollision9, ballXcollision10];

var balltrue = false;
// game-related variables
var score = 0;

// ------------------------------------- //
// ------- GAME FUNCTIONS -------------- //
// ------------------------------------- //

function setup()
{ 
    // reset player score
    score1 = 0;
    
    // set up all the 3D objects in the scene
    createScene();
    
    // and let's get cracking!
    draw();
}
function addball(){
    var radius = 5,
    segments = 6,
    rings = 6;
    var i;

    for (i = 0; i < 11; i++) 
	{
		var sphereMaterial6 =
		new THREE.MeshPhongMaterial({color: 0xFF0000});
		ballarray[i] = new THREE.Mesh(new THREE.SphereGeometry(
                                                            radius,
                                                            segments,
                                                            rings),
															sphereMaterial6);
		var temp = getRandomArbitrary(-190, 190);
		var temp2 = getRandomArbitrary(-95, 95);
        
        
		ballarray[i].position.x = temp;
		ballarray[i].position.y = temp2;
		// set ball above the table surface
		ballarray[i].position.z = radius;
		ballarray[i].receiveShadow = true;
		ballarray[i].castShadow = true;
	}
}

function createScene()
{
    // set the scene size
    var WIDTH = 1200,
    HEIGHT = 600;
    
    // set some camera attributes
    var VIEW_ANGLE = 50,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;
	
	scene = new THREE.Scene();
    
    var c = document.getElementById("gameCanvas");
    
    // create a WebGL renderer, camera
    // and a scene
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);
    
    // attach the render-supplied DOM element
    c.appendChild(renderer.domElement);
    
    // set up the playing surface plane
    var planeWidth = fieldWidth,
    planeHeight = fieldHeight,
    planeQuality = 100;
     
    // create the plane's material
    var planeMaterial =
    new THREE.MeshLambertMaterial({color: 0x4D4B4B});
    // create the table's material
    var tableMaterial =
    new THREE.MeshLambertMaterial({color: 0x111111});
   
    // create the ground's material
    var groundMaterial =
    new THREE.MeshLambertMaterial({color: 0x888888});
    
    
    // create the playing surface plane
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(
        planeWidth,    // 95% of table width, since we want to show where the ball goes out-of-bounds
        planeHeight,
        planeQuality,
        planeQuality),
        planeMaterial);
    
    scene.add(plane);
    plane.receiveShadow = true;
    
    var table = new THREE.Mesh(new THREE.CubeGeometry(
        planeWidth * 1.05,    // this creates the feel of a billiards table, with a lining
        planeHeight * 1.05,
        100,                // an arbitrary depth, the camera can't see much of it anyway
        planeQuality,
        planeQuality,
        1),
        tableMaterial);
		
    table.position.z = -51;    // we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
    scene.add(table);
    table.receiveShadow = true;
   
    // // set up the sphere vars
    // lower 'segment' and 'ring' values will increase performance
    var radius = 5,
    segments = 6,
    rings = 6;
    
    // // create the sphere's material
    var sphereMaterial =
    new THREE.MeshStandardMaterial({color: 0xD43001});
	
	var sphereMaterial2 =
    new THREE.MeshPhongMaterial({color: 0xFF0000});
    
    var sphereMaterial3 =
    new THREE.MeshPhongMaterial({color: 0xFF0000});
    
    var sphereMaterial4 =
    new THREE.MeshPhongMaterial({color: 0xFF0000});
    
    var sphereMaterial5 =
    new THREE.MeshPhongMaterial({color: 0xFF0000});
	
	var boxMaterial =
    new THREE.MeshLambertMaterial({color: 0x00FFFF});
    
    // Create a ball with sphere geometry
    ball = new THREE.Mesh(new THREE.SphereGeometry(
        radius,
        segments,
        rings),
        sphereMaterial);
		
	ball2 = new THREE.Mesh(new THREE.SphereGeometry(
        radius,
        segments,
        rings),
        sphereMaterial2);
    
    ball3 = new THREE.Mesh(new THREE.SphereGeometry(
                                                    radius,
                                                    segments,
                                                    rings),
													sphereMaterial3);
    
    ball4 = new THREE.Mesh(new THREE.SphereGeometry(
                                                    radius,
                                                    segments,
                                                    rings),
													sphereMaterial4);
    
    ball5 = new THREE.Mesh(new THREE.SphereGeometry(
                                                    radius,
                                                    segments,
                                                    rings),
													sphereMaterial5);
    
		
	pickup = new THREE.Mesh(new THREE.BoxGeometry(
		5,
		5,
		5),
		boxMaterial);
		
	// ----------------CAMERAS-----------------------
	closeCamera =
    new THREE.PerspectiveCamera(
                                VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR);
    
    // add the camera to the scene
    scene.add(closeCamera);
    
    // set a default position for the camera
    // not doing this somehow messes up shadow rendering
    closeCamera.position.z = 320;
		
	farCamera =
    new THREE.PerspectiveCamera(
                                50,
                                ASPECT,
                                NEAR,
                                FAR);
    
    // add the camera to the scene
    ball.add(farCamera);
	    
    // set a default position for the camera
    // not doing this somehow messes up shadow rendering
	farCamera.position.z = 320;
	  
    // // add the sphere to the scene
    scene.add(ball);
	scene.add(ball2);
    scene.add(ball3);
    scene.add(ball4);
    scene.add(ball5);
	scene.add(pickup);
    
    ball.position.x = 0;
    ball.position.y = 0;
    // set ball above the table surface
    ball.position.z = radius;
    ball.receiveShadow = true;
    ball.castShadow = true;
	
	ball2.position.x = 100;
    ball2.position.y = 0;
    // set ball above the table surface
    ball2.position.z = radius;
    ball2.receiveShadow = true;
    ball2.castShadow = true;
    
    ball3.position.x = 100;
    ball3.position.y = 0;
    // set ball above the table surface
    ball3.position.z = radius;
    ball3.receiveShadow = true;
    ball3.castShadow = true;
    
    ball4.position.x = -100;
    ball4.position.y = -50;
    // set ball above the table surface
    ball4.position.z = radius;
    ball4.receiveShadow = true;
    ball4.castShadow = true;
	
    
    ball5.position.x = -75;
    ball5.position.y = 0;
    // set ball above the table surface
    ball5.position.z = radius;
    ball5.receiveShadow = true;
    ball5.castShadow = true;
    
    // x range {-190, 190}
    // y range {-95, 95}
	var temp = getRandomArbitrary(-190, 190);
    var temp2 = getRandomArbitrary(-95, 95);
    pickup.position.x = temp;
    pickup.position.y = temp2;
	pickup.position.z = 5;
    
    // finally we finish by adding a ground plane
    // to show off pretty shadows
    var ground = new THREE.Mesh(new THREE.CubeGeometry(
        1000,
        1000,
        3,
        1,
        1,
        1 ),
        groundMaterial);
    // set ground to arbitrary z position to best show off shadowing
    ground.position.z = -132;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // // create a point light
    pointLight =
    new THREE.PointLight(0xF8D898);
    
    // set its position
    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;
    
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    // add to the scene
    scene.add(pointLight);
    
    // add a spot light for player ball
    // this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.0;
    spotLight.castShadow = true;
    scene.add(spotLight);
	
	//add another spot light for enemy ball
	spotLight2 = new THREE.SpotLight(0xF8D898);
    spotLight2.position.set(0, 0, 460);
    spotLight2.intensity = 1.0;
    spotLight2.castShadow = true;
    scene.add(spotLight2);
    
    
        var sphereMaterial6 =
        new THREE.MeshLambertMaterial({color: 0xFF0000});
        ball6 = new THREE.Mesh(new THREE.SphereGeometry(
                                                        radius,
                                                        segments,
                                                        rings),
                               sphereMaterial6);
    
        
        ball6.position.x = 100;
        ball6.position.y = 0;
        // set ball above the table surface
        ball6.position.z = radius;
        ball6.receiveShadow = true;
        ball6.castShadow = true;
	
    addball();
    // MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
    renderer.shadowMapEnabled = true;
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function cameraPhysics()
{
    // we can easily notice shadows if we dynamically move lights during the game
    spotLight.position.x = ball.position.x * 2;
    spotLight.position.y = ball.position.y * 2;
	
	spotLight2.position.x = ball2.position.x * 2;
    spotLight2.position.y = ball2.position.y * 2;
    
    // move to behind the player's paddle
    closeCamera.position.x = 0;
    closeCamera.position.y = 125;
    closeCamera.position.z = 245;
	
	farCamera.position.x = 0;
    farCamera.position.y = 100;
    farCamera.position.z = 75;
	
    //console.log(camera.position.y);
    // rotate to face towards the opponent
    closeCamera.rotation.x = -0.4;
    closeCamera.rotation.y = 0;
    closeCamera.rotation.z = 3.14224;
	
	farCamera.rotation.x = -1;
    farCamera.rotation.y = 0;
    farCamera.rotation.z = 3.14224;
}

function ballPhysics()
{
    for (i = 0; i < count; i++) {
        if (ballarray[i].position.x <= -fieldWidth/2)
        {
            ballXarray[i] = -ballXarray[i];
        }
        // if ball goes off the left side (CPU's side)
        if (ballarray[i].position.x >= fieldWidth/2)
        {
            ballXarray[i] = -ballXarray[i];
        }
        // if ball goes off the top side (side of table)
        if (ballarray[i].position.y <= -fieldHeight/2)
        {
            ballYarray[i] = -ballYarray[i];
        }
        // if ball goes off the bottom side (side of table)
        if (ballarray[i].position.y >= fieldHeight/2)
        {
            ballYarray[i] = -ballYarray[i];
        }
        ballarray[i].position.x += ballXarray[i] * ballSpeed;
        ballarray[i].position.y += ballYarray[i] * ballSpeed;
               
    }
    
    if (ball.position.x <= -fieldWidth/2)
    {
        ballDirX = -ballDirX;
    }
    
    // if ball goes off the left side (CPU's side)
    if (ball.position.x >= fieldWidth/2)
    {
        ballDirX = -ballDirX;
    }
    // if ball goes off the top side (side of table)
    if (ball.position.y <= -fieldHeight/2)
    {
        ballDirY = -ballDirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball.position.y >= fieldHeight/2)
    {
        ballDirY = -ballDirY;
    }
	
	if (ball2.position.x <= -fieldWidth/2)
    {
        ball2DirX = -ball2DirX;
    }
    // if ball goes off the left side (CPU's side)
    if (ball2.position.x >= fieldWidth/2)
    {
        ball2DirX = -ball2DirX;
    }
    // if ball goes off the top side (side of table)
    if (ball2.position.y <= -fieldHeight/2)
    {
        ball2DirY = -ball2DirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball2.position.y >= fieldHeight/2)
    {
        ball2DirY = -ball2DirY;
    }
    //BALL 3
    if (ball3.position.x <= -fieldWidth/2)
    {
        ball3DirX = -ball3DirX;
    }
    // if ball goes off the left side (CPU's side)
    if (ball3.position.x >= fieldWidth/2)
    {
        ball3DirX = -ball3DirX;
    }
    // if ball goes off the top side (side of table)
    if (ball3.position.y <= -fieldHeight/2)
    {
        ball3DirY = -ball3DirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball3.position.y >= fieldHeight/2)
    {
        ball3DirY = -ball3DirY;
    }
    //BALL 4
    if (ball4.position.x <= -fieldWidth/2)
    {
        ball4DirX = -ball4DirX;
    }
    // if ball goes off the left side (CPU's side)
    if (ball4.position.x >= fieldWidth/2)
    {
        ball4DirX = -ball4DirX;
    }
    // if ball goes off the top side (side of table)
    if (ball4.position.y <= -fieldHeight/2)
    {
        ball4DirY = -ball4DirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball4.position.y >= fieldHeight/2)
    {
        ball4DirY = -ball4DirY;
    }
    
    //BALL 5
    if (ball5.position.x <= -fieldWidth/2)
    {
        ball5DirX = -ball5DirX;
    }
    // if ball goes off the left side (CPU's side)
    if (ball5.position.x >= fieldWidth/2)
    {
        ball5DirX = -ball5DirX;
    }
    // if ball goes off the top side (side of table)
    if (ball5.position.y <= -fieldHeight/2)
    {
        ball5DirY = -ball5DirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball5.position.y >= fieldHeight/2)
    {
        ball5DirY = -ball5DirY;
    }
    
	// collision variables
	var ballBB = new THREE.Box3().setFromObject(ball);
	var ballBB2 = new THREE.Box3().setFromObject(ball2);
	var collision = ballBB.intersectsBox(ballBB2);
	if(collision === true)
	{
		scene.remove(ball);
        document.getElementById("scores").innerHTML = "Final Score: "+score;
		
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
	}
    // collision variables
    var ballBB3 = new THREE.Box3().setFromObject(ball3);
    var collision = ballBB.intersectsBox(ballBB3);
    if(collision === true)
    {
        scene.remove(ball);
        document.getElementById("scores").innerHTML = "Final Score: "+score;
		
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
    }
    // collision variables
    var ballBB4 = new THREE.Box3().setFromObject(ball4);
    var collision = ballBB.intersectsBox(ballBB4);
    if(collision === true)
    {
        scene.remove(ball);
        document.getElementById("scores").innerHTML = "Final Score: "+score;
		
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
    }
    // collision variables
    var ballBB5 = new THREE.Box3().setFromObject(ball5);
    var collision = ballBB.intersectsBox(ballBB5);
    if(collision === true)
    {
        scene.remove(ball);
        document.getElementById("scores").innerHTML = "Final Score: "+score;
		
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
    }
	
	for (i = 0; i < count; i++) {
        ballcollisionarray[i] = new THREE.Box3().setFromObject(ballarray[i]);
        var collision = ballBB.intersectsBox(ballcollisionarray[i]);
        if(collision === true)
        {
            scene.remove(ball);
            document.getElementById("scores").innerHTML = "Final Score: "+score;
			alert("GAME OVER");
			document.location.reload();
			clearInterval(interval);
        }
    }
    
    // collision variables
    var ballpickup = new THREE.Box3().setFromObject(pickup);
    var collision = ballBB.intersectsBox(ballpickup);
    if(collision === true)
    {
        score += 10;
		if(score === 100) 
		{
			document.getElementById("scores").innerHTML = "Final Score: "+score;
			alert("CONGRATULATIONS! YOU WIN!");
			document.location.reload();
			clearInterval(interval);
		}
        var temp = getRandomArbitrary(-190, 190);
        var temp2 = getRandomArbitrary(-95, 95);
        pickup.position.x = temp;
        pickup.position.y = temp2;
        pickup.position.z = 5;
        ball2Speed += 0.05;
        document.getElementById("scores").innerHTML = score;
        balltrue = true;
        console.log(balltrue);
        
    }

    // update ball position over time
    ball.position.x += ballDirX * ballSpeed;
    ball.position.y += ballDirY * ballSpeed;
	
	ball2.position.x += ball2DirX * ball2Speed;
    ball2.position.y += ball2DirY * ball2Speed;
    
    ball3.position.x -= ball3DirX * ball2Speed;
    ball3.position.y -= ball3DirY * ball2Speed;
    
    ball4.position.x += ball4DirX * ball2Speed;
    ball4.position.y += ball4DirY * ball2Speed;
    
    ball5.position.x -= ball5DirX * ball2Speed;
    ball5.position.y -= ball5DirY * ball2Speed;

    // limit ball's y-speed to 2x the x-speed
    // this is so the ball doesn't speed from left to right super fast
    // keeps game playable for humans
    if (ballDirY > ballSpeed * 2)
    {
        ballDirY = ballSpeed * 2;
    }
    else if (ballDirY < -ballSpeed * 2)
    {
        ballDirY = -ballSpeed * 2;
    }
	
	if (ball2DirY > ball2Speed * 2)
    {
        ball2DirY = ball2Speed * 2;
    }
    else if (ball2DirY < -ball2Speed * 2)
    {
        ball2DirY = -ball2Speed * 2;
    }
}

function playerMovement()
{
    // move left
    if (Key.isDown(Key.A))
    {
		ballDirX = 1;
		ballDirY = 0;       
    }
	
	if (Key.isDown(Key.D))
    {
		ballDirX = -1;
        ballDirY = 0;
    }
	if (Key.isDown(Key.W))
    {
		ballDirY = -1;
        ballDirX = 0;
    }
	
	if (Key.isDown(Key.S))
    {
		ballDirY = 1;
        ballDirX = 0;
    }
    
}

function draw()
{
    // draw THREE.JS scene
    if(balltrue == true && count < 11){
        
        scene.add(ballarray[count]);
        balltrue = false;
        count +=1;
    }
    
	if (Key.isDown(Key.X))
    {
		renderer.render(scene, closeCamera);	
    }
	else
	{
		renderer.render(scene, farCamera);
	} 
	
    // loop the draw() function
    requestAnimationFrame(draw);
    cameraPhysics();
    ballPhysics();
    playerMovement()
    // process game logic  
}
