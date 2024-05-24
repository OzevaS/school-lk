import { cn } from "./utils";

export const Headline1 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <h1 className={cn("text-4xl font-bold", className)}>{children}</h1>;

export const Headline2 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <h2 className={cn("text-3xl font-semibold", className)}>{children}</h2>;

export const Headline3 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <h3 className={cn("text-2xl font-medium", className)}>{children}</h3>;

export const Headline4 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <h4 className={cn("text-xl font-medium", className)}>{children}</h4>;
