import Image from "next/image";

const imageKitLoader = ({ src, width, quality }) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  var urlEndpoint = "https://ik.imagekit.io/artcafe";
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

const ImageKit = ({ src, alt, width, height }) => {
  return (
    <Image
      loader={imageKitLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default ImageKit;
