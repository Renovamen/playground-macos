import type { ReactNode } from "react";

interface MenuItemProps {
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  children: ReactNode;
}

interface MenuItemGroupProps {
  border?: boolean;
  children: ReactNode;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <li
      onClick={props.onClick}
      className="px-5 leading-6 cursor-default"
      text="black hover:white dark:(white hover:black)"
      bg="hover:blue-500 dark:hover:blue-400"
    >
      {props.children}
    </li>
  );
};

const MenuItemGroup = (props: MenuItemGroupProps) => {
  const border =
    props.border === false
      ? ""
      : "border-b-2 border-gray-400 dark:border-gray-500";
  return <ul className={`py-1 ${border}`}>{props.children}</ul>;
};

export { MenuItem, MenuItemGroup };
