// @ts-ignore

const requireImages = require.context(
  "../img",
  false,
  /\.(png|jpe?g|webp|svg)$/
);

const imagensDestaques: string[] = requireImages
  .keys()
  .map((key: string) => requireImages(key));

console.log("Imagens carregadas:", imagensDestaques);

export default imagensDestaques;
