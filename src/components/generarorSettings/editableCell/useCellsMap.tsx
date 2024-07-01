import { ReactNode } from "react";
import { EditableCellProps } from "../types";

type UseCellsMapProps = Pick<EditableCellProps, "record">;

const useCellsMap = ({ record }: UseCellsMapProps) => {
  const CellMap: Record<
    keyof Omit<EditableCellProps["record"], "id">,
    ReactNode
  > = {
    generator: record?.generator?.description,
    count: record?.count,
    options: Object.entries(record?.options || {})
      .reduce<string[]>(
        (acc, [key, value]) => [
          ...acc,
          `${record?.generator?.options?.[key]?.label || ""} = ${value}`,
        ],
        []
      )
      .join("; "),
  };

  return CellMap;
};

export default useCellsMap;
