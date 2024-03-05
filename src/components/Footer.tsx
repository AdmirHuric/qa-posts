interface FooterProps {
  propsMessage: string;
}

function Footer({ propsMessage }: FooterProps) {
  console.log(`${propsMessage} Footer`);

  return (
    <footer>
      <small>&copy; {new Date().getFullYear()}, QA Agency</small>
    </footer>
  );
}

export default Footer;
