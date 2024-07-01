import { FC, useState } from "react";
import { EditableCellProps } from "../types";
import useEditingCellsMap from "./useEditingCellsMap";
import useCellsMap from "./useCellsMap";
import Actions from "./Actions";

const EditableCell: FC<React.PropsWithChildren<EditableCellProps>> = ({ handleEdit, handleRemove, record, dataIndex, ...props}) => {
  const [editing, setEditing] = useState(false);
  const EditingCellsMap = useEditingCellsMap({ record, editing, setEditing, handleEdit });
  const CellsMap = useCellsMap({ record });

  return (
    <td {...props}>
      {dataIndex === 'actions'
        ? <Actions record={record} handleRemove={handleRemove}/>
        : (editing
          ? EditingCellsMap[dataIndex]
          : <div onClick={() => setEditing(true)}>{CellsMap[dataIndex]}</div>
        )}
    </td>
  );
};

export default EditableCell;
