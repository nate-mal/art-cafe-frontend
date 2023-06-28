import ImageKit from "../../../ImageKit";
// import {
//   isImageFitCover,
//   isImageSlide,
//   useLightboxProps,
// } from "yet-another-react-lightbox";

// function isNextJsImage(slide) {
//   return (
//     isImageSlide(slide) &&
//     typeof slide.width === "number" &&
//     typeof slide.height === "number"
//   );
// }

export default function NextJsImage({ slide, rect }) {
  console.log("slide", slide[0]);
  // const { imageFit } = useLightboxProps().carousel;
  // const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  // if (!isNextJsImage(slide)) return undefined;

  // const width = !cover
  //   ? Math.round(
  //       Math.min(rect.width, (rect.height / slide.height) * slide.width)
  //     )
  //   : rect.width;

  // const height = !cover
  //   ? Math.round(
  //       Math.min(rect.height, (rect.width / slide.width) * slide.height)
  //     )
  //   : rect.height;

  return (
    <ImageKit
      alt=""
      src={slide.substring(slide.lastIndexOf("/") + 1)}
      width={800}
      height={800}
      // loading="eager"
      // draggable={false}
      // placeholder={slide.blurDataURL ? "blur" : undefined}
      // style={{ objectFit: cover ? "cover" : "contain" }}
      // sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
    />
  );
}
// import Image from "next/image";
// import {
//   isImageFitCover,
//   isImageSlide,
//   useLightboxProps,
// } from "yet-another-react-lightbox";

// function isNextJsImage(slide) {
//   return (
//     isImageSlide(slide) &&
//     typeof slide.width === "number" &&
//     typeof slide.height === "number"
//   );
// }

// export default function NextJsImage({ slide, rect }) {
//   const { imageFit } = useLightboxProps().carousel;
//   const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

//   if (!isNextJsImage(slide)) return undefined;

//   const width = !cover
//     ? Math.round(
//         Math.min(rect.width, (rect.height / slide.height) * slide.width)
//       )
//     : rect.width;

//   const height = !cover
//     ? Math.round(
//         Math.min(rect.height, (rect.width / slide.width) * slide.height)
//       )
//     : rect.height;

//   return (
//     <div style={{ position: "relative", width, height }}>
//       <Image
//         fill
//         alt=""
//         src={slide}
//         loading="eager"
//         draggable={false}
//         placeholder={slide.blurDataURL ? "blur" : undefined}
//         style={{ objectFit: cover ? "cover" : "contain" }}
//         sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
//       />
//     </div>
//   );
// }
