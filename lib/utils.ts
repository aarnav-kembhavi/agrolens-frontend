import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Icons from "@/components/global/icons";
import { 
  Home,
  Wrench,
  ShowerHead,
  UtensilsCrossed,
  Calendar,
  Wallet
} from "lucide-react"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}