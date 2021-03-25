import React from 'react';
import './MemoryCard.css'

class MemoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
    }

    clickHandler = () => {
        this.setState({
            isFlipped: !this.state.isFlipped
        });
    }

    render() {
        let innerClass = "MemoryCard__inner "
        if (this.props.isFlipped === true) {
            innerClass = innerClass.concat("flipped")
        }
        return(
            <div className="MemoryCard" onClick={this.props.pickCard}>
                <div className={innerClass}>
                    <div className="MemoryCard__back">
                        <img className="DClogo"src="https://www.digitalcrafts.com/img/logo-wrench-white.png" alt="digitalcrafts logo"></img>
                    </div>
                    <div className="MemoryCard__front">
                    {this.props.symbol}
                    </div>
                </div>
            </div>
        )
    }
}


export default MemoryCard;