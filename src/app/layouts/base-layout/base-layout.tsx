import BaseLayoutFooter from "./footer/base-layout.footer";
import BaseLayoutHeader from "./header/base-layout.header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <BaseLayoutHeader />
      <div className="w-full flex flex-col items-center px-2">
        <div className="md:w-[680px] xl:w-[1280px] mt-16">{children}</div>
      </div>
      <BaseLayoutFooter />
    </>
  );
};

export default BaseLayout;
