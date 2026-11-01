import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Layout } from "../../base/components";
import { Alert, Button } from "antd";
import Logo from "../../assets/images/app-logo.png";
import { DoubleRightOutlined } from "@ant-design/icons";

export default function LoginActionsRequired(props: PageProps<Extract<KcContext, { pageId: "login-actions-required.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { requiredActions = [], url } = kcContext;
    const { msg, msgStr } = i18n;

    const labelForRequiredAction = (code: string) => {
        const key = `requiredAction.${code}`;
        const val = msgStr(key as never);
        return val === key ? code : val;
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("loginActionRequired")}
        >
            <Layout>
                <div id="kc-error-message">
                    <div className="logo-wrapper">
                        <img src={Logo} alt="Public Service Portal" className="logo" />
                    </div>
                    <div>
                        <p>{msg("performFollowingActions")}</p>
                        <Alert
                            type="warning"
                            description={
                                <ul style={{ marginLeft: 0 }}>
                                    {requiredActions.map((code, i) => (
                                        <li key={i}>{labelForRequiredAction(code)}</li>
                                    ))}
                                </ul>
                            }
                            style={{ marginBottom: 24 }}
                        />
                        <form action={url.loginAction} method="post">
                            <Button type="primary" htmlType="submit" id="kc-login-action" className="button-submit" block>
                                {msgStr("doContinue")} <DoubleRightOutlined />
                            </Button>
                        </form>
                    </div>
                </div>
            </Layout>
        </Template>
    );
}
