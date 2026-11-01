import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-actions-required.ftl" });

const meta = {
    title: "login/login-actions-required.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const SingleAction_VerifyEmail: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        pageId: "login-actions-required.ftl",
        realm: { displayName: "Civic Portal" },
        url: { loginAction: "/continue" },
        requiredActions: ["VERIFY_EMAIL"]
      }}
    />
  )
};

export const SingleAction_UpdatePassword: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        pageId: "login-actions-required.ftl",
        realm: { displayName: "Civic Portal" },
        url: { loginAction: "/continue" },
        requiredActions: ["UPDATE_PASSWORD"]
      }}
    />
  )
};

export const MultipleActions: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        pageId: "login-actions-required.ftl",
        realm: { displayName: "Civic Portal" },
        url: { loginAction: "/continue" },
        requiredActions: ["VERIFY_EMAIL", "UPDATE_PASSWORD", "CONFIGURE_TOTP"]
      }}
    />
  )
};

export const NoActionsFallback: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        pageId: "login-actions-required.ftl",
        realm: { displayName: "Civic Portal" },
        url: { loginAction: "/continue" },
        requiredActions: []
      }}
    />
  )
};

