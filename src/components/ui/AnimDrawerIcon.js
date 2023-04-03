import { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../animations/drawerIcon/data";
const AnimDrawerIcon = (props) => {
  const lottieRef = useRef();
  const [drawerIsClose, setDrawerIsClose] = useState(true);
  const { open } = props;

  useEffect(() => {
    if (open && drawerIsClose) {
      lottieRef.current.playSegments([0, 50], true);
      setDrawerIsClose(false);
    } else if (!open && !drawerIsClose) {
      lottieRef.current.playSegments([50, 90], true);
      setDrawerIsClose(true);
    }
  }, [open, drawerIsClose]);
  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      autoplay={false}
      loop={false}
    />
  );
};

export default AnimDrawerIcon;
