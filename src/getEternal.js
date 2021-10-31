import React, { Component } from 'react'
import './App.css';
import './table.css';


class GetEternal extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            mp: 0,
            workers: 0,
            eternalPrice: 0,
            updateTimer: 0,
            minepower: [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000],
            planets: ["Odrocury","Thabbiter","Pulmeron","Ecryria","Searus","Gemia","Malphus","Neuter","Grarvis 022","Sorth 33A5","Dutrabos","Lustronides","Zullosie","Yimagua","Haostea","Kongebro","Vuruturn","Droxuyama","Miuq I11","Zapus 5M0","Begelia","Gochimars","Konvides","Donvillon","Ania","Aenerth","Tachiron","Cichurilia","Gagua 07","Sector G"],
            oracle_adjustment: [1,2,3,4.125,5.25,6.5,7.75,9,10.25,11.625,14.375,16.125,18,19.875,22.375,24.125,26.5,28.875,31.375,34,44.5,48.5,52.75,57.25,62,67.125,72.5,78.25,84.25,90.75],
            worker_count: [2,2,3,4,4,6,7,8,9,10,11,12,12,13,13,14,14,15,15,16,17,18,19,20,21,22,23,24,25,26],
            success_chance: [0.88,0.86,0.84,0.82,0.80,0.78,0.76,0.74,0.72,0.70,0.68,0.66,0.64,0.62,0.60,0.58,0.56,0.54,0.52,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50],
            visibilityNormal: "",
            visibilityFleet:"d-none",
            sheetType: "Info",
            inputVisFleet: "d-none",

            d_success_chance: [0.85,0.83,0.81,0.79,0.77,0.75,0.73,0.71,0.69,0.67,0.6,0.58,0.56,0.54,0.52,0.50,0.48,0.46,0.44,0.42,0.41,0.41,0.41,0.41,0.41,0.39,0.39,0.39,0.39,0.39],
            c_success_chance: [0.88,0.86,0.84,0.82,0.8,0.78,0.76,0.74,0.72,0.70,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.51,0.49,0.47,0.43,0.43,0.43,0.43,0.43,0.40,0.40,0.40,0.40,0.40],
            b_success_chance: [0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.77,0.75,0.73,0.67,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.51,0.49,0.47,0.47,0.47,0.47,0.47,0.45,0.45,0.45,0.45,0.45],
            a_success_chance: [0.93,0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.77,0.75,0.71,0.69,0.67,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.52,0.52,0.52,0.52,0.52,0.50,0.50,0.50,0.50,0.50],
            s_success_chance: [0.97,0.95,0.93,0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.74,0.72,0.70,0.68,0.66,0.64,0.62,0.60,0.58,0.56,0.55,0.55,0.55,0.55,0.55,0.53,0.53,0.53,0.53,0.53],
            fleet_rank: "",
            fleet_level: 0,
            rank_reward: [1,1.01,1.02,1.03,1.04,1.05,1.1,1.12,1.14,1.16,1.20,1.205,1.21,1.215,1.22,1.225,1.25,1.255,1.26,1.265,1.27,1.3,1.305,1.31,1.315,1.35],

            visInfo: "",
            visFleetRank: "d-none",
            visFleetLevel: "d-none"

        }
        
        this.setMP = this.setMP.bind(this);
        this.setWorkers = this.setWorkers.bind(this);
        this.setFleetLevel = this.setFleetLevel.bind(this);
        this.setFleetRank = this.setFleetRank.bind(this);
    }

    async loadData(){
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=cryptomines-eternal&vs_currencies=usd"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({eternalPrice: data["cryptomines-eternal"]["usd"]})
        console.log(data);
    }

    async componentDidMount() {
        this.loadData()
        this.updateTimer = setInterval(() => this.loadData(), 2000);
    }

    async componentWillUnmount() {
        clearInterval(this.updateTimer);
    }


    // Normal

    getMinePower(i){
        return this.state.minepower[i]
    }
    getMineUSD(i){
        return parseFloat(5.0 * this.state.oracle_adjustment[i]).toFixed(2)
    }
    
    setMP(event){
        this.setState({mp : event.target.value})
    }

    setWorkers(event){
        this.setState({workers: event.target.value})
    }

    setFleetRank(event){
        this.setState({fleet_rank: event.target.value})
    }
    
    setFleetLevel(event){
        this.setState({fleet_level: event.target.value})
    }
    btnVisNrm = () => {
        this.setState({visibilityNormal: "mb-4", visibilityFleet: "d-none", inputVisFleet: "d-none", sheetType:"Info"})
    }
    btnFleets = () => {
        this.setState({visibilityNormal: "d-none", visibilityFleet: "", inputVisFleet: "col-7 row", sheetType:"Fleet Sheet: 5% Fuel Fee Factored In"})
    }

    btnFleetInfo = () => {
        this.setState({visInfo: "mb-4", visFleetLevel: "d-none", visFleetRank: "d-none"})
    }
    btnFleetRanks = () => {
        this.setState({visInfo: "d-none", visFleetLevel: "d-none", visFleetRank: "mb-4"})
    }
    btnFleetLevels = () => {
        this.setState({visInfo: "d-none", visFleetLevel: "mb-4", visFleetRank: "d-none"})
    }


    //(Who called in the) Fleet

    getFleetMineETL(i){
        return parseFloat((this.getFleetMineUSD(i)/this.state.eternalPrice)).toFixed(3)
    }

    getFleetMineUSD(i){
        return parseFloat( (this.getMineUSD(i) * this.state.rank_reward[this.state.fleet_level] ) - (0.05 * this.getMineUSD(i)) ).toFixed(2)
    }

    getFleetSRvsUSD(i){
        return parseFloat(this.getFleetMineUSD(i)*7 * this.getFleetSuccessChance(i) / 100).toFixed(2)
    }

    getFleetContractCost(){
        return parseFloat(((7*this.state.workers)/this.state.eternalPrice)).toFixed(3)
    }

    getFleetNet(i){
        return parseFloat(((this.getFleetMineUSD(i)*7) * (this.getFleetSuccessChance(i)/100)) - (this.state.workers*7)).toFixed(2)
    }

    getFuel(i){
        return parseFloat(this.getMineUSD(i) * 0.05).toFixed(2)
    }

    getFleetSuccessChance(i){
        if (this.state.fleet_rank === "D" || this.state.fleet_rank === "d" ) {
            return this.getFleetDSR(i)
        } else if (this.state.fleet_rank === "C" || this.state.fleet_rank === "c" ) {
            return this.getFleetCSR(i)
        } else if (this.state.fleet_rank === "B" || this.state.fleet_rank === "b" ) {
            return this.getFleetBSR(i)
        } else if (this.state.fleet_rank === "A" || this.state.fleet_rank === "a" ){
            return this.getFleetASR(i)
        } else if (this.state.fleet_rank === "S" || this.state.fleet_rank === "s" ){
            return this.getFleetSSR(i)
        }   
    }
    getFleetSuccessChanceM(i){
        if (this.state.fleet_rank === "D" || this.state.fleet_rank === "d" ) {
            return this.getFleetDSRM(i)
        } else if (this.state.fleet_rank === "C" || this.state.fleet_rank === "c" ) {
            return this.getFleetCSRM(i)
        } else if (this.state.fleet_rank === "B" || this.state.fleet_rank === "b" ) {
            return this.getFleetBSRM(i)
        } else if (this.state.fleet_rank === "A" || this.state.fleet_rank === "a" ){
            return this.getFleetASRM(i)
        } else if (this.state.fleet_rank === "S" || this.state.fleet_rank === "s" ){
            return this.getFleetSSRM(i)
        }   
    }

    getFleetDSR(i){
        if (this.state.mp > 5449) {
            return 88
        } else if (this.state.mp > 1499 && this.state.mp < 5450) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.d_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return 88
            } else if (answer < 39 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i] ){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetDSRM(i){
        if (this.state.mp > 5449) {
            return '88%'
        } else if (this.state.mp > 1499 && this.state.mp < 5450) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.d_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return '88%'
            } else if (answer < 39 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i] ){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)+'%'
        }
    }

    getFleetCSR(i){
        if (this.state.mp > 5399) {
            return 88
        } else if (this.state.mp > 1499 && this.state.mp < 5400) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.c_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return 88
            } else if ( answer < 40 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i] ){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetCSRM(i){
        if (this.state.mp > 5399) {
            return 88+'%'
        } else if (this.state.mp > 1499 && this.state.mp < 5400) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.c_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return 88+'%'
            } else if ( answer < 40 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i] ){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)+'%'
        }
    }

    getFleetBSR(i){
        if (this.state.mp > 1499 && i === 0){
            return 91
        } else if (this.state.mp > 1499 && i === 1){
            return 89
        }
        else if (this.state.mp > 5149) {
            return 88
        } 
        
        else if (this.state.mp > 1499 && this.state.mp < 5150) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.b_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return 88
            } else if ( answer < 45 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetBSRM(i){
        if (this.state.mp > 1499 && i === 0){
            return 91+'%'
        } else if (this.state.mp > 1499 && i === 1){
            return 89+'%'
        }
        else if (this.state.mp > 5149) {
            return 88+'%'
        } 
        else if (this.state.mp > 1499 && this.state.mp < 5150) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.b_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return 88+'%'
            } else if ( answer < 45 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)+'%'
        }
    }

    getFleetASR(i){
        if (this.state.mp > 1499 && i === 0) {
            return 93
        } else if (this.state.mp > 1499 && i === 1){
            return 91
        } else if (this.state.mp > 1499 && i === 2){
            return 89
        } else if (this.state.mp > 4899){
            return 88
        }
        else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.a_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88 && i === 0){
                return 93
            } else if (answer > 88 && i === 1){
                return 91
            } else if (answer > 88 && i === 2){
                return 89
            } else if (answer > 88 && i !== 2){
                return 88
            } else if ( answer < 50 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)
        }
    }

    getFleetASRM(i){
        if (this.state.mp > 1499 && i === 0) {
            return 93+'%'
        } else if (this.state.mp > 1499 && i === 1){
            return 91+'%'
        } else if (this.state.mp > 1499 && i === 2){
            return 89+'%'
        } else if (this.state.mp > 4899){
            return 88+'%'
        }
        else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.a_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88 && i === 0){
                return 93+'%'
            } else if (answer > 88 && i === 1){
                return 91+'%'
            } else if (answer > 88 && i === 2){
                return 89+'%'
            } else if (answer > 88 && i !== 2){
                return 88+'%'
            } else if ( answer < 50 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)+'%'
        }
    }


    getFleetSSR(i){
        if (this.state.mp > 1499 && i === 0){
            return 97
        } else if (this.state.mp > 1499 && i === 1){
            return 95
        } else if (this.state.mp > 1499 && i === 2){
            return 93
        } else if (this.state.mp > 1499 && i === 3){
            return 91
        } else if (this.state.mp > 4899){
            return 91
        }
        else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.s_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91 && i === 0){
                return 97
            } else if (answer > 91 && i === 1){
                return 95
            } else if (answer > 91 && i === 2){
                return 93
            } else if (answer > 91 && i === 3){
                return 91
            } else if (answer > 91 && i !== 3){
                return 91
            } else if ( answer < 53 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetSSRM(i){
        if (this.state.mp > 1499 && i === 0){
            return 97+'%'
        } else if (this.state.mp > 1499 && i === 1){
            return 95+'%'
        } else if (this.state.mp > 1499 && i === 2){
            return 93+'%'
        } else if (this.state.mp > 1499 && i === 3){
            return 91+'%'
        } else if (this.state.mp > 4899){
            return 91+'%'
        }
        else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.s_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91 && i === 0){
                return 97+'%'
            } else if (answer > 91 && i === 1){
                return 95+'%'
            } else if (answer > 91 && i === 2){
                return 93+'%'
            } else if (answer > 91 && i === 3){
                return 91+'%'
            } else if (answer > 91 && i !== 3){
                return 91+'%'
            } else if ( answer < 53 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)+'%'
        }
    }

    



    render(){
        return(
            <div class="container-fixed mx-5">
                <div class="container-fluid mx-2">
                    <div class="container-fluid">
                        <div class="row align-items-start border border-2 border-dark"> 
                            <p class="col-4 getEternalHeader mt-3"> <b>USD/ETL</b> -{'>'} <span class="text-primary">{this.state.eternalPrice}</span></p>
                            <p class="col-4 getEternalHeader mt-3"> <b>Contract (7 Days) / Worker</b> -{'>'} <span class="text-primary">{parseFloat(7/this.state.eternalPrice).toFixed(3)} ETL</span> </p>
                            <p class="col-4 getEternalHeader mt-3"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(3)} ETL</span> </p>
                        </div>
                    </div>

                    <div class="contrainer-fluid">
                        <div class="my-3 row">
                            <div class="col-5 row">
                                <div class="col-2">
                                    <button type="button" class="btn btn-custom" onClick={this.btnVisNrm}>Info</button>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn btn-custom" onClick={this.btnFleets}>Fleets</button>
                                </div>
                                <div class="col-6">
                                    <p class="text-center mt-2">{this.state.sheetType}</p>
                                </div>
                            </div>

                            <div class={this.state.inputVisFleet}>
                                <div title="MP affects Success Rate (SR)" class="col-2 pt-2">
                                    <p class="text-left">MP:</p>
                                </div>
                                <div title="MP affects Success Rate (SR)" class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setMP}></input>
                                </div>
                                <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                    <p class="text-left">Workers:</p>
                                </div>
                                <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setWorkers}></input>
                                </div>

                                <div class="col-4 mt-2"><p class="text-right">Hover on the fields to show tool-tip.</p></div>

                                <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                    <p class="text-left">Fleet Rank:</p>
                                </div>
                                <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setFleetRank}></input>
                                </div>
                                <div title="Fleet Levels are 0 to 25, they increase rewards earned" class="col-2 pt-2">
                                    <p class="text-left">Fleet Level:</p>
                                </div>
                                <div title="Fleet Levels are 0 to 25, they increase rewards earned" class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setFleetLevel}></input>
                                </div>

                                <div class="col-4 mt-2"><p class="text-right">Input Fleet Rank to show Success Rates.</p></div>

                            </div>


                        </div>
                    </div>

                        <div id="normal" class={this.state.visibilityNormal}>
                         

                            <div class="col-5 row my-4">

                                <div class="col-2">
                                    <button type="button" class="btn stretch text-size-14" onClick={this.btnFleetInfo}>CM Info</button>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn stretch text-size-14" onClick={this.btnFleetRanks}>Fleet Ranks</button>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn stretch text-size-14" onClick={this.btnFleetLevels}>Fleet Levels</button>
                                </div>
                            </div>


                            <div class="my-6">

                            <div class={this.state.visInfo}>
                                <p class="text-right1 my-4">

                                <b><a href="https://cryptomines.medium.com/crytomines-update-pre-raids-cac023eebc11" rel="noreferrer" target="_blank">Link to updates in Medium</a> </b> <br/><br/>
                        
                                WHAT’S NEW:<br/>

                                <b>QoL Changes:</b><br/>
                                — Daily Mining: You will now be able to <b>mine at any time of the day</b>, all daily mines will restart at <b>00:00 UTC.</b>
                                <br/>
                                — Unclaimed $ETERNAL: Updated the way the <b>daily withdrawal tax percentage decreases</b>, the tax will drop by 2% the <b>first time you go on an expedition in the day</b>. 
                                <br/>
                                <br/>

                                <b>Fleets:</b>
                                <br/>
                                — Fleets: They will be NFT created from the combination of all your Workers and Ships, this will lower the cost of GAS to all miners. <br/>
                                You can <b>add</b> NFTs to these fleets, or you can <b><span class="text-danger">disassemble</span></b> them, recovering all your workers and ships separately again.<br/>
                                — The initial cost of building your fleet will be close to the usual cost of an expedition, but, <b>your expeditions will now cost the equivalent of sending just one NFT!</b>
                                <br/>
                                Fleets main features:<br/>
                                — They will be able to have a custom name.<br/>
                                — The price of creating a fleet will vary depending on how many NFT you add to them.<br/>
                                — Once your Fleet is <b>created</b>, you can <b>add more Spaceships and Workers to make it stronger</b>, you must pay in $ETERNAL the cost of $0.5 USD per NFT added.<br/> 
                                All $ETERNAL collected from fleets will go directly to the reward pool.<br/>
                                —  For example, if you create a fleet with 4 NFTs, it will cost you a total of $2 USD in $ETERNAL.<br/>
                                — <b>More Ships and Workers can be added to them, <span class="text-danger">but they cannot be removed without separating the entire Fleet</span>, so choose your crew carefully!</b>.<br/>
                                — They will have as many spaces as your Spaceships allow, keeping a maximum of <b>10 Spaceships per fleet</b>.<br/>
                                — You will be able to have <b>multiple fleets on your account</b>. <b>Multiple Voyages!</b><br/>
                                — They will gain experience and level up, allowing them to increase rewards in the long run. <br/>
                                — When you <b><span class="text-danger">disband your fleet you will lose the levels you have gained</span></b>.<br/>
                                — Individual contracts to your workers will be replaced by a <b>fleet contracts, which will have the same total cost of regular contracts, but in a single transaction</b>, reducing GAS costs. <br/>
                                You will be able to <b>choose between using $ETERNAL from your unclaimed rewards or from your wallet</b>, you will also get a small discount for hiring them for longer periods.<br/>
                                — Fleets can be <b>bought and sold in the Marketplace</b>.
                                <br/>
                                <br/>
                                <b>Economy:</b><br/>

                                — Fuel⛽: It will be necessary to be able to perform regular explorations to the Planets and will have to be purchased prior to the expedition. 
                                <br/>The cost of fuel will vary depending on the Planet you wish to explore, the farther away the Planet is, the more fuel will be needed to explore it, having approximately a value of 5% of the reward of that Planet.<br/>
                                All $ETERNAL collected from fuel will go directly into the reward pool.<br/>
                                — Marketplace: We monumentally improved our internal marketplace to support the hundreds of thousands of transactions that take place daily, the Marketplace tax will go up by 5%, reaching a total of 15%.
                                <br/>All $ETERNAL collected from the Marketplace will go directly to the rewards pool.

                                <br/><br/>

                                <b>From AMA:</b><br/>
                                — What do you mean you are going to give me 11 levels and a lot of money?
                                <br/>&emsp;&emsp;Players who create their fleet during the event will be given Level 11 for each fleet created (FLEET LEVEL), allowing players to keep their rewards similar to how they were before the update, the more you level up your fleet, the better rewards you will get.
                                <br/>
                                — What is a fleet?
                                <br/>&emsp;&emsp;Fleet is a new nft, it is the union of ships and workers, allowing you to reduce your GAS costs for mining and other actions.
                                <br/>
                                — Why should I build a fleet?
                                <br/>&emsp;&emsp;It will be necessary to go on explorations and each exploration you do (win or lose) will earn you experience for your fleet.
                                <br/>
                                — Can I dismantle a fleet?
                                <br/>&emsp;&emsp;If you can dismantle it, you must take into account that you will lose the experience accumulated in your fleet, you'll get back all your worker's and spaceships.
                                <br/>
                                — Can the fleets be sold?
                                <br/>&emsp;&emsp;Yes, fleets can be sold on the market.
                                <br/>
                                — Are the fleets transferable? 
                                <br/>&emsp;&emsp;Yes, fleets are transferable.
                                <br/>
                                — Can the fleets be dismantled if they have a contract?
                                <br/>&emsp;&emsp;No, fleets with a contract cannot be dismantled. 
                                <br/>
                                — Can more nft be added to the fleets?
                                <br/>&emsp;&emsp;Yes, you can add more nft to add more range or mining power. 
                                <br/>
                                — How do I know what my fleet rank is? 
                                <br/>&emsp;&emsp;The fleet rank is determined by the ship with the highest rarity as long as you have the highest number of them, if you have the same amount of all rarities, the lowest will be chosen.
                                <br/>
                                — Can I merge two fleets? 
                                <br/>&emsp;&emsp;No, you would have to disassemble one fleet and add it's contents to the other if you have space, if not, you will have to reassemble both.
                                <br/>
                                — What happens to my workers contracts?
                                <br/>&emsp;&emsp;They will be transferred to the fleet and will be averaged once entered so that they all have the same contract time within the fleet. These contracts will be able to be paid with unclaimed $ETERNAL or from your wallet.
                                <br/>
                                — What is fuel ⛽️?
                                <br/>&emsp;&emsp;Fuel is necessary to be able to go on expeditions, it must be purchased prior to the expedition and costs approximately 5% of the rewards.
                                <br/>
                                — What will happen to the claim button?
                                <br/>&emsp;&emsp;The claim button is reduced by 2% once you make your first mining of the day, i.e. if you do not play one day, the withdrawal tax percentage does not decrease.

                                <br/>
                                <br/>
                                <br/>
                                

                                



                                </p>
                            </div>

                            <div class={this.state.visFleetRank}>
                                <div class="row">
                                    <div class="col-7">
                                    <p class="text-right1 mt-4">
                                        The Fleet RANK is based on the majority of ships in your fleet with the highest rarity, with a tie defaulting to lower rank.<br/> 
                                        Fleet rank affects the <b>SUCCESS RATE</b> of the planet you're mining — better rank = better success%. <br/>
                                        If the Majority of your ships are:<br/> 
                                        ★ = Rank D <br/> 
                                        ★★ = Rank C <br/> 
                                        ★★★ = Rank B <br/> 
                                        ★★★★ = Rank A <br/> 
                                        ★★★★★ = Rank S <br/> 
                                        So if you have 6 ships in your fleet, and 5 of them are ★, your fleet is Rank D. <br/> 
                                        If you by chance have even numbers, like 4 ships total, 2 are ★★ and the other 2 are ★★★, it defaults to the lower value, so Rank C.<br/> 
                                        <b>Only S Rank Fleets can break the 88% Success Rate cap to 91%.</b>

                                        <br/> 
                                        <br/> 
                                        <br/> 
                                        <b>Fleet Ranks determine Base Success Rate</b>. Refer to image: <br/> 
                                        <b>This affects Veterans Guild. Check Fleets Calculator and figure out your Success Rates based on Fleet Rank and MP.</b>
                                    </p>
                                    </div>
                                    <div class="col-5">
                                        <img 
                                        src="https://miro.medium.com/max/631/1*g_vxLk4DtIP7l5q1e-gU8Q.png"
                                        alt="new"
                                        />
                                    </div>
                                </div>
                                
                                

                                


                            </div>

                            <div class={this.state.visFleetLevel}>
                                <div class="row">
                                    <div class="col-8">

                                    <p class="text-right1 mt-4">
                                        Fleet LEVEL determines the <b>additional rewards gained</b> when you mine with your fleet. 
                                        <br/>
                                        <br/>In order to allow a progressive scaling to all our players, your Fleets will be able to level up which will allow you to reach better earnings 
                                        <br/>starting from a more limited point, improving your rewards with respect to the initial levels up to 35%. <br/>
                                        In order to progress in an optimal way, you will have to climb between Planets, as you go up each Tier of experience (levels 6, 11, 16, 21 and 25)
                                        <br/> the amount of experience received in planets lower than your Tier decreases.<br/>
                                        <br/>

                                        <b>Win or Lose, your Fleet still gains Experience</b>
                                        <br/>
                                        Experience Earned is around 5 / Expedition
                                    </p>

                                    
                                    </div>
                                    <div class="col-4">
                                    <img 
                                    src="https://miro.medium.com/max/513/1*PbTRw6E5g8fwlLTnpZePww.png"
                                    alt="new"
                                    />
                                    </div>
                                </div>
                                
                                
                            </div>

                            </div>


                        </div>

                        <div id="fleet" class={this.state.visibilityFleet}>
                            <table>
                                <tr class="border border-dark">
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border border-2 border-dark">Planet</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle Reward Multiplier</th>
                                    <th class="border border-2 border-dark">Mine Reward (ETL)</th>
                                    <th class="border border-2 border-dark">Mine Reward (USD)</th>
                                    <th class="border border-2 border-dark">Fuel Cost (USD)</th>
                                    <th class="border border-2 border-dark">Success Rate (SR)</th>
                                    <th class="border border-2 border-dark">7 Day Reward (USD) vs SR</th>
                                    <th class="border border-2 border-dark">Est. Workers</th>
                                    <th class="border border-2 border-dark">Worker Contract Upkeep / 7d </th>
                                    <th class="border border-2 border-dark">Net Profit / 7d</th>
                                </tr>
                                {/* Fleet */}
                                {(() => {
                                    const print = [];
                                    for (let i=0; i<30; i++){
                                        print.push(
                                            <tr>
                                                <td class="border border-secondary">{i+1}</td>
                                                <td class="border border-secondary">{this.state.planets[i]}</td>
                                                <td class="border border-secondary purp">{this.getMinePower(i)}</td>
                                                <td class="border border-secondary gray">{parseFloat(this.state.oracle_adjustment[i]).toFixed(3)}</td>
                                                <td class="border border-secondary text-primary">{this.getFleetMineETL(i)} ETL</td>
                                                <td class="border border-secondary">${this.getFleetMineUSD(i)}</td>
                                                <td class="border border-secondary">${this.getFuel(i)}</td>
                                                <td class="border border-secondary text-secondary"><b>{this.getFleetSuccessChanceM(i)}</b></td>
                                                <td class="border border-secondary">${this.getFleetSRvsUSD(i)}</td>
                                                <td class="border border-secondary">{this.state.workers}</td>
                                                <td class="border border-secondary text-primary">{this.getFleetContractCost()} ETL</td>
                                                <td class="border border-secondary">${this.getFleetNet(i)}</td>
                                            </tr>
                                        )
                                    }
                                    return print
                                })()}
                            </table>
                        </div>


                        <div class="row align-items-start mt-6">
                            <div class="col-6">
                                <p class="disclaimer">
                                Disclaimer: ORM Matrix is based on observation and not actual value (unless the devs gives us the Data).
                                <br/>
                                All values are approximation and should only be used as a template. ETL/USD updates are every 2 seconds.
                                <br/>
                                Mobile View is currently non-existent. You have been warned. <strike>I'll get back to it if I'm not busy.</strike>
                                </p>
                                
                            </div>
                            <div class="col-6">
                                <p class="credits text-info">
                                Original Sheet and ORM Matrix by: Discord@starl3xx#2691
                                <br/>
                                Made by: Discord@Jucci#0007
                                <br/>
                                Found bugs? Want to help? Send us a message.
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default GetEternal
