import { ExpandMore } from '@mui/icons-material'
import { MenuItem } from '@mui/material'
// import TouchRipple from '@mui/material/ButtonBase/TouchRipple'
import TouchRipple from '@mui/material/ButtonBase'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BazaarMenu from '../BazaarMenu'
import { Span } from '../Typography'
import { languages } from 'src/config/languages.config'

const LanguagesSwitch = () => {
	const { replace, asPath, locale } = useRouter()

	const [language, setLanguage] = useState(locale)

	const handleLanguageClick = (lang: typeof language) => () => {
		Cookies.set('i18nextLng', lang)
		replace(asPath, asPath, { locale: lang })
	}

	useEffect(() => {
		setLanguage(locale)
	}, [locale])

	return (
		<BazaarMenu
			handler={
				<TouchRipple
					className="handler marginRight"
					sx={{
						p: 1,
					}}
				>
					<Span className="menuTitle">{language.toUpperCase()}</Span>
					<ExpandMore fontSize="inherit" />
				</TouchRipple>
			}
		>
			{languages?.map((item) => (
				<MenuItem
					className="menuItem"
					key={item}
					onClick={handleLanguageClick(item)}
				>
					<Span className="menuTitle">{item.toUpperCase()}</Span>
				</MenuItem>
			))}
		</BazaarMenu>
	)
}

export default LanguagesSwitch
