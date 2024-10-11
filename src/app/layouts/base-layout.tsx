import BaseLayoutHeader from "./base-layout.header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div>
      <BaseLayoutHeader />
      <div>{children}</div>
      <div>footer</div>
    </div>
  );
};

export default BaseLayout;
