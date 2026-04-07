# AI Handoff Prompt

Use the files in this folder to add a fullscreen animated rain-on-glass background to a website.

Keep the site content separate from the rain canvas:

- Render a fullscreen fixed `<canvas id="rain-canvas"></canvas>`.
- Put normal page content above it with `position: relative` and `z-index: 1`.
- Use `src/background-rain.js` as the entry point.
- The rain code needs the helper modules and shader files under `src/`.
- The image assets live under `assets/img/`.

Important implementation detail: `src/rain-renderer.js` currently imports shaders through `glslify`, matching the original project. If the target website uses a different bundler, adapt only the shader import/loading layer and keep the renderer behavior intact.

