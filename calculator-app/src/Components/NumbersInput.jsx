
const NumbersInput = ({numtxt, onClick}) => {
  return (
    <>
        <div className='col-4 input-num p-1'>
            <button type='button' className='btn-num fw-bold w-100 p-1' onClick = {onClick}>{numtxt}</button>
        </div>
    </>
  );
};

export default NumbersInput;