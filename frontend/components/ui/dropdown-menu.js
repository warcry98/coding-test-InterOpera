"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuContent = (props) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      {...props}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 shadow-md animate-in fade-in-80",
        props.className
      )}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuItem = ({ className, ...props }) => (
  <DropdownMenuPrimitive.Item
    {...props}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      props.disabled && "pointer-events-none opacity-50",
      className
    )}
  />
);

export const DropdownMenuCheckboxItem = ({ className, checked, children, ...props }) => (
  <DropdownMenuPrimitive.CheckboxItem
    {...props}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className
    )}
    checked={checked}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

export const DropdownMenuRadioItem = ({ className, children, ...props }) => (
  <DropdownMenuPrimitive.RadioItem
    {...props}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className
    )}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

export const DropdownMenuLabel = ({ className, inset, ...props }) => (
  <DropdownMenuPrimitive.Label
    {...props}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", props.className)}
  />
);

export const DropdownMenuSeparator = ({ className, ...props }) => (
  <DropdownMenuPrimitive.Separator
    {...props}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
  />
);

export const DropdownMenuShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
);

export const DropdownMenuSubTrigger = ({ className, inset, children, ...props }) => (
  <DropdownMenuPrimitive.SubTrigger
    {...props}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className
    )}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
);

export const DropdownMenuSubContent = ({ className, ...props }) => (
  <DropdownMenuPrimitive.SubContent
    {...props}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 shadow-md animate-in slide-in-from-left-1 fade-in-80",
      className
    )}
  />
);
