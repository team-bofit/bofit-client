import { Button } from '@bds/ui';

const StartContent = () => {
  return (
    <>
      <p>00님을 위한 맞춤 추천, 지금 시작할게요!</p>
      <p>꼭 맞는 보험을 찾을 수 있도록, 간단히 몇 개만 여쭤볼게요.</p>

      <img src="./glass_icon_info_check.webp" alt="Onboarding Start" />
      <Button variant="primary" size="lg">
        정보 입력 시작하기
      </Button>
    </>
  );
};

export default StartContent;
