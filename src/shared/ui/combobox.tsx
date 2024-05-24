"use client";

import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { useState } from "react";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from "./command";
import { cn } from "./utils";
import { Separator } from "./separator";

type Option<T> = {
  value: T;
  label: string;
};

export const Combobox = <T extends string | number>({
  options,
  onChange,
  value,
  placeholder,
  isPending,
  ref,
  className,
  renderOption: renderValue,
}: {
  options: Option<T>[];
  onChange: (value: T) => void;
  value?: T;
  placeholder?: string;
  isPending?: boolean;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  className?: string;
  renderOption?: (value: Option<T>) => React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const getOptionView = (option?: Option<T>, fallback?: string) => {
    if (renderValue && option) return renderValue(option);
    if (option) return option.label;
    return fallback;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isPending}
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[250px] justify-between overflow-hidden relative",
            className,
          )}
        >
          {isPending && (
            <Spinner className="mr-2 h-4 w-4" aria-label="Загрузка" />
          )}
          {!isPending &&
            getOptionView(
              options.find((o) => o.value === value),
              placeholder,
            )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 absolute right-[16px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>Ничего не найдено :(</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <>
                <CommandItem
                  key={option.label}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {getOptionView(option)}
                </CommandItem>
                <Separator orientation="horizontal" />
              </>
            ))}
            {options.length === 0 && <CommandItem disabled>Пусто</CommandItem>}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
