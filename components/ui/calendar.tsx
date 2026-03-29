"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import "react-day-picker/dist/style.css";

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
  "p-3 rounded-md border shadow-sm bg-white text-gray-800", // w-[240px] removed
  className
)}
      classNames={{
        months: "flex flex-col space-y-2",
        month: "space-y-2",
        caption:
          "flex justify-between items-center px-1 text-xs font-semibold text-gray-700",
        caption_label: "text-xs font-medium",
        nav: "flex items-center space-x-1",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-5 w-5 p-0 text-gray-600 hover:text-black"
        ),
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7",
        head_cell:
          "text-[10px] font-medium text-gray-500 text-center w-7 h-5 flex items-center justify-center",
        row: "grid grid-cols-7 gap-y-1",
        cell: "relative w-7 h-7 flex items-center justify-center",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-7 h-7 text-[11px] font-normal rounded-full aria-selected:opacity-100"
        ),
        day_selected:
          "bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700",
        day_today:
          "border border-blue-500 text-blue-600 font-semibold rounded-full",
        day_outside: "text-gray-400 opacity-40",
        day_disabled: "text-gray-400 opacity-40 line-through",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
