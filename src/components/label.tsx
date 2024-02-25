import * as React from "react";

import { cn } from "../lib/utils";
import { Text } from "react-native";

const Label = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn("text-lg font-medium leading-none", className)}
      {...props}
    />
  );
});
Label.displayName = "Label";

export { Label };
