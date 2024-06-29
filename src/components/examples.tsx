import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Flex, Input, Typography } from "antd";
import { StoreContext } from "../store";
import { ChechResults } from "../types";

const { Title, Text } = Typography;

const Examples: FC = observer(() => {
  const store = useContext(StoreContext);

  return (
    <div>
      <Title>Примеры</Title>
      <Flex wrap gap="small">
        {Object.values(store.examplesStore.examples).map(
          ({ id, exercise, checkResult }) => {
            return (
              <Card size="small">
                <Text key={id}>{`${exercise} =`}</Text>
                <Input
                  style={{ width: "50px" }}
                  onChange={({ target: { value } }) =>
                    store.examplesStore.setUserAnswer(id, +value)
                  }
                  {...(checkResult === ChechResults.Incorrect
                    ? { status: "error" }
                    : {})}
                />
              </Card>
            );
          }
        )}
      </Flex>
      <Flex vertical gap="small">
        <Button style={{ width: '140px', marginTop: '10px' }} onClick={() => store.examplesStore.checkAnswers()}>
          Проверить
        </Button>
        <Text>{store.examplesStore.result}</Text>
      </Flex>
    </div>
  );
});

export default Examples;
