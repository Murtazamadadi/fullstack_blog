import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/user/userSlice';


export default function Header() {
  const path = useLocation().pathname;
 
// ================================================= use Redux veriable
const {currentUser}=useSelector(state=>state.user)

// ================================================= use Redux selector
const dispatch=useDispatch()

  const handleLogout=async()=>{
    try{
      const res=await fetch("/api/v1/auth/logout",{
        method:"POST"
      })

      const data=await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(logoutSuccess(res.data))
      }
    }catch(err){
      console.log(err.message)
    }
  }
 
  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          مرتضی
        </span>
        وبلاگ
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='جستجو'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
        >
          <FaMoon/>
        </Button>
        {
          currentUser? (
            <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
              alt='user' img={currentUser?.profilePicture}
              rounded
              />
            }
            >
            <DropdownHeader>
              <span className='block text-sm'>@{currentUser?.username}</span>
              <span className='block text-sm font-medium truncate'>@{currentUser?.email}</span>
            </DropdownHeader>
            <Link to={"/dashboard/tab=profile"}>
            <DropdownItem>پروفایل</DropdownItem>
            </Link>
            <DropdownDivider/>
            <DropdownItem onClick={handleLogout}>
              LogOut
            </DropdownItem>
            </Dropdown>
          ):(
            <Link to='/login'>
              <Button gradientDuoTone='purpleToBlue' outline>
                ورود
              </Button>
            </Link>

          )
        }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'} className='ml-5'>
          <Link to='/'>صفحه اصلی</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>درباره ما</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>پروژه ها</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
