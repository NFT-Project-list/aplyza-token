import React from "react";
import {moralisClient} from "../index";
import {connect} from "react-redux";
import {ABI_presale, CHAINID_Main, CONTRACT_Presale} from "../contracts/presale";
import Countdown from "react-countdown";
class Presale extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            amount: 0.1
        }
    }
    async buy(){
        let user = moralisClient.User.current();
        if (user) {
            const web3 = await moralisClient.enableWeb3();
            await moralisClient.switchNetwork(CHAINID_Main);
            const contract = new web3.eth.Contract(ABI_presale, CONTRACT_Presale);
            contract.options.from=await user.get("ethAddress")
            var amount = await web3.utils.toWei(this.state.amount+"",'ether');
            await contract.methods.presale().send({value: amount});
            // contract.methods.presale.send();
        }
    }
    handleChange(value) {
        this.setState({amount: value});
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
                            <div className={"col-sm-12 presale"}>
                                <h1>PRESALE <span className={"apz"}>APZ</span> TOKEN UNTIL</h1>
                                <Countdown className={"presale-count"} date={Date.now() + (15*24*60*60*1000)} />
                                <h5>
                                    Maximum Ammount 5 BNB to buy APZ Token per address
                                </h5>
                                <br/>
                                <input
                                    onChange={(event)=>{
                                        this.handleChange(event.target.value)
                                    }}
                                    type={"number"} step={"0.01"}
                                    className={"form-control presale-amt"} placeholder={"0.1 BNB"}/>
                                <br/>
                                <button onClick={()=>this.buy()} className={"btn btn-outline-primary presale-btn"}>BUY</button>
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
export default connect(mapStateToProps)(Presale);
