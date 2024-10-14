import { Flex } from "antd";
import { PropsWithChildren } from "react";
import Logo from "../Logo";

const Panel = (props: PropsWithChildren) => {
  return (
    <main className="bg-gray-400/[0.2] w-[20rem] md:w-[40rem] lg:w-[50rem] p-8 md:px-16 lg:px-32 rounded-xl">
      <Flex justify="center" className="mb-[24px]">
        <Logo />
      </Flex>
      {props.children}
    </main>
  );
};

export default Panel;
