import Container from "@/app/components/Container";
import Logo from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import UserMenu from "@/app/components/navbar/UseMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  // console.log('Navbar')
  // console.log(currentUser)
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0 ">
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
