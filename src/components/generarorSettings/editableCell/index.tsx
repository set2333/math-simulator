import { FC, useState } from "react";
import { EditableCellProps } from "../types";
import useEditingCellsMap from "./useEditingCellsMap";
import useCellsMap from "./useCellsMap";
import Actions from "./Actions";

const EditableCell: FC<React.PropsWithChildren<EditableCellProps>> = (props) => {
  const [editing, setEditing] = useState(false);
  const EditingCellsMap = useEditingCellsMap({ editing, setEditing, ...props });
  const CellsMap = useCellsMap(props);

  return (
    <td {...props}>
      {props.dataIndex === 'actions'
        ? <Actions {...props}/>
        : (editing
          ? EditingCellsMap[props.dataIndex]
          : <div onClick={() => setEditing(true)}>{CellsMap[props.dataIndex]}</div>
        )}
    </td>
  );
};

export default EditableCell;
