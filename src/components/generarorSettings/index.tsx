import { Button, Space, Table, TableProps } from "antd";
import { GENERATORS } from "../../consts";
import SumCountingGenerator from "../../generators/sum-counting";
import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../store";
import { GeneratorSettings } from "../../types";
import EditableCell from "./editableCell";

const GenerarorSettings: FC = observer(() => {
  const store = useContext(StoreContext);

  const addGenerator = () => {
    store.generatorSettingsStore.addSetting({
      generator: GENERATORS[SumCountingGenerator.generatorId],
      count: 10,
      options: { MAX_RESULT: 10, FRACTION: 0 },
    });
  };

  const columns: TableProps<GeneratorSettings>["columns"] = [
    { title: "Тип", dataIndex: "generator" },
    { title: "Количество", dataIndex: "count" },
    { title: "Параметры", dataIndex: "options" },
    { title: "Действия", dataIndex: "actions" },
  ].map((column) => ({
    ...column,
    onCell: (record) => ({
      record,
      handleEdit: (setting: GeneratorSettings) => store.generatorSettingsStore.editSetting(setting),
      handleRemove: (id: GeneratorSettings['id']) => store.generatorSettingsStore.removeSetting(id),
      ...column,
    }),
  }));

  return (
    <div>
      <Space>
        <Button onClick={addGenerator}>
          Добавить
        </Button>
        <Button
          type="primary"
          disabled={!Object.values(store.generatorSettingsStore.settings).length}
          onClick={() => store.examplesStore.generateExamples()}
        >
          Сгенерировать
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={Object.values(store.generatorSettingsStore.settings).map((setting) => ({ key: setting.id, ...setting }))}
        components={{ body: { cell: EditableCell } }}
        pagination={false}
      />
    </div>
  );
});

export default GenerarorSettings;
