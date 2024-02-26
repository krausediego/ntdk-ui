import * as React from "react";

import { cn } from "../lib/utils";
import { Text, TouchableOpacity, View } from "react-native";

import { ButtonProps, buttonVariants } from "./button";
import { Icon } from "./icon";

const Pagination = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("flex w-full justify-center", className)}
      {...props}
    />
  );
});
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
});
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn("", className)} {...props} />;
});
PaginationItem.displayName = "PagiantionItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const PaginationLink = React.forwardRef<TouchableOpacity, PaginationLinkProps>(
  ({ className, children, isActive, size = "icon", ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className={cn(
          buttonVariants({ variant: isActive ? "outline" : "ghost", size })
        )}
        {...props}
      >
        <Text className={cn("text-accent-foreground", className)}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<
  TouchableOpacity,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity>
>(({ className, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      className={cn("flex flex-row items-center", className)}
      {...props}
    >
      <Icon name="ChevronLeft" className="h-6 w-6 text-accent-foreground" />
      <Text>Previous</Text>
    </TouchableOpacity>
  );
});
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  TouchableOpacity,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity>
>(({ className, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      className={cn("flex flex-row items-center", className)}
      {...props}
    >
      <Text>Next</Text>
      <Icon name="ChevronRight" className="h-6 w-6 text-accent-foreground" />
    </TouchableOpacity>
  );
});
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <Icon name="MoreHorizontal" className="h-6 w-6 text-accent-foreground" />
      <Text className="sr-only">More pages</Text>
    </View>
  );
});
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
