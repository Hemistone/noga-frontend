import React from "react";
import { Typography } from "antd";
const { Title, Text } = Typography;

export default () => {
  return (
    <>
      <Title>Noga AD 콘솔 사이트에 오신것을 환영합니다!</Title>
      <Title level={4} type="primary">
        <div>
          게임과 광고보드를 선택해 게임 광고 효과 통계 열람을 시작하세요.
        </div>

        <Text type="secondary">
          Please click on the Advertisement dashboard you want to look.
        </Text>
      </Title>
    </>
  );
};
