import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { FormControl, Theme } from "@mui/material";
import { StyledRadio } from "../RadioSupplier/RadioSupplier";

interface IRadioManProps {
  setMaintence: React.Dispatch<React.SetStateAction<string>>;
}

function RadioMan({ setMaintence }: IRadioManProps) {
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
            color: "white",
            "&, &.Mui-focused": {
              color: "white",
            },
          }}
        >
          S.C Manutenção
        </FormLabel>
        <div>
          <FormControlLabel value="S" control={<StyledRadio />} label="Sim" />
          <FormControlLabel value="N" control={<StyledRadio />} label="Não" />
        </div>
      </RadioGroup>
    </FormControl>
  );
}

export default RadioMan;
