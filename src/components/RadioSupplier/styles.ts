import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import styled from "styled-components";

export const StyledRadioContainer = styled(FormControl)`
  display: flex;
`
export const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.grey[600],
  "&.Mui-checked": {
    color: "var(--color-primary)",
  },
}));