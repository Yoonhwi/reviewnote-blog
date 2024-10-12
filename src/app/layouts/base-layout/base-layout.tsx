import BaseLayoutFooter from "./footer/base-layout.footer";
import BaseLayoutHeader from "./header/base-layout.header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <BaseLayoutHeader />
      <div className="w-full flex flex-col items-center ">
        <div className="w-[1280px] mt-16">{children}</div>
      </div>
      <BaseLayoutFooter />
    </div>
  );
};

export default BaseLayout;
