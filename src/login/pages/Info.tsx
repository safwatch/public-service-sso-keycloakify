// src/login/pages/Info.tsx
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { Layout } from "../../base/components";
import { Button, Alert } from "antd";
import Logo from "../../assets/images/app-logo.png";
import { DoubleRightOutlined } from "@ant-design/icons";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { requiredActions = [], actionUri, url, message } = kcContext;
    const { msg, msgStr } = i18n;

    const isActionToken = requiredActions.length > 0;
    const raDict = kcContext["x-keycloakify"]?.messages ?? {};

    const portalUrl = kcContext.properties.PORTAL_URL;
    const portalLabel = kcContext.properties.PORTAL_LABEL;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={isActionToken ? msg("performFollowingActions") : msg("infoTitle", kcContext.realm.displayName)}
        >
            <Layout>
                <div className="child-content-wrapper">
                    <div id="kc-form">
                        <div id="kc-form-wrapper">
                            <div className="logo-wrapper">
                                <img src={Logo} alt="Public Service Portal" className="logo" />
                            </div>
                            <div id="kc-info" className={kcClsx("kcSignUpClass")} style={{ marginTop: 20 }}>
                                <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                    {isActionToken ? (
                                        <div>
                                            <Alert
                                                type="info"
                                                message={msg("performFollowingActions")}
                                                description={
                                                    <ul style={{ marginTop: 8 }}>
                                                        {requiredActions.map((a, i) => (
                                                            <li key={i}>{raDict[`requiredAction.${a}`] ?? a}</li>
                                                        ))}
                                                    </ul>
                                                }
                                            />
                                            <div style={{ marginTop: 16 }}>
                                                <a href={actionUri ?? url.loginAction}>
                                                    <Button type="primary">{msgStr("doContinue")}</Button>
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        // fallback
                                        <div>
                                            <Alert
                                                type={message?.type === "error" ? "error" : message?.type === "success" ? "success" : "info"}
                                                showIcon
                                                message={message?.summary ?? msgStr("infoMessage")}
                                            />
                                            {message?.type === "success" && (
                                                    <Button type="primary" href={portalUrl} id="kc-login-action" className="button-submit" block style={{ marginTop: 20 }}>
                                                        {portalLabel} <DoubleRightOutlined />
                                                    </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Template>
    );
}
