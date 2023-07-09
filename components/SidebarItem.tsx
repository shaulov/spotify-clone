import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
	icon: IconType;
	label: string;
	active: boolean;
	href: string;
}

function SidebarItem({ icon: Icon, label, active, href }: SidebarItemProps): JSX.Element {
	return (
		<Link
			className={twMerge(`
        flex flex-row items-center gap-x-4
        w-full h-auto py-1
        text-md font-medium text-neutral-400
        hover:text-white
      `,
      active && "text-white")}
			href={href}
		>
      <Icon className="flex-shrink-0" size={24} />
			<span className="w-full truncate">{label}</span>
		</Link>
	);
}

export default SidebarItem;
