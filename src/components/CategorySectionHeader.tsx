import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import useSettings from 'src/hooks/useSettings'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

import { H2 } from './Typography'
import { FlexBetween, FlexBox } from './flex-box'

// ===================================================
type CategorySectionHeaderProps = {
	title?: string
	icon?: ReactNode
	seeMoreLink?: string
}
// ===================================================

const CategorySectionHeader: FC<CategorySectionHeaderProps> = (props) => {
	const { title, seeMoreLink, icon } = props
	const { t } = useTranslation('common')

	const { settings } = useSettings()

	return (
		<FlexBetween mb={3}>
			<FlexBox alignItems="center" gap={1}>
				{icon && <FlexBox alignItems="center">{icon}</FlexBox>}
				<H2 fontWeight="bold" lineHeight="1">
					{title}
				</H2>
			</FlexBox>

			{seeMoreLink && (
				<Link href={seeMoreLink}>
					<a>
						<FlexBox alignItems="center" color="grey.600">
							{t('viewAll')}
							{settings.direction === 'ltr' ? (
								<ArrowRight fontSize="small" color="inherit" />
							) : (
								<ArrowLeft fontSize="small" color="inherit" />
							)}
						</FlexBox>
					</a>
				</Link>
			)}
		</FlexBetween>
	)
}

export default CategorySectionHeader
