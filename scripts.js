const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d'); //providing methods for drawing graphics on the canvas in 2D.
canvas.width=window.innerWidth;
canvas.height=window.innerHeight; //making canva cover the page with these two lines
const gradient= ctx.createLinearGradient(0,0,canvas.width,canvas.height); //starting from top-left corner to the bottom-right corner it colors smoothly with tones. (in other words - dioganally)
gradient.addColorStop(0,'blue'); //starts from blue in the middle turns to magenta and at the end it becomes cyan smoothly.
gradient.addColorStop(0.5,'magenta');
gradient.addColorStop(1,'cyan');
ctx.fillStyle=gradient; //particles will be filled with what gradient variable carries
console.log(ctx); //for experimenting. nothing special

class Particle { //how circles look like and behave
    constructor(effect){
        this.effect=effect;
        this.radius=15;
        this.x=this.radius+Math.random()*(this.effect.width-this.radius*2); //making particles visible in the screen fully.
        this.y=this.radius+Math.random()*(this.effect.height-this.radius*2);
        this.vx=Math.random()*1-0.5;  //making some of circles start from another direction than others  
        this.vy=Math.random()*1-0.5;   
    }
    draw(context){ //how circles look like
        context.beginPath();
        context.arc(this.x, this.y, this.radius,0,Math.PI*2); //it starts drawing with previous line starting from the center of circle (x;y) then continues from 0 degrees to 360 degrees, therefore completing circle.
        context.fill(); //fills the path
    }
    update(){ //will work over and over again.
        this.x+=this.vx;
        if (this.x>this.effect.width-this.radius||this.x<this.radius)this.vx*=-1;
        this.y+=this.vy; //also this allows the circles to move in every directions
        if (this.y>this.effect.height-this.radius||this.y<this.radius)this.vy*=-1; //when the edges of the circles reaches the edges of canva they return on the opposite direction.
    }

}

class Effect{
    constructor(canvas){
        this.canvas=canvas;
        this.width=this.canvas.width; //ensuring that Effect class has access to the canvas's dimensions
        this.height=this.canvas.height;
        this.particles=[]; //circles are being stored here
        this.numberOfParticles=200;
        this.createParticles(); //triggering the method
    }
    createParticles(){ //creates once - the number of particles we wrote in constructor
        for (let i=0; i<this.numberOfParticles;i++){
            this.particles.push(new Particle(this)); //adding at the end of the array-particle a new circle. 'this' argument connects particle with whole effect object.
        };
    }
    handleParticles(context){
        this.particles.forEach(particle =>{ //executes the function to every element of the array
            particle.draw(context);
            particle.update();
        });
    }
}
const effect=new Effect(canvas); //effects object contains canvas reference via this line

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height); //clearing the effects of the animation. with this only current animation frame is visible
    effect.handleParticles(ctx); //animates in a loop
    requestAnimationFrame(animate); //providing efficient fps for browser
}
animate();