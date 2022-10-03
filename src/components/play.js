import './play.css'
const Play = ({ handleClose, show, data }) => {
  const showHideClassname = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={showHideClassname}>
      <section className="modal-main">
        <div className='flex justify-end'>
          <button onClick={handleClose} className="px-4 pt-2">
            <i className='fas fa-times'></i>
          </button>
        </div>
        <div className='px-4 pb-4'>
          {data ?
            <audio controls autoPlay style={{ margin: 'auto' }}>
              <source src={data} type="audio/mpeg" ></source>
            </audio> : ''

          }
        </div>
      </section >
    </div >
  )
}

export default Play
