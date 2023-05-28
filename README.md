# Software Studio 2023 Spring Assignment 2

### Scoring

|  **Basic Component**  | **Score** | **Check** |
|:---------------------:|:---------:|:---------:|
| Membership Mechanism  |    10%    |     N     |
| Complete Game Process |    5%     |     N     |
|      Basic Rules      |    45%    |     N     |
|      Animations       |    10%    |     N     |
|     Sound Effects     |    10%    |     N     |
|          UI           |    10%    |     N     |

|   **Advanced Component**   | **Score** | **Check** |
|:--------------------------:|:---------:|:---------:|
|        Leaderboard         |    5%     |     N     |
| Offline multi-player game  |    5%     |     N     |
|  Online multi-player game  |    15%    |     N     |
| Others [name of functions] |   1-15%   |     N     |

---

## Basic Components Description :

### Membership Mechanism

On the main page there are two buttons
![](.README_images/34eca4be.png)

##### Sign in :

![](.README_images/a002c947.png)

##### Sign Up :

![](.README_images/672bd023.png)

### Complete Game Process

##### Start Menu

![](.README_images/a101348f.png)

##### Level Select

![](.README_images/8fff0ce6.png)

##### Game View

###### Game Start (Game is loading)

![](.README_images/530244e1.png)

###### In Game

![](.README_images/7146e281.png)

###### Game Over (win)

when user reach the end of the map, game over, and the user win
![](.README_images/a0d46486.png)

###### Game Over (lose)

if user's life is 0, game over
![](.README_images/dc254b4b.png)

### Basic Rules

##### World Map

###### Correct physics properties

Here is some example of the correct physics properties

- Falling coin and mushroom
  ![qblock.gif](.README_images%2Fqblock.gif)

###### Background & Camera move with player

![camera.gif](.README_images%2Fcamera.gif)

###### At least two different world maps
There are two maps
1. Level1
![](.README_images/f0c2d295.png)
2. Level2
![img.png](.README_images%2Fimg.png)
##### Level Design

###### The scene should have “Static” wall

The green rectangle is the static wall, and it's invisible in the game
The enemy can't pass through the static wall
![](.README_images/f33232ba.png)

There is also a static wall on the left of the map, it can prevent user from falling out of the map
![](.README_images/45f3ef15.png)

###### Question Blocks

The question block can generate two different items, coin and mushroom
The coin will fall down after it's generated, if it touches the ground, it'll fall down and user gets the coin
![qblock.gif](.README_images%2Fqblock.gif)

##### Player

###### Player should have correct physics properties.

###### User can control the player to move and jump by keyboard.

The player is movable, by pressing WSD, the player can move left, right and jump
![螢幕錄影 2023-05-28 下午9.32.07.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%889.32.07.gif)

###### Player touch enemy

If player touch enemy, player will lose one life  
![螢幕錄影 2023-05-28 下午9.34.35.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%889.34.35.gif)

###### Out of the bounds, the number of its life will decrease.

The user falls down, and the life decrease from 3 to 2  
![螢幕錄影 2023-05-28 下午9.41.00.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%889.41.00.gif)

###### Reborn

After the player lose one life, the player will reborn at the start point  
![螢幕錄影 2023-05-28 下午9.41.00.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%889.41.00.gif)

##### Enemies:

###### Enemies should have correct physics properties.

###### At least two different types of enemies.

Requirements:

- There must be significant difference between different types of enemies.
- Only when player hits on their heads can kill them.

1. Mushroom

- The mushroom will move left and right, and it will change direction when it touches the wall
- The user will lose one life if the user touches the mushroom
- The mushroom will die if the user jumps on it
  ![螢幕錄影 2023-05-28 下午9.44.53.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%889.44.53.gif)

2. Flower
   The flower will generate some bullets, if the user touches the bullet, his life will decrease.  
   Also, if you touched the flower itself, you will lose one life
   But if you jump on the flower, you will kill the flower, and it won't generate bullet anymore
   ![螢幕錄影 2023-05-28 下午11.15.16.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%8811.15.16.gif)

##### Question Blocks

###### At least two different types of blocks.

1. Coin Question Block
   It can generate coins, and the coins will fall down after it's generated, if it touches the ground, it'll fall down
   and user gets the coin  
   ![qblock.gif](.README_images%2Fqblock.gif)

2. Mushroom Generator
   It can generate mushroom, and the mushroom will move left and right, and it will change direction when it touches the
   wall  
   ![qblock.gif](.README_images%2Fqblock.gif)

The question block will be randomly chosen from the two types of question blocks above

##### Animations (10%)

###### Player has walk & jump animations (5%)

![螢幕錄影 2023-05-28 下午9.56.09.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%889.56.09.gif)

###### Enemies Animation (each for 2%, up to 5%)

- Mushroom Animation
  ![螢幕錄影 2023-05-28 下午10.05.57.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%8810.05.57.gif)

- Flower Animation
- ![螢幕錄影 2023-05-28 下午11.15.16.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%8811.15.16.gif)

##### Sound Effects (10%)

###### At least one BGM (2%)
OK
###### Player Jump & die sound effects (3%)
OK
###### Additional sound effects (each for 1%, up to 5%)
- Get a coin
- user lost life
- mushroom die
- player got hurt
- the bullet hit the player
###### All sound effects can’t stop BGM
OK
##### UI (10%)

###### Player life(the number of life must be able to read & write on firebase) (3%)
###### Player score(the score must be able to read & write on firebase)  (5%)
###### Timer (2%)
![螢幕錄影 2023-05-28 下午11.36.28.gif](.README_images%2F%E8%9E%A2%E5%B9%95%E9%8C%84%E5%BD%B1%202023-05-28%20%E4%B8%8B%E5%8D%8811.36.28.gif)

# Firebase page link
https://ss-as3-mario.web.app/