import {motion} from "framer-motion";
import Button, {ButtonProps} from "@mui/material/Button";

interface MotionButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function MotionButton({ children, ...props }: MotionButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: "inline-block" }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
