import { useEffect, useState } from 'react'
import type { ThemeMode } from '../constants/todoConfig'
import { themeStorageKey } from '../constants/todoConfig'

const getInitialTheme = (): ThemeMode => {
	if (typeof localStorage === 'undefined') return 'system'

	const savedTheme = localStorage.getItem(themeStorageKey)

	if (
		savedTheme === 'light' ||
		savedTheme === 'dark' ||
		savedTheme === 'system'
	) {
		return savedTheme
	}

	return 'system'
}

const shouldUseDarkTheme = (themeMode: ThemeMode) => {
	if (themeMode === 'dark') return true
	if (themeMode === 'light') return false

	return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useThemeMode = () => {
	const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const applyTheme = () => {
			document.documentElement.classList.toggle(
				'dark',
				shouldUseDarkTheme(themeMode)
			)
		}

		localStorage.setItem(themeStorageKey, themeMode)
		applyTheme()
		mediaQuery.addEventListener('change', applyTheme)

		return () => mediaQuery.removeEventListener('change', applyTheme)
	}, [themeMode])

	return { themeMode, setThemeMode }
}
