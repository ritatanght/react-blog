const Footer = () => {
  return (
    <footer className="mt-auto bg-primary-700 text-white p-2">
      <p className="text-sm text-center">
        Copyright &copy; {new Date().getFullYear()}{" "}
        <a href="https://github.com/ritatanght" target="__blank">
          Rita Tang
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
