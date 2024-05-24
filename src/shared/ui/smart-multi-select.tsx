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
import { Spinner } from "./spinner";

type Option<T> = {
  value: T;
  label: string;
};

export function SmartMultiSelect<T extends string | number>({
  placeholder,
  onChange,
  value,
  ref,
  options,
  isPending,
}: {
  placeholder?: string;
  onChange: (value: T[]) => void;
  value: T[];
  ref?: React.ForwardedRef<HTMLButtonElement>;
  options: Option<T>[];
  isPending?: boolean;
}) {
  const getValueView = (value: T[]) => {
    if (value.length === 0) return placeholder;

    if (value.length === 1) {
      return options.find((option) => option.value === value[0])?.label;
    }
    return `${value.length} выбрано`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isPending}
          ref={ref}
          variant="outline"
          role="combobox"
          className="w-[250px] justify-between relative overflow-hidden"
        >
          {isPending ? (
            <Spinner className="mr-2 h-4 w-4" aria-label="Загрузка" />
          ) : (
            getValueView(value)
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
              <CommandItem
                className="relative pl-6"
                key={option.label}
                value={option.label}
                onSelect={() => {
                  if (value.includes(option.value)) {
                    onChange(value.filter((v) => v !== option.value));
                  } else {
                    onChange([...value, option.value]);
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 absolute left-1",
                    value.includes(option.value) ? "opacity-100" : "opacity-0",
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

export default SmartMultiSelect;
