import { Button, Input, Select, Table, TableProps } from "antd";
import { GENERATORS } from "../consts";
import SumVerbalCountingGenerator from "../generators/sum-verbal-counting";
import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../store";
import { GeneratorSettings, GeneratorsName } from "../types";

interface EditableCellProps {
  title: string;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleEdit: (setting: GeneratorSettings) => void;
  type: 'select' | 'number',
}

const EditableCell: FC<React.PropsWithChildren<EditableCellProps>> = observer((props) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef(null);

  useEffect(() => ref?.current?.focus(), [ref, editing]);

  const CellsMap: Record<EditableCellProps['type'], ReactNode> = {
    'select': (
      <Select
          ref={ref}
          value={props?.record?.[props?.dataIndex]?.id}
          onChange={(generatorId: GeneratorsName) => {
            props.handleEdit({ ...props.record, [props?.dataIndex]: GENERATORS[generatorId] });
          }}
          onBlur={() => setEditing(false)}
          options={Object.entries(GENERATORS).map(([ value, label ]) => ({ value, label: label.description }))}
        />
    ),
    'number': (
      <Input
        ref={ref}
        value={props?.record?.[props?.dataIndex]}
        onChange={({ target: { value } }) => {
          props.handleEdit({ ...props.record, [props?.dataIndex]: +value });
        }}
        onBlur={() => setEditing(false)}
      />
    ),
  }

  return (
    <td {...props}>
      {(editing
        ? CellsMap[props.type]
        : <div onClick={() => setEditing(true)}>
          {props?.record?.[props?.dataIndex]?.description || props?.record?.[props?.dataIndex]}
        </div>
      )}
    </td>
  );
});

const GenerarorSettings: FC = observer(() => {
  const store = useContext(StoreContext);

  const addGenerator = () => {
    store.generatorSettingsStore.addSetting({
      generator: GENERATORS[SumVerbalCountingGenerator.generatorId],
      count: 10,
    });
  };

  const columns: TableProps<GeneratorSettings>['columns'] = [
    { title: 'Тип', dataIndex: 'generator', type: 'select' },
    { title: 'Количество', dataIndex: 'count', type: 'number' },
  ].map(column => ({ ...column, onCell: (record) => ({
    record,
    handleEdit: (setting: GeneratorSettings) => store.generatorSettingsStore.editSetting(setting),
    ...column,  
  }) }));

  return (
    <div>
      <Button
        type="primary"
        onClick={addGenerator}
        style={{ marginBottom: '10px' }}
      >
        Добавить
      </Button>
      <Table
        columns={columns}
        dataSource={Object.values(store.generatorSettingsStore.settings)}
        components={{ body: { cell: EditableCell }}}
        pagination={false}
      />
      <Button
        type="primary"
        onClick={() => store.examplesStore.generateExamples()}
        style={{ marginTop: '10px' }}
      >
        Сгенерировать
      </Button>
    </div>
    
  );
});

export default GenerarorSettings;