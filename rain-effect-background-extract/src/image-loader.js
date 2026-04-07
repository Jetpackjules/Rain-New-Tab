function loadImage(src, i, onLoad) {
  return new Promise(function (resolve, reject) {
    if (typeof src == "string") {
      src = {
        name: "image" + i,
        src: src
      };
    }

    var img = new Image();
    img.crossOrigin = "anonymous"; // Set the crossorigin attribute to anonymous for CORS
    src.img = img;

    img.addEventListener("load", function (event) {
      if (typeof onLoad == "function") {
        onLoad.call(null, img, i);
      }
      resolve(src);
    });

    img.addEventListener("error", function (event) {
      reject(new Error("Image failed to load: " + src.src));
    });

    img.src = src.src;
  });
}

function loadImages(images, onLoad) {
  return Promise.all(images.map(function (src, i) {
    return loadImage(src, i, onLoad);
  }));
}

function ImageLoader(images, onLoad) {
  return new Promise(function (resolve, reject) {
    loadImages(images, onLoad).then(function (loadedImages) {
      var r = {};
      loadedImages.forEach(function (curImage) {
        r[curImage.name] = {
          img: curImage.img,
          src: curImage.src
        };
      });
      resolve(r);
    }).catch(function (error) {
      reject(error);
    });
  });
}

module.exports = ImageLoader;

