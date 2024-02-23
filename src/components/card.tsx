import * as React from "react";

import { cn } from "../lib/utils";
import { Text, View } from "react-native";

const Card = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-card shadow",
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn(
        "font-semibold leading-none tracking-tight text-card-foreground",
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn("pt-4", className)} {...props} />;
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn("pt-4", className)} {...props} />;
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
