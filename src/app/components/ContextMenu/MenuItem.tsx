import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  iconClassName?: string;
  className?: string;
};

const MenuItem: React.FC<Props> = ({
  icon: Icon,
  label,
  iconClassName = "",
  className = "",
}) => {
  return (
    <button
      className={`flex w-full items-center py-1.5 mb-0.5 leading-4 cursor-pointer ${className}`}
    >
      <span className="mr-2">
        <Icon size={16} className={iconClassName} />
      </span>
      {label}
    </button>
  );
};

export default MenuItem;
