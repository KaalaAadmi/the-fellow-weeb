import Image from "next/image";
import { useState } from "react";
export default function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 1.5,
  imageAlt,
  square = false,
}: {
  src: string;
  width?: string;
  height?: string;
  magnifierHeight?: number;
  magnifieWidth?: number;
  zoomLevel?: number;
  imageAlt: string;
  square: boolean;
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width,
      }}
    >
      <Image
        src={src}
        style={{ borderRadius: "0.5rem" }}
        height={height}
        width={width}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false);
        }}
        alt={imageAlt || "Image"}
      />

      <div
        style={
          square
            ? {
                display: showMagnifier ? "" : "none",
                position: "absolute",

                // prevent magnifier blocks the mousemove event of img
                pointerEvents: "none",
                // set size of magnifier
                height: `${magnifierHeight}px`,
                width: `${magnifieWidth}px`,
                // move element center to cursor pos

                top: `${y - magnifierHeight / 2}px`,
                left: `${x - magnifieWidth / 2}px`,
                opacity: "1", // reduce opacity so you can verify position
                border: "1px solid lightgray",
                backgroundColor: "white",
                backgroundImage: `url('${src}')`,
                backgroundRepeat: "no-repeat",

                //calculate zoomed image size
                backgroundSize: `${imgWidth * zoomLevel}px ${
                  imgHeight * zoomLevel
                }px`,

                //calculate position of zoomed image.
                backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                backgroundPositionY: `${
                  -y * zoomLevel + magnifierHeight / 2
                }px`,
              }
            : {
                display: showMagnifier ? "" : "none",
                position: "absolute",

                // prevent magnifier blocks the mousemove event of img
                pointerEvents: "none",
                // set size of magnifier
                height: `${magnifierHeight}px`,
                width: `${magnifieWidth}px`,
                borderRadius: "50%",
                // move element center to cursor pos

                top: `${y - magnifierHeight / 2}px`,
                left: `${x - magnifieWidth / 2}px`,
                opacity: "1", // reduce opacity so you can verify position
                border: "1px solid lightgray",
                backgroundColor: "white",
                backgroundImage: `url('${src}')`,
                backgroundRepeat: "no-repeat",

                //calculate zoomed image size
                backgroundSize: `${imgWidth * zoomLevel}px ${
                  imgHeight * zoomLevel
                }px`,

                //calculate position of zoomed image.
                backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                backgroundPositionY: `${
                  -y * zoomLevel + magnifierHeight / 2
                }px`,
              }
        }
      ></div>
    </div>
  );
}
