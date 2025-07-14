import { Accordion } from '../../accordion/accordion';
import Class from '../../class/class';

const sanghaeClassdata = {
  surgeryType: {
    type1: {
      productCoverage: 10,
      averageCoverage: 20,
    },
    type2: {
      productCoverage: 15,
      averageCoverage: 30,
    },
    type3: {
      productCoverage: 10,
      averageCoverage: 100,
    },
    type4: {
      productCoverage: 10,
      averageCoverage: 500,
    },
    type5: {
      productCoverage: 10,
      averageCoverage: 1000,
    },
  },
};

const SanghaeClass = () => {
  const surgeryList = Object.values(sanghaeClassdata.surgeryType);

  const averageValues = surgeryList.map((surgery) => surgery.averageCoverage);
  const guaranteeValues = surgeryList.map((surgery) => surgery.productCoverage);

  return (
    <div>
      <Accordion>
        <Accordion.Header type="강력">상해 종 수술비</Accordion.Header>
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

export default SanghaeClass;
