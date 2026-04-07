# Rain Effect Background Extract

This folder contains the rain background pieces from the Chrome extension without the extension UI, weather code, settings menu, or Chrome-specific manifest files.

## What to Give Another AI

Give it this whole folder:

- `src/background-rain.js` - small integration entry point.
- `src/rain-renderer.js` - WebGL renderer for the refracted background.
- `src/raindrops.js` - canvas droplet simulation.
- `src/webgl.js`, `src/gl-obj.js`, `src/create-canvas.js`, `src/image-loader.js`, `src/random.js`, `src/times.js` - helper modules.
- `src/shaders/simple.vert` and `src/shaders/water.frag` - shaders used by the renderer.
- `assets/img/drop-alpha.png` and `assets/img/drop-color.png` - raindrop textures.
- `assets/img/rotation/image-{1,8,15}-{fg,bg}.png` - three background/foreground pairs.
- `demo.html` - minimal example structure.

## Integration Notes

The original project uses Browserify and `glslify`. If the target site uses Vite, Next, Webpack, or another bundler, the next AI may need to adapt shader loading in `src/rain-renderer.js`.

The expected DOM is just:

```html
<canvas id="rain-canvas"></canvas>
```

Then call:

```js
import { startRainBackground } from "./src/background-rain.js";

startRainBackground({
  canvas: document.getElementById("rain-canvas"),
  assetBase: "/assets/img",
});
```

The canvas should be `position: fixed; inset: 0; width: 100%; height: 100%;` and site content should sit above it with a higher `z-index`.

## Backgrounds

The included background ids are `1`, `8`, and `15`. To add more, copy both files for a pair:

- `image-N-bg.png`
- `image-N-fg.png`

Then add `N` to `BACKGROUND_IDS` in `src/background-rain.js`.

