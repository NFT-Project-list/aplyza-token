import {Image} from "react-bootstrap";
import raid from '../img/raid.png'
import box from '../img/box.png'
import React from "react";
import {connect} from "react-redux";
import {moralisClient} from "../index";
import {ABI_blindbox, CHAINID_Main, COMPANY, CONTRACT_NFT, DEFAULT_DESC, ROBOTS} from "../contracts/presale";
import { uniqueNamesGenerator, NumberDictionary } from 'unique-names-generator';

const { createCanvas,loadImage } = require("canvas");
class BlindBox extends React.Component{
    async generate(){
        let user = moralisClient.User.current();
        if (user) {
            const web3 = await moralisClient.enableWeb3();
            await moralisClient.switchNetwork(CHAINID_Main);
            const series = NumberDictionary.generate({ min: 0, max: 999 });
            const generatedName=uniqueNamesGenerator({
                dictionaries: [ROBOTS, COMPANY,series],
                length: 3,
                separator: ' '
            });
            const path=require("path");
            const width = 256;
            const height = 256;
            const canvas = createCanvas(width, height);
            const context = canvas.getContext("2d");
            context.clearRect(0,0,width, height)
            const body=this.getRndInteger(1,7)+".png";
            const lhand=this.getRndInteger(1,10)+".png";
            const rhand=this.getRndInteger(1,10)+".png";
            const lleg=this.getRndInteger(1,7)+".png";
            const rleg=lleg;
            await loadImage("../sprite/l-hand/1x/"+lhand).then((image) => {
                if(lhand==='7.png' || lhand==='8.png' || lhand==='9.png') {
                    context.drawImage(image, 140, 80);
                }else {
                    context.drawImage(image, 128, 80);
                }
            });
            await loadImage("../sprite/l-leg/1x/"+lleg).then((image) => {
                context.drawImage(image, 118, 142);
            });
            await loadImage("../sprite/body/1x/"+body).then((image) => {
                if(body==='4.png' || body==='5.png' || body==='6.png'){
                    context.drawImage(image, 105, 70);
                }else {
                    context.drawImage(image, 96, 64);
                }
            });
            await loadImage("../sprite/r-leg/1x/"+rleg).then((image) => {
                context.drawImage(image, 72, 142);
            });
            await loadImage("../sprite/r-hand/1x/"+rhand).then((image) => {
                if(rhand==='7.png' || rhand==='8.png' || rhand==='9.png') {
                    context.drawImage(image, 80, 90);
                }else {
                    context.drawImage(image, 40, 80);
                }
            });
            const buffer = canvas.toDataURL("image/png")
            const file = new moralisClient.File("image.png", {base64: buffer});
            await file.saveIPFS();
            const object = {
                "name": generatedName,
                "description": DEFAULT_DESC,
                "image": file.ipfs()
            }
            const metadata = new moralisClient.File("file.json", {base64: btoa(JSON.stringify(object))});
            await metadata.saveIPFS();
            const contract = new web3.eth.Contract(ABI_blindbox, CONTRACT_NFT);
            contract.options.from=await user.get("ethAddress")
            var amount = await web3.utils.toWei("1",'ether');
            await contract.methods.requestNewRandomCharacter(generatedName,metadata.ipfs()).send({value: amount});
        }
    }
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    render() {
        return (
            <div className={"container-fluid"}>
                <div className={"header"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-sm-12"}>
                                <h1>Aplyza is The Future Game Token</h1>
                                <h5>
                                    Decentralize Meme Coin ,
                                    Blockchain Game Portal <br/>
                                    And Play to Earn Ecosystem
                                </h5>
                                <h5>
                                    Make Game Not Only For Fun But Also Can Make Money
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"countdown"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-sm-12"}>
                                <h1>Get Your Unique NFT</h1>
                                <div className={"row"}>
                                    <div className={"col-sm-6"}>
                                        <Image src={raid} className={"full-image"}/>
                                        <p className={"text-center"}>
                                            Get your unique robot with different attribute,
                                            weapon , and appearances.
                                            The robot will give you access to <b>NFT Mining</b> and many fun <b>games</b>.
                                            (Sales 20% developer, 80% will be added to mining and game)
                                        </p>
                                    </div>
                                    <div className={"col-sm-6"}>
                                        <div className={"blind-wrap d-flex flex-column justify-content-center align-items-center"}>
                                            <div className={"blindbox"}>
                                                <Image src={box}/>
                                                <h5>1 BNB</h5>
                                            </div>
                                            <div className={"row buttons"}>
                                                <div className={"col-sm-12"}>
                                                    <button onClick={()=>{
                                                        this.generate()
                                                    }} className={"btn btn-danger"}>OPEN</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        ...state.user
    }
)
export default connect(mapStateToProps)(BlindBox);
