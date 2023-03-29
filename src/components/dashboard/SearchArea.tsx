import { Add } from '@mui/icons-material'
import { Box, Button, Theme, useMediaQuery } from '@mui/material'
import { FlexBox } from 'src/components/flex-box'
import SearchInput from 'src/components/SearchInput'
import useDebounce from 'src/hooks/useDebounce'
import { FC, useEffect, useState } from 'react'

// ===============================================================
type SearchAreaProps = {
	buttonText?: string
	handleSearch: (value: string) => void
	searchPlaceholder: string
	handleBtnClick: () => void
	searchOff?: boolean
	sideComponent?: JSX.Element
}
// ===============================================================

const SearchArea: FC<SearchAreaProps> = (props) => {
	const {
		searchPlaceholder,
		buttonText,
		handleSearch,
		searchOff,
		sideComponent,
	} = props

	const [searchValue, setSearchValue] = useState('')
	const debounceValue = useDebounce(searchValue as string)

	useEffect(() => {
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
			<Box>
				{sideComponent}
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
			</Box>
		</FlexBox>
	)
}

SearchArea.defaultProps = {
	searchPlaceholder: 'Search Product...',
}

export default SearchArea
