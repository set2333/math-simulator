import { GeneratorSettings } from "../../types";

export type EditableCellProps = {
  title: string;
  editable: boolean;
  dataIndex: keyof Omit<GeneratorSettings, 'id'> | 'actions';
  record: GeneratorSettings;
  handleEdit: (setting: GeneratorSettings) => void;
  handleRemove: (id: GeneratorSettings['id']) => void;
}
