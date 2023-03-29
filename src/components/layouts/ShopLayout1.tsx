import Footer from 'src/components/footer/Footer'
import Header from 'src/components/header/Header'
import MobileNavigationBar from 'src/components/mobile-navigation/MobileNavigationBar'
import Sticky from 'src/components/sticky/Sticky'
import Topbar from 'src/components/topbar/Topbar'
import { FC, Fragment, useCallback, useState } from 'react'
import Navbar from 'src/components/navbar/Navbar'
import { ISiteSettings } from 'src/shared/types/site-settings.types'
import MobileNavigationBar2 from '../mobile-navigation/MobileNavigationBar2'

/**
 *  Used in:
 *  1. market-1, matket-2, gadget-shop,
 *     fashion-shop, fashion-shop-2, fashion-shop-3, furniture-shop, grocery3, gift-shop
 *  2. product details page
 *  3. order-confirmation page
 *  4. product-search page
 *  5. shops and shops-details page
 *  6. checkoutNavLayout and CustomerDashboadLayout component
 */

// ===================================================
type ShopLayout1Props = {
	showTopbar?: boolean
	showNavbar?: boolean
	topbarBgColor?: string
	siteSettings?: ISiteSettings
}
// ===================================================

const ShopLayout1: FC<ShopLayout1Props> = ({
	children,
	showTopbar = true,
	topbarBgColor,
	showNavbar = true,
}) => {
	const [isFixed, setIsFixed] = useState(false)
	const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), [])

	return (
		<Fragment>
			{/* TOPBAR */}
			{showTopbar && <Topbar bgColor={topbarBgColor} />}

			{/* HEADER */}
			<Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
				<Header isFixed={isFixed} />
			</Sticky>

			<div className="section-after-sticky">
				{/* NAVIGATION BAR */}
				{showNavbar && <Navbar elevation={0} border={1} />}

				{/* BODY CONTENT */}
				{children}
			</div>

			<MobileNavigationBar />
			{/* <MobileNavigationBar2 /> */}
			<Footer />
		</Fragment>
	)
}

export default ShopLayout1
