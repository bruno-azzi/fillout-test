import { IconType } from "react-icons";

type Props = {
  id: string;
  icon: IconType;
  label: string;
  iconClassName?: string;
  className?: string;
  onClick?: (id: string) => void;
};

const MenuItem: React.FC<Props> = ({
  id,
  icon: Icon,
  label,
  iconClassName = "",
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      className={`flex w-full items-center py-1.5 mb-0.5 leading-4 cursor-pointer ${className}`}
      onClick={() => onClick(id)}
    >
      <span className="mr-2">
        <Icon size={16} className={iconClassName} />
      </span>
      {label}
    </button>
  );
};

export default MenuItem;
