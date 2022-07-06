import React from "react";
import { getImg } from "../../hook/Helper";
import styles from './Home.module.sass';
import { TransferToken } from './TransferToken'

export const Home = () => {

	return (
		<div className={styles.div}>
			<TransferToken />
		</div>
	)
}