interface HeaderProps {
  propsMessage: string;
}

function Header({ propsMessage }: HeaderProps) {
  console.log(`${propsMessage} Header`);

  return (
    <header>
      <strong>QA Agency Posts</strong>
    </header>
  );
}

export default Header;
