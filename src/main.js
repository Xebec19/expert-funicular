import kaplay from "kaplay";
import "kaplay/global";

const k = kaplay();

setBackground(141, 183, 255);

const SPEED = 320;

k.loadSprite("player", "sprites/ball2.png");
k.loadSprite("enemy", "sprites/ball3.png");
k.loadSprite("floor", "sprites/floor.png");

function gameOver() {
  k.add([text("Game Over", 32), pos(width() / 2, height() / 2)]);

  setTimeout(() => {
    go("game");
  }, 4000);
}

scene("game", () => {
  setGravity(1600);

  const player = k.add([sprite("player"), pos(3), area(), body()]);

  for (let i = 0; i < 3; i++) {
    const x = rand(0, width());

    k.add([sprite("enemy"), pos(x), area(), body(), "enemy"]);
  }

  onKeyDown("left", () => {
    if (player.pos.x < 3) {
      return;
    }
    player.move(-SPEED, 0);
  });

  onKeyDown("right", () => {
    if (player.pos.x > width() - 100) {
      return;
    }
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

  player.onCollide("enemy", (enemy) => {
    addKaboom(player.pos);
    destroy(player);
    gameOver();
  });
});

go("game");
