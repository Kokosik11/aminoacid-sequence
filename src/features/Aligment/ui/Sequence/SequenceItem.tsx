import type { FC } from "react";
import type { AminoAcidType } from "../../types";
import "./styles.css";
import { colorMap } from "./constants";

type SequenceItemProps = {
  symbol: AminoAcidType;
  second?: boolean;
  equal?: boolean;
};

export const SequenceItem: FC<SequenceItemProps> = ({ symbol, second, equal }) => {
  const style: React.CSSProperties = {};

  if (!(second && equal)) {
    style.backgroundColor = colorMap[symbol] || undefined;
  }

  return (
    <span className="sequence__item" style={style}>
      {symbol}
    </span>
  );
};
