import React, { useMemo } from "react";
import { WalletAdapter, WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { GlowWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/globals.css";
import "../styles/App.css";

const App = ({ Component, pageProps }) => {

	//set the network config
	const network = WalletAdapterNetwork.Devnet;

	//set the endpoint
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	//set the wallet that will be compiled and that the user will see 
	const wallets = useMemo(() => [
		new PhantomWalletAdapter,
		new GlowWalletAdapter,
		new SlopeWalletAdapter,
		new SolflareWalletAdapter({ network }),
		new TorusWalletAdapter
	], [network]);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<Component {...pageProps} /> 
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export default App;
