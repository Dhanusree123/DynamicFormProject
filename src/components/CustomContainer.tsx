import { Stack, Container } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const CustomContainer = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Container
        maxWidth="md"
        component={Stack}
        spacing={3}
        sx={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
      >
        {children}
      </Container>
    </>
  );
};

export default CustomContainer;
