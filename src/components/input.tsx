import * as React from "react";

import { cn } from "../lib/utils";
import { TextInput } from "react-native";

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  onChange?: (...event: any[]) => void;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        onChangeText={onChange}
        className={cn(
          "flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm disabled:opacity-50 placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
