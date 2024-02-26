import * as React from "react";

import { tv, type VariantProps } from "tailwind-variants";
import { Text, TouchableOpacity } from "react-native";

import { cn } from "../lib/utils";

const buttonVariants = tv({
  base: "flex flex-row items-center justify-center rounded-md",
  variants: {
    variant: {
      default: "bg-primary hover:bg-primary/90",
      secondary: "bg-secondary hover:bg-secondary/90",
      destructive: "bg-destructive hover:bg-destructive/90",
      outline: "border border-input bg-background",
      ghost: "hover:bg-accent",
      link: " hover:underline",
    },
    size: {
      default: "h-10 px-4",
      sm: "h-8 px-2",
      lg: "h-12 px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = tv({
  base: "text-center font-medium",
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-accent",
      ghost: "text-accent-foreground",
      link: "text-primary underline underline-offset-4",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-xl",
      icon: "hidden",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const useButton = () => {
  const { variant, size } = React.useContext(ButtonContext);

  return {
    variant,
    size,
  };
};

type ButtonContextValue = VariantProps<typeof buttonVariants>;

const ButtonContext = React.createContext<ButtonContextValue>(
  {} as ButtonContextValue
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  (
    { children, variant, size, className, activeOpacity = 0.7, ...props },
    ref
  ) => {
    return (
      <ButtonContext.Provider value={{ variant, size }}>
        <TouchableOpacity
          ref={ref}
          activeOpacity={activeOpacity}
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </TouchableOpacity>
      </ButtonContext.Provider>
    );
  }
);
Button.displayName = "Button";

const ButtonLabel = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, children }, ref) => {
  const { variant, size } = useButton();

  return (
    <Text
      className={cn(buttonTextVariants({ variant, size }), className)}
      ref={ref}
    >
      {children}
    </Text>
  );
});
ButtonLabel.displayName = "ButtonLabel";

export { Button, ButtonLabel, buttonVariants, buttonTextVariants };
