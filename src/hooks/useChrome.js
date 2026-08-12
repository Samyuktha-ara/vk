import { useContext, useEffect } from "react";
import { ChromeContext } from "../context/chromeStore";

/** Read and control shared chrome state. */
export const useChrome = () => useContext(ChromeContext);

/** Call from any page that opens with a dark full-bleed hero. */
export function useImmersiveHero(active = true) {
  const { setImmersive } = useChrome();

  useEffect(() => {
    setImmersive(active);
    return () => setImmersive(false);
  }, [active, setImmersive]);
}

export default useChrome;
