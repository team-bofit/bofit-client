import * as styles from './option-item.css';

interface OptionItemProps {
  job?: string;
  isSelected: boolean;
  onSelect: (option: string) => void;
}

const OptionItem = ({ job, isSelected, onSelect }: OptionItemProps) => {
  const handleClick = () => {
    if (job) {
      onSelect(job);
    }
  };

  return (
    <li
      className={isSelected ? styles.dropdownItemSelected : styles.dropdownItem}
      data-selected={isSelected}
      onClick={handleClick}
    >
      {job}
    </li>
  );
};

export default OptionItem;
