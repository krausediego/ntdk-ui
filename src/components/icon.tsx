import * as React from "react";
import { cssInterop } from "nativewind";

import { icons } from "lucide-react-native";
import { cn } from "../lib/utils";

interface Icon {
  name: keyof typeof icons;
  className?: string;
}

const Icon = ({ name, className }: Icon) => {
  const LucideIconSelected = icons[name];

  cssInterop(LucideIconSelected, {
    className: {
      target: "style",
      nativeStyleToProp: { height: true, width: true },
    },
  });

  return <LucideIconSelected className={cn("", className)} />;
};

export { Icon };
