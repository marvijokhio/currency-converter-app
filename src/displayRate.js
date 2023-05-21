import PropTypes from "prop-types";
import './DisplayRate.css';

function DisplayRate(props) {
  return (
    
    <div className="display_rate" value={props.conv_rate} onChange={ev => props.onTheChange(ev.target.value)}>
      <h3>{props.conv_rate} </h3>
    </div>
  );
}

DisplayRate.propTypes = {
  conv_rate: PropTypes.number.isRequired,
  onTheChange: PropTypes.func,

};

export default DisplayRate;