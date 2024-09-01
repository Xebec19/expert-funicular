import kaplay from "kaplay";
import "kaplay/global";

const k = kaplay();

const SPEED = 320;

k.loadSprite("player", "sprites/ball2.png");
k.loadSprite("enemy", "sprites/ball3.png");
k.loadSprite("floor", "sprites/floor.png");

setGravity(1600);

const player = k.add([sprite("player"), pos(3), area(), body()]);

for (let i = 0; i < 3; i++) {
  const x = rand(0, width());

  k.add([sprite("enemy"), pos(x), area(), body()]);
}

onKeyDown("left", () => {
  player.move(-SPEED, 0);
});

onKeyDown("right", () => {
  player.move(SPEED, 0);
});

onKeyPress("space", () => {
  if (player.isGrounded()) {
    player.jump();
  }
});

k.add([
  rect(width(), 48),
  outline(4),
  area(),
  pos(0, height() - 48),
  body({
    isStatic: true,
  }),
]);
