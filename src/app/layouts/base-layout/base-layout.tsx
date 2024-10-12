import BaseLayoutFooter from "./footer/base-layout.footer";
import BaseLayoutHeader from "./header/base-layout.header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <BaseLayoutHeader />
      <div className="w-full flex flex-col items-center my-16">
        <div className="w-[1280px]">{children}</div>
      </div>
      <BaseLayoutFooter />
    </>
  );
};

export default BaseLayout;
