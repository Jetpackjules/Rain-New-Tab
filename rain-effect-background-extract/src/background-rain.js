import RainRenderer from "./rain-renderer";
import Raindrops from "./raindrops";
import loadImages from "./image-loader";
import createCanvas from "./create-canvas";

const BACKGROUND_IDS = [1, 8, 15];

function dailyBackgroundId() {
  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  return BACKGROUND_IDS[seed % BACKGROUND_IDS.length];
}

export async function startRainBackground({
  canvas = document.getElementById("rain-canvas"),
  assetBase = "/assets/img",
  backgroundId = dailyBackgroundId(),
  onError = console.error,
} = {}) {
  if (!canvas) {
    throw new Error("startRainBackground expected a canvas element.");
  }

  const images = await loadImages([
    { name: "dropAlpha", src: `${assetBase}/drop-alpha.png` },
    { name: "dropColor", src: `${assetBase}/drop-color.png` },
    { name: "textureRainFg", src: `${assetBase}/rotation/image-${backgroundId}-fg.png` },
    { name: "textureRainBg", src: `${assetBase}/rotation/image-${backgroundId}-bg.png` },
  ]).catch((error) => {
    onError(error);
    throw error;
  });

  const dpi = window.devicePixelRatio || 1;

  function resizeCanvas() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    canvas.width = width * dpi;
    canvas.height = height * dpi;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  resizeCanvas();

  const raindrops = new Raindrops(
    canvas.width,
    canvas.height,
    dpi,
    images.dropAlpha.img,
    images.dropColor.img,
    {
      trailRate: 1,
      trailScaleRange: [0.2, 0.45],
      collisionRadius: 0.45,
      dropletsCleaningRadiusMultiplier: 0.28,
    }
  );

  const textureFg = createCanvas(96, 64);
  const textureFgCtx = textureFg.getContext("2d");
  const textureBg = createCanvas(384, 256);
  const textureBgCtx = textureBg.getContext("2d");

  textureFgCtx.drawImage(images.textureRainFg.img, 0, 0, 96, 64);
  textureBgCtx.drawImage(images.textureRainBg.img, 0, 0, 384, 256);

  const renderer = new RainRenderer(canvas, raindrops.canvas, textureFg, textureBg, null, {
    brightness: 1.04,
    alphaMultiply: 6,
    alphaSubtract: 3,
  });

  window.addEventListener("resize", () => {
    resizeCanvas();
    renderer.resize();
    raindrops.resize(canvas.width, canvas.height);
  });

  return { renderer, raindrops, backgroundId };
}

