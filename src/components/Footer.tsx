const Footer = () => {
  return (
    <footer className="mt-auto bg-primary-700 text-white p-2">
      <p className="text-sm text-center">
        Designed and Developed by{" "}
        <a
          href="https://github.com/ritatanght"
          target="__blank"
          className="hover:underline"
        >
          Rita Tang
        </a>
        . Copyright &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
