
const MathsInput = ({type, icon, id, onClick}) => {
  return (
    <>
        <div className='col-6 input-math p-1'>
            <button type={type} id={id} className='btn-math w-100 ms-2' onClick = {onClick}>{icon}</button>
        </div>
    </>
  );
};

export default MathsInput;