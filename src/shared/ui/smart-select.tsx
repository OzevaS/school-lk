"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from "./command";
import { Button } from "./button";
import { cn } from "./utils";
import { useState } from "react";
import { Spinner } from "./spinner";

type Option<T> = {
  value: T;
  label: string;
};

export function SmartSelect<T extends string | number>({
  placeholder,
  onChange,
  value,
  ref,
  options,
  isPending,
}: {
  placeholder?: string;
  onChange: (value: T) => void;
  value?: T;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  options: Option<T>[];
  isPending?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState<T>();

  const getValueView = (value?: T) => {
    if (!value && !localValue) return placeholder;

    return options.find(
      (option) => option.value === value || option.value === localValue,
    )?.label;
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
          className="w-[250px] justify-between overflow-hidden relative"
        >
          {isPending ? (
            <Spinner className="mr-2 h-4 w-4" aria-label="Загрузка" />
          ) : (
            getValueView(value ?? localValue)
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 absolute right-[16px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>Ничего не найдено :(</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.label}
                value={option.label}
                onSelect={() => {
                  onChange(option.value);
                  setLocalValue(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    option.value === value || option.value === localValue
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
            {options.length === 0 && <CommandItem disabled>Пусто</CommandItem>}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SmartSelect;
