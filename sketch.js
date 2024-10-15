let noiseScale = 0.03;
let antArray;
let antCount = 100;

function setup() {
  createCanvas(400, 400);
  background(0);
  antArray = [];
  for (let i = 0; i < antCount; i++){
      antArray.push(new Ant());
  }
}

function draw() {
  stroke(255,15);
  for (let ant of antArray) {
  ant.update();
  }
}

class Ant {
  
  constructor() {
    this.position = createVector(random(width), random(height));
    this.life = random(50,100);
    this.layer = 0;
  }
    
  
  //method
  update(){
    
    if (this.life > 0) {
    //scaling with 0.03
       let noiseValue = noise(this.position.x * noiseScale, this.position.y * noiseScale,this.layer);
    
    //using map function to scale from 0,1 to 0,2PI
       let angle = map(noiseValue, 0, 1, 0, TWO_PI);
    
    //creating unit vector from angle
      let direction = p5.Vector.fromAngle(angle, 2);
    
      beginShape(LINES);
      vertex(this.position.x,this.position.y);
      this.position.add(direction);
      vertex(this.position.x,this.position.y);
      endShape();
      if(this.position.x > width){
        this.position.x = 0;
      }
      else if(this.position.x < 0){
        this.position.x = width;
      }
    
      if(this.position.y > height){
        this.position.y = 0;
      }
      else if(this.position.y < 0){
        this.position.y = height;
      }
      this.life -= 1;
    }
    
    else if(this.life <= 0){
      this.position = createVector(random(width), random(height));
      this.life = random(50,100);
      this.layer += 1;
    }
  

  }
}

