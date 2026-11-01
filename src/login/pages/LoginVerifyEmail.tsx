import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Layout } from "../../base/components";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { Alert } from "antd";
import Logo from "../../assets/images/app-logo.png";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <div className="loginVerifyEmail">
            <Template
                kcContext={kcContext}
                i18n={i18n}
                doUseDefaultCss={doUseDefaultCss}
                classes={classes}
                displayMessage={false}
                displayInfo={false}
                headerNode={msg("emailVerifyTitle")}
            >
                <Layout>
                    <div className="loginVerifyEmailContent">
                        {kcContext.message && (
                            <Alert
                                message={kcSanitize(kcContext.message.summary)}
                                type={kcContext.message.type === "error" ? "error" : kcContext.message.type === "warning" ? "warning" : "info"}
                                showIcon
                                style={{ marginBottom: 24 }}
                            />
                        )}
                        <div className="logo-wrapper">
                            <img src={Logo} alt="Public Service Portal" className="logo" />
                        </div>
                        <p className="instruction">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
                        <p className="instruction">
                            {msg("emailVerifyInstruction2")}
                            <br />
                            <br />
                            <a href={url.loginAction}>{msg("doClickHere")}</a>
                            &nbsp;
                            {msg("emailVerifyInstruction3")}
                        </p>
                    </div>
                </Layout>
            </Template>
        </div>
    );
}
