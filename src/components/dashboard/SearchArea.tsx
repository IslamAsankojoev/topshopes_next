import { Add } from '@mui/icons-material'
import { Button, Theme, useMediaQuery } from '@mui/material'
import { FlexBox } from 'components/flex-box'
import SearchInput from 'components/SearchInput'
import useDebounce from 'hooks/useDebounce'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

// ===============================================================
type SearchAreaProps = {
	buttonText?: string
	handleSearch: (value: string) => void
	searchPlaceholder: string
	handleBtnClick: () => void
	searchOff?: boolean
}
// ===============================================================

const SearchArea: FC<SearchAreaProps> = (props) => {
	const { searchPlaceholder, buttonText, handleSearch, searchOff } = props

	const [searchValue, setSearchValue] = React.useState('')
	const debounceValue = useDebounce(searchValue as string)

	React.useEffect(() => {
		handleSearch(debounceValue)
	}, [debounceValue])

	const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

	return (
		<FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
			{searchOff ? null : (
				<SearchInput
					value={searchValue}
					onChange={({ target }) => setSearchValue(target.value)}
					placeholder={searchPlaceholder}
				/>
			)}

			{buttonText ? (
				<Button
					color="info"
					fullWidth={downSM}
					variant="contained"
					startIcon={<Add />}
					sx={{ minHeight: 44 }}
					onClick={props.handleBtnClick}
				>
					{buttonText}
				</Button>
			) : null}
		</FlexBox>
	)
}

SearchArea.defaultProps = {
	searchPlaceholder: 'Search Product...',
}

export default SearchArea
