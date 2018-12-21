






function setup() {
    createCanvas(windowWidth * 0.99, windowHeight * 0.99);


    // Positie speler
    towerPos = {x: (windowWidth / 4), y: windowHeight / 4};



    units = new Group();


    // Muis
    mous = createSprite(mouseX, mouseY, 5, 5);
    console.log(mous, "1");



    // Speler aanmaken
    tower = createSprite(towerPos.x, towerPos.y);
    tower.draw = function() {
        fill(0, 0, 255);
        ellipse(towerPos.x, towerPos.y, windowHeight / 5, windowHeight / 5);
    };
    console.log(tower, "2")


}




function draw() {
    // Maak achtergrond
    background(30);



    fill(255, 26, 198);
    textSize(40);
    textAlign(CENTER);

    mous.position.x = mouseX;
    mous.position.y = mouseY;


    if (tower.overlap(mous) && mouseIsPressed) {
        console.log("haha");
    }


    mouseClicked();



    drawSprites();


}


function mouseClicked() {

    return false;
}



function keyPressed() {





    let type = Math.floor(random(4));
/**
    var ang = random(360);
    var px = width/2 + 1000 * cos(radians(ang));
    var py = height/2+ 1000 * sin(radians(ang));
**/

unitPos = [
    {x: random(windowWidth), y: windowHeight},
    {x: random(windowWidth), y: windowHeight},
    {x: windowWidth, y: random(windowHeight)},
    {x: windowWidth, y: random(windowHeight)}
]

    let getal = unitPos[type];



    let xd = Math.floor(getal.x);
    let yd = Math.floor(getal.y);



    createUnit(type+1, xd, yd);


    console.log(units);


    tower.debug = mouseIsPressed;
    mous.debug = mouseIsPressed;


    drawSprites();

}




function createUnit(type, x, y) {



    var a = createSprite(x, y);

    a.damage = type  * 10;
    a.health = type;
    a.size = type  * 10;
    a.color = {r: (type-1) * (255/3), g: 255 - ((type-1) * (255/3)) , b: 0}
  //  a.setSpeed(type), random(360);
    a.attractionPoint(5, towerPos.x, towerPos.y);

    console.log(type, x, y);




    a.draw = function() {
        fill(a.color.r, a.color.g, a.color.b);
        ellipse(x, y, a.size, a.size);
    }

    units.add(a);

    return a;

}





