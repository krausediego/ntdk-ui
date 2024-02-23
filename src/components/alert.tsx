import * as React from "react";
import { Text, View } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils";

const alertVariants = tv({
  base: "relative w-full rounded-lg border border-border px-4 py-3 text-sm",
  variants: {
    variant: {
      default: "bg-background",
      destructive:
        "border-destructive/50 text-destructive dark:border-destructive ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertTitleVariants = tv({
  base: "mb-1 font-bold leading-none tracking-tight ",
  variants: {
    variant: {
      default: "text-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertDescriptionVariants = tv({
  base: "text-sm font-medium",
  variants: {
    variant: {
      default: "text-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AlertContextValue = VariantProps<typeof alertVariants>;

const AlertContext = React.createContext<AlertContextValue>(
  {} as AlertContextValue
);

const useAlert = () => {
  const { variant } = React.useContext(AlertContext);

  return {
    variant,
  };
};

const Alert = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <AlertContext.Provider value={{ variant }}>
      <View
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    </AlertContext.Provider>
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { variant } = useAlert();

  return (
    <Text
      ref={ref}
      className={cn(alertTitleVariants({ variant }), className)}
      {...props}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { variant } = useAlert();

  return (
    <Text
      ref={ref}
      className={cn(alertDescriptionVariants({ variant }), className)}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
