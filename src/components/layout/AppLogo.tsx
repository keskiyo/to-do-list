interface AppLogoProps {
	size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
	sm: 'h-12 w-12',
	md: 'h-16 w-16',
	lg: 'h-20 w-20',
}

export const AppLogo = ({ size = 'md' }: AppLogoProps) => (
	<img
		src={`${import.meta.env.BASE_URL}logo.svg`}
		alt='Логотип My-todo-list'
		className={`${sizeClasses[size]} shrink-0 rounded-2xl shadow-sm`}
	/>
)
