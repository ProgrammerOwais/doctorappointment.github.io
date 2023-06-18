"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  // providers will use to get the user value
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  // const isUserLoggedIn = true;
  const { data: session } = useSession();

  return (
    <nav>
      <Link className="logo-div-link" href={"/"}>
      <div className="logo-div">
        <Image
          src={"/images/medicalLogo.png"}
          alt="medical Logo"
          width={32}
          height={32}
          className="logo"
        />
        <h1 className="name">HealthApp</h1>
      </div>
      </Link>
      <div className="links-div">
        <ul className="link-list">
        <li>
            <Link className="link-items" href={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="link-items" href={"/appointment"}>
              Appointment
            </Link>
          </li>
          <li>
            <Link className="link-items" href={"/profile"}>
              My Profile
            </Link>
          </li>
          <li>
            <Link className="link-items" href={"/about"}>
              About{" "}
            </Link>
          </li>
        </ul>
      </div>
      <div className="user-div">
        {session?.user ? (
          <>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="sign-in"
            >
              SignOut
            </button>
           <Link href={"/profile"}> <Image
              src={session?.user.image}
              alt="medical Logo"
              width={32}
              height={32}
              className="logo"
            /></Link>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="sign-in"
                >
                  SignIn
                </button>
              ))}{" "}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
