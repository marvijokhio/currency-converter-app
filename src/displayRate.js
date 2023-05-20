import PropTypes from "prop-types";
import './DisplayRate.css';

function DisplayRate(props) {
  return (
    <div className="display_rate" value={props.conv_rate} onChange={ev => props.onTheChange(ev.target.value)}>
      {props.conv_rate} 
    </div>
  );
}

DisplayRate.propTypes = {
  conv_rate: PropTypes.number.isRequired,
  onTheChange: PropTypes.func,

};

export default DisplayRate;