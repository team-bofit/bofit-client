import { Accordion } from '../../accordion/accordion';
import Class from '../../class/class';

interface JilbyeongProps {
  target?: string;
  status?: '충분' | '강력' | '부족';
}

//mock 데이터
const jilbyeongClassData = {
  surgeryType: {
    type1: {
      productCoverage: 10,
      averageCoverage: 20,
    },
    type2: {
      productCoverage: 25,
      averageCoverage: 30,
    },
    type3: {
      productCoverage: 120,
      averageCoverage: 100,
    },
    type4: {
      productCoverage: 250,
      averageCoverage: 500,
    },
    type5: {
      productCoverage: 1200,
      averageCoverage: 1000,
    },
  },
};

const JilbyeongClass = ({ target, status }: JilbyeongProps) => {
  const surgeryList = Object.values(jilbyeongClassData.surgeryType);

  const averageValues = surgeryList.map((surgery) => surgery.averageCoverage);
  const guaranteeValues = surgeryList.map((surgery) => surgery.productCoverage);

  return (
    <div>
      <Accordion>
        <Accordion.Header type={status}>{target}</Accordion.Header>
        <Accordion.Panel>
          <Class
            averageValues={averageValues}
            guaranteeValues={guaranteeValues}
          />
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default JilbyeongClass;
