import ToggleButtonMui, {
  ToggleButtonClassKey,
  ToggleButtonProps,
} from "@mui/material/ToggleButton";
import ToggleButtonGroupMui, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import { forwardRef } from "react";

export const ToggleButtonGroup = forwardRef<
  JSX.Element,
  ToggleButtonGroupProps
>((props, ref) => (
  <ToggleButtonGroupMui classes={{ root: "block mt-2" }} ref={ref} {...props} />
));

ToggleButtonGroup.displayName = "ToggleButtonGroup";

export const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <ToggleButtonMui
      classes={{
        root: "rounded-none transition-all",
        selected: "border border-black bg-white shadow-lg",
      }}
      disableRipple
      disableTouchRipple
      disableFocusRipple
      {...props}
    />
  );
};
