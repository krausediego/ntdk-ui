import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  orientation?: "horizontal" | "vertical";
}

const Separator = React.forwardRef<View, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          "shrink-0 bg-border",
          { "w-full h-[1px]": orientation === "horizontal" },
          { "w-[1px] h-full": orientation === "vertical" },
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
