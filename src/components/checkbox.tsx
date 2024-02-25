import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";

import { cn } from "../lib/utils";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

const Checkbox = React.forwardRef<TouchableOpacity, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = () => {
      onCheckedChange && onCheckedChange(!checked);
    };

    return (
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity
          ref={ref}
          className={cn(
            "h-6 w-6 border border-border rounded bg-background flex justify-center items-center",
            { "bg-foreground": checked },
            className
          )}
          onPress={handleChange}
          {...props}
        >
          {checked && <Text className="text-background font-medium">✓</Text>}
        </TouchableOpacity>
      </View>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
