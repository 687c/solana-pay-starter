import React, { useEffect, useState } from "react";
import Product from "../components/Product";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// import HeadComponent from '../components/Head';

// Constants
const TWITTER_HANDLE = "jimii_47";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
	// const { PublicKey } = useWallet();
	const PublicKey = '214bewgwe';
	const wallet = useWallet();

	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState();

	console.log("this is the public key", PublicKey);

	useEffect(() => {
		console.log("this the wallet", wallet);
		if (PublicKey) {
			fetch(`/api/fetchProduct`)
				.then(response => response.json())
				.then((data) => {
					console.log('the data', data);
					setProducts(data);
					console.log("products -> ", products);
					setIsLoading(false);
				})
		}
	}, [isLoading]);

	const renderNotConnectedContainer = () => (
		<>
			<img src="https://media.giphy.com/media/143vPc6b08locw/giphy.gif" alt="emoji" />
			<div className='button-container'>
				<WalletMultiButton className="cta-button connect-wallet-button" />
			</div>
		</>
	)

	const renderItemBuyContainer = () => (
		<div className="products-container">
			{/* {
				isLoading ? "" :
					products.map(product => {
						<Product key={product.id} product={product} />
					})
			} */}
			{
				!isLoading && <div>
					{products.map(product =>
						<Product key={product.id} product={product} />
					)}
				</div>
			}
		</div>
	)

	return (
		<div className="App">
			{/* <HeadComponent /> */}
			<div className="container">
				<header className="header-container">
					<p className="header"> 😳 Evil Empire!!!😈</p>
					<br />
					<p className="header"> 😂 Laughing all the way to the bank 😂 </p>
					<p className="sub-text">The only emoji store that accepts sh*tcoins</p>
				</header>

				<main>
					{/* <img src="https://media.giphy.com/media/143vPc6b08locw/giphy.gif" alt="emoji" /> */}
					{PublicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
				</main>

				<div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built by @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;