import { Password } from ".";

export default {
  title: "Components/Password",
  component: Password,
  argTypes: {
    property1: {
      options: ["variant-3", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "variant-3",
    className: {},
  },
};
