import * as React from "react";
import { Image, Text, View } from "react-native";
import { cn } from "../lib/utils";

const Avatar = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        "flex relative h-14 w-14 items-center justify-center shrink-0 overflow-hidden rounded-full bg-border",
        className
      )}
      {...props}
    />
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  Image,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => {
  return (
    <Image
      ref={ref}
      className={cn("aspect-square absolute z-10 h-full w-full", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn("text-lg text-primary", className)}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
