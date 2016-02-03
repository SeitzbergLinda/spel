
var game = new Phaser.Game(1300, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'sky.png');
    game.load.image('ground', 'platform.png');
    game.load.image('star', 'carrot.png');
    game.load.image('mushroom', 'house.png');
	game.load.image('moln', 'moln.png');
    game.load.spritesheet('dude', 'dude2.png', 32, 48);
   

}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;


function create() {

       game.physics.startSystem(Phaser.Physics.ARCADE);

   
    game.add.sprite(0, 0, 'sky');

 	game.add.sprite(500, 50, 'moln');
    
    var test = game.add.sprite(900, 265, 'mushroom');
   


    platforms = game.add.group();

    platforms.enableBody = true;

    
    var ground = platforms.create(0, game.world.height - 64, 'ground');


    ground.scale.setTo(4, 2);

  
    ground.body.immovable = true;


    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

   
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    
    game.physics.arcade.enable(player);


    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

  
    stars = game.add.group();
	stars.enableBody = true;


    for (var i = 0; i < 20; i++)
    {
       
        var star = stars.create(i * 70, 0, 'star');

       
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    scoreText = game.add.text(16, 16, 'Morötter: 0', { fontSize: '32px', fill: '#FF8C00' });

    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);


    game.physics.arcade.overlap(player, stars, collectStar, null, this);


    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
       
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
       
        player.animations.stop();

        player.frame = 4;
    }
    

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Samlade morötter: ' + score;

}
