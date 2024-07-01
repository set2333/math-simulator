import { ReactNode, RefObject, useEffect, useRef } from "react";
import { Input, InputRef, Modal, RefSelectProps, Select } from "antd";
import { GeneratorSettings, GeneratorsName } from "../../../types";
import { GENERATORS } from "../../../consts";
import { EditableCellProps } from "../types";

type UseEditingCellsMap = Pick<EditableCellProps, "record" | "handleEdit"> & {
  editing: boolean;
  setEditing: (editing: boolean) => void;
};

const useEditingCellsMap = ({
  editing,
  setEditing,
  record,
  handleEdit,
}: UseEditingCellsMap) => {
  const refSelect: RefObject<RefSelectProps> | null = useRef(null);
  const refInput: RefObject<InputRef> | null = useRef(null);

  useEffect(() => refInput?.current?.focus(), [refInput, editing]);
  useEffect(() => refSelect?.current?.focus(), [refSelect, editing]);

  const handleSave = (settings: Partial<GeneratorSettings>) => {
    handleEdit({ ...record, ...settings });
  };

  const EditingCellsMap: Record<
    keyof Omit<EditableCellProps["record"], "id">,
    ReactNode
  > = {
    generator: (
      <Select
        ref={refSelect}
        value={record?.generator?.id}
        onChange={(generatorId: GeneratorsName) =>
          handleSave({
            generator: GENERATORS[generatorId],
            options: Object.entries(GENERATORS[generatorId].options).reduce(
              (acc, [key, { defaultValue }]) => ({
                ...acc,
                [key]: defaultValue,
              }),
              {}
            ),
          })
        }
        onBlur={() => setEditing(false)}
        options={Object.entries(GENERATORS).map(([value, label]) => ({
          value,
          label: label.description,
        }))}
      />
    ),
    count: (
      <Input
        ref={refInput}
        value={record?.count}
        onChange={({ target: { value } }) => handleSave({ count: +value })}
        onBlur={() => setEditing(false)}
      />
    ),
    options: (
      <Modal open={editing} footer={null} onCancel={() => setEditing(false)}>
        <div>
          {Object.entries(record?.generator.options || {}).map(([key, { label }]) => (
            <div key={key}>
              {label}
              <Input
                value={record.options[key]}
                onChange={({ target: { value } }) =>
                  handleSave({
                    options: { ...record.options, [key]: +value },
                  })
                }
              />
            </div>
          ))}
        </div>
      </Modal>
    ),
  };

  return EditingCellsMap;
};

export default useEditingCellsMap;
