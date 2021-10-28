import {Image} from "react-bootstrap";
import Tokenomic from '../img/tokenomics.png'
import raid from '../img/raid.png'
function Home(){
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
            <div className={"container"}>
                <div className={"row mt-5 mb-5"}>
                    <div className={"col-sm-12"}>
                        <h6 className={"text-center"}>
                            PROJECT BACKGROUND
                        </h6>
                        <h1 className={"text-center"}>Aplyza's Metaverse</h1>
                    </div>
                    <div className={"col-sm-4"}>
                        <div className={"feature-box"}>
                            <h1><i className={"fas fa-gamepad social-icon"}/></h1>
                            <h4>Game Portal</h4>
                            <p className={"feature-desc"}>
                                MFT Based IDO platform on Binance Smart Chain.
                                Main Portal for all Aplyza Game Metaverse.
                                Get value by holding game item.
                            </p>
                        </div>
                    </div>
                    <div className={"col-sm-4"}>
                        <div className={"feature-box"}>
                            <h1>
                                <i className={"fas fa-shopping-cart social-icon"}/>
                            </h1>
                            <h4>NFT Marketplace</h4>
                            <p className={"feature-desc"}>
                                To enable game character and items exchange and give value to the holder
                            </p>
                        </div>
                    </div>
                    <div className={"col-sm-4"}>
                        <div className={"feature-box"}>
                            <h1>
                                <i className={"fas fa-globe-asia social-icon"}/>
                            </h1>
                            <h4>Local Game Incubator</h4>
                            <p className={"feature-desc"}>
                                To make local games in Indonesia and Southeast Asia  integrated with blockchain and more fun
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tokenomic"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <h3>Tokenomic</h3>
                            <h1>Aplyza Token</h1>
                            <p>
                                Build on Binance Smart Chain with play to earn ecosytem , NFT and
                                other gamification.
                                <br/>
                                <br/>
                                With fair allocation , public pre-sale for early bird and high liquidity.
                                Team allocation will be locked for 6 months and gradually opened.
                            </p>
                        </div>
                        <div className={"col-sm-6"}>
                            <Image src={Tokenomic} className={"full-image"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"roadmap"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-sm-12"}>
                            <h1>Project Roadmap</h1>
                            <ul className="timeline">
                                <li>
                                    <h2>Q3 2021</h2>
                                    <ul>
                                       <li>Website & Social Media Release</li>
                                       <li>ICO/Presale</li>
                                       <li>Security Audit</li>
                                       <li>Reanounce Contract Ownership</li>
                                       <li>DEX Listing</li>
                                        <li>NFT Blindbox</li>
                                    </ul>
                                </li>
                                <li>
                                    <h2>Q1 2022</h2>
                                    <ul>
                                        <li>NFT Marketplace</li>
                                        <li>Coingecko & Coinmarketcap Listing</li>
                                        <li>NFT Mining Function</li>
                                        <li>Game Development & Public Beta Phase 1</li>
                                    </ul>
                                </li>
                                <li>
                                    <h2>Q2 2022</h2>
                                    <ul>
                                        <li>CEX Listing</li>
                                        <li>Marketing Push</li>
                                        <li>Public Beta Phase 2 & Game Release</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"countdown"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-sm-12"}>
                            <h1>Game & NFT Project List</h1>
                            <div className={"row"}>
                                <div className={"col-sm-6"}>
                                    <Image src={raid} className={"full-image"}/>
                                </div>
                                <div className={"col-sm-6"}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
