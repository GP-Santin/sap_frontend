import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { FormControl } from "@mui/material";
import { StyledRadio } from "../RadioSupplier/RadioSupplier";

interface IRadioManProps {
  setMaintence: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}

function RadioMan({ setMaintence, theme }: IRadioManProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaintence(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="SIM"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{
            color: theme === "light" ? "#101119" : "#FFFFFF",
            "&, &.Mui-focused": {
              color: theme === "light" ? "#101119" : "#FFFFFF",
            },
          }}
        >
          S.C Manutenção
        </FormLabel>
        <div>
          <FormControlLabel
            value="S"
            control={<StyledRadio />}
            label="Sim"
            style={{ color: theme === "light" ? "#101119" : "white" }}
          />
          <FormControlLabel
            value="N"
            control={<StyledRadio />}
            label="Não"
            style={{ color: theme === "light" ? "#101119" : "white" }}
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
}

export default RadioMan;
