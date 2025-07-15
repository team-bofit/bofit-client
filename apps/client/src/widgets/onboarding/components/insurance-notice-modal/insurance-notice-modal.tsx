import { useState } from 'react';

import { Button, Modal } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { tokenService } from '@shared/auth/services/token-service';

import * as styles from './insurance-notice-modal.css';

const InsuranceNoticeModal = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleStartBofit = () => {
    tokenService.saveIsTermsToken('true');
  };

  const handleToggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <Modal>
      <Modal.Title>서비스 고지사항</Modal.Title>
      <Modal.ContentContainer>
        <Modal.Content
          text={'본 서비스는 사용자가 입력한 정보를\n'}
          displayBlock={false}
        />
        <Modal.Content text={'바탕으로 보험 상품을 '} displayBlock={false} />
        <Modal.HighlightContent text={'참고용'} />
        <Modal.Content text={'으로\n'} displayBlock={false} />
        <Modal.Content
          text={'추천하는 도구입니다. 제공되는 정보는\n'}
          displayBlock={false}
        />
        <Modal.HighlightContent
          text={'공식적은 금융 또는 보험 자문이 아니며,\n'}
        />
        <Modal.Content
          text={'보핏은 이를 통해 중개 수수료 등 경제적\n'}
          displayBlock={false}
        />
        <Modal.Content
          text={'이익을 얻지 않습니다. 따라서 계약 체결\n'}
          displayBlock={false}
        />
        <Modal.Content
          text={'전에는 반드시 해당 보험사 또는 공인 \n'}
          displayBlock={false}
        />
        <Modal.Content
          text={'설계사의 설명을 충분히 확인해주시기 \n'}
          displayBlock={false}
        />
        <Modal.Content text={'바랍니다. '} displayBlock={false} />
        <Modal.HighlightContent text={'최종 가입 여무 및 선택에\n'} />
        <Modal.HighlightContent text={'대한 책임은 사용자에게 있습니다.\n'} />
      </Modal.ContentContainer>
      <Modal.Terms>
        <Icon
          className={styles.icon}
          name="check"
          color={isChecked ? 'primary500' : 'gray200'}
          onClick={handleToggleCheck}
        />
        충분히 이해했어요
      </Modal.Terms>
      <Modal.Actions>
        <Button
          variant="primary"
          disabled={!isChecked}
          onClick={handleStartBofit}
        >
          보험 추천받기
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default InsuranceNoticeModal;
