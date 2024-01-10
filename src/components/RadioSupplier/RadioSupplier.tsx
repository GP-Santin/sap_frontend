import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

export const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.grey[600],
  "&.Mui-checked": {
    color: "var(--color-primary)",
  },
}));

interface IRadioSupplierProps {
  setSupplier: React.Dispatch<React.SetStateAction<string>>;
}

function RadioSupplier({ setSupplier }: IRadioSupplierProps) {
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
        <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "white" }}>
          Suprimento
        </FormLabel>
        <div>
          <FormControlLabel
            value="SIM"
            control={<StyledRadio />}
            label="Sim"
            name="U_SNT_Suprimento"
          />
          <FormControlLabel
            value="NÃO"
            control={<StyledRadio />}
            label="Não"
            name="U_SNT_Suprimento"
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
}

export default RadioSupplier;
