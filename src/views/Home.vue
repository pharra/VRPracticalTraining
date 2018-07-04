<template>
<canvas id="renderCanvas">
</canvas>
</template>

<script>
// @ is an alias to /src
import {Game} from '@/Game';

window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    const game = new Game('renderCanvas');

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.doRender();
});

export default {
  name: 'home',
  components: {
    Game,
  },
};
</script>

<style>
html,
body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#renderCanvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
