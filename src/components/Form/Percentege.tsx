import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const Percentege = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props : any) {
    const {onChange, ...other } = props;


    return (
      <NumericFormat
        {...other}
        maxLength={3}
        onChange={onChange}
        suffix='%'
        allowNegative={false}
      />
    );
  },
);

export default Percentege