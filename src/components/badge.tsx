import * as React from "react";
import { Text, View } from "react-native";
import { cn } from "../lib/utils";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "flex flex-row items-center rounded-md border px-2 py-1",
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
      destructive: "bg-destructive",
      outline: "border-border bg-background",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const badgeLabelVariants = tv({
  base: "text-xs font-semibold",
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const useBadge = () => {
  const { variant } = React.useContext(BadgeContext);

  return { variant };
};

type BadgeContextValue = VariantProps<typeof badgeVariants>;

const BadgeContext = React.createContext<BadgeContextValue>(
  {} as BadgeContextValue
);

const Badge = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof badgeVariants>
>(({ variant, className, ...props }, ref) => {
  return (
    <BadgeContext.Provider value={{ variant }}>
      <View
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    </BadgeContext.Provider>
  );
});
Badge.displayName = "Badge";

const BadgeLabel = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { variant } = useBadge();

  return (
    <Text
      ref={ref}
      className={cn(badgeLabelVariants({ variant }), className)}
      {...props}
    />
  );
});
BadgeLabel.displayName = "BadgeLabel";

export { Badge, BadgeLabel };
