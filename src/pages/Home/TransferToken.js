import React from "react";
import { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ethers } from 'ethers'
import Web3 from 'web3'
import Web3Modal from "web3modal";
import { getImg } from "../../hook/Helper";
import styles from './Home.module.sass';
import BigNumber from "bignumber.js";
import { CustomButton } from "../../components/CustomButton";

import transferTokenCont from "../../ABI/transferToken.json";
import token1Cont from '../../ABI/token1.json';
import token2Cont from '../../ABI/token2.json';
const transferTokenAddr = "0x6DCFa70b8C681fA116068Ddc2628eAd02d9363d0";
const token1Addr = "0x2d48FB45cBd69206C107Dc3242F8B5Adb0482812";
const token2Addr = "0xE75DD44aC59DEd59b909e222c522f7117e387F04";
let myAddr = "";
const netchainId = 4;
const netchainIdHex = '0x4';
// const netchainId = 4;
// const netchainIdHex = '0x4';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

export const TransferToken = () => {

    const web3 = new Web3(Web3.givenProvider);
    const onClickTransfer = async () => {
        let token1Contract;
        let token2Contract;
        let transferTokenContract;
        try {
            const chainId = await web3.eth.getChainId()
            if (chainId === netchainId) {
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                myAddr = signer.provider.provider.selectedAddress;
                token1Contract = new ethers.Contract(
                    token1Addr,
                    token1Cont.abi,
                    signer
                );
                token2Contract = new ethers.Contract(
                    token2Addr,
                    token2Cont.abi,
                    signer
                );
                transferTokenContract = new ethers.Contract(
                    transferTokenAddr,
                    transferTokenCont.abi,
                    signer
                );
                const getAllowance1 = await token1Contract.allowance(myAddr, transferTokenAddr);
                console.log(Number(web3.utils.fromWei(getAllowance1.toString(), 'ether').toString()))
                if (Number(web3.utils.fromWei(getAllowance1.toString(), 'ether').toString()) < 10) {
                    const tokenCon = await token1Contract.approve(transferTokenAddr, web3.utils.toWei('100000000', 'ether'));
                    await tokenCon.wait();
                }

                const getAllowance2 = await token2Contract.allowance(myAddr, transferTokenAddr);
                console.log(Number(web3.utils.fromWei(getAllowance2.toString(), 'ether').toString()))
                if (Number(web3.utils.fromWei(getAllowance2.toString(), 'ether').toString()) < 10) {
                    const tokenCon = await token2Contract.approve(transferTokenAddr, web3.utils.toWei('100000000', 'ether'));
                    await tokenCon.wait();
                }
                const value1 = await token1Contract.balanceOf(myAddr);
                console.log(Number(web3.utils.fromWei(value1.toString(), 'ether').toString()))
                const value2 = await token2Contract.balanceOf(myAddr);
                console.log(Number(web3.utils.fromWei(value2.toString(), 'ether').toString()))
                const transferCon = await transferTokenContract.transferToken();
                await transferCon.wait();

            } else {
                try {
                    await web3.currentProvider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: netchainIdHex }]
                    });
                } catch (error) {
                    console.log(error.message);
                }
            }
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(async () => {
        const web3 = new Web3(Web3.givenProvider);
        try {
            const chainId = await web3.eth.getChainId()
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            myAddr = signer.provider.provider.selectedAddress;

            if (chainId !== netchainId) {

                try {
                    await web3.currentProvider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: netchainIdHex }]
                    });

                } catch (error) {
                    console.log(error.message);
                }
            }
        } catch (err) {
            console.log(err)
        }

    }, [])


    return (
        <div>
            <CustomButton value="Transfer" onClick={onClickTransfer} />
        </div>

    )
}