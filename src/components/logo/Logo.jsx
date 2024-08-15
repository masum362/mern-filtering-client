import logoImage from '../../assets/bankash.png'

const Logo = () => {
    return (
        <div className='flex items-center justify-center'>
            <img src={logoImage} alt='logo-image' className='w-10 h-10 object-cover scale-150 ' />
        </div>
    )
}

export default Logo