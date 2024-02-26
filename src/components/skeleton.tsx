import * as React from "react";

import { cn } from "../lib/utils";
import { View, Animated } from "react-native";

const Skeleton = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const animateRef = React.useRef(new Animated.Value(0.5)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animateRef, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animateRef, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animateRef]);

  return (
    <Animated.View
      ref={ref}
      className={cn("bg-muted rounded-md", className)}
      style={[{ opacity: animateRef }]}
      {...props}
    />
  );
});
Skeleton.displayName = "Skeleton";

export { Skeleton };
