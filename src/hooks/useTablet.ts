import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Dimensions, PixelRatio } from "react-native";

const isTabletAtom = atom(false);

export function useListenTabletChange() {
    const setIsTablet = useSetAtom(isTabletAtom);
    useEffect(() => {
        const check = () => {
            const { width, height } = Dimensions.get("window");
            const scale = PixelRatio.get();
            const widthDp = width / scale;
            const heightDp = height / scale;
            const smallestDp = Math.min(widthDp, heightDp);
            setIsTablet(smallestDp >= 600);
        };
        check();
        const subscription = Dimensions.addEventListener("change", check);
        return () => subscription?.remove();
    }, [setIsTablet]);
}

export default function useIsTablet() {
    return useAtomValue(isTabletAtom);
}
