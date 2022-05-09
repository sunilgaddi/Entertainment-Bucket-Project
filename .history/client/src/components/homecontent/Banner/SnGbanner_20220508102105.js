function SnGbanner({url}) {
    return (
        <div className='banner__section' style={{ backgroundImage: url(), backgroundPosition: 'center', backgroundSize: "cover" }}>
        </div>
    )
}

export default SnGbanner