import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { IRadioSupplierProps } from "./@types";

export const StyledRadio = styled(Radio)(() => ({
  color: "#484f58",
  "&.Mui-checked": {
    color: "var(--color-primary)",
  },
}));

const RadioSupplier = ({ setSupplier, theme }: IRadioSupplierProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{
            color: theme === "light" ? "#101119" : "white",
            "&, &.Mui-focused": {
              color: theme === "light" ? "#101119" : "white",
            },
          }}
        >
          Suprimento
        </FormLabel>
        <div>
          <FormControlLabel
            value="SIM"
            control={<StyledRadio />}
            label="Sim"
            name="U_SNT_Suprimento"
            style={{ color: theme === "light" ? "#101119" : "white" }}
          />
          <FormControlLabel
            value="NÃO"
            control={<StyledRadio />}
            label="Não"
            name="U_SNT_Suprimento"
            style={{ color: theme === "light" ? "#101119" : "white" }}
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
};
