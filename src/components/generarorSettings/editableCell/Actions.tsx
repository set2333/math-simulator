import { FC } from "react";
import { Button } from "antd";
import { EditableCellProps } from "../types";

type ActionsProps = Pick<EditableCellProps, 'record' | 'handleRemove'>

const Actions: FC<ActionsProps> = ({ record, handleRemove }) => (
  <div>
    <Button onClick={() => handleRemove(record.id)}>Удалить</Button>
  </div>
);

export default Actions;