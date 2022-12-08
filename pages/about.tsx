import ShopLayout1 from 'components/layouts/ShopLayout1'
import React from 'react'
import SEO from '../src/components/SEO'
import { Container } from '@mui/system'
import styled from '@emotion/styled'

const AboutPage: React.FC = () => {
	return (
		<ShopLayout1>
			<SEO title="About" />
			<Wrapper sx={{ pb: '1rem' }}>
				<Title>What is an online marketplace?</Title>
				<p>There are two key features that define an online marketplace:</p>
				<List>
					<li>
						There are <span>many sellers and buyers</span> trading through the
						same website.
					</li>
					<li>
						Buyers are able to{' '}
						<span>purchase products without leaving the site</span> (or app).
					</li>
				</List>
				<p>
					This excludes price comparison sites like Shopping.com. Although they
					have products from many sellers, you cannot make a purchase without
					leaving the site. They are advertising channels rather than an online
					marketplace.
				</p>
				<p>
					It also excludes sites where you sell used products directly to the
					company operating the site, such as decluttr and ubup. As you can only
					sell directly to the company, there is only one buyer. They are
					sourcing products from consumers to resell themselves (often through
					online marketplaces!)
				</p>
				<p>
					For this article, we have focused on the type of marketplace website
					that meet two further criteria:
				</p>
				<List>
					<li>
						There are <span>many sellers and buyers</span> trading through the
						same website.
					</li>
					<li>
						Buyers are able to{' '}
						<span>purchase products without leaving the site</span> (or app).
					</li>
				</List>
			</Wrapper>
		</ShopLayout1>
	)
}

const Wrapper = styled(Container)`
	margin: 20px 0;
	font-size: 20px;
	font-weight: 400;
	text-align: justify;
`
const Title = styled.h2`
	font-weight: 700;
	font-size: calc(1.5rem + 0.9vw);
`

const List = styled.ul`
	list-style: initial;
	padding-left: calc(1.5rem + 0.9vw);
	li {
		margin: 10px 0;
		span {
			font-weight: 700;
		}
	}
`
export default AboutPage
