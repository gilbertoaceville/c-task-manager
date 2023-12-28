export interface ButtonProps {
  icon?: React.ReactNode;
  name?: string;
  click?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  variant?: "primary" | "secondary";
}
