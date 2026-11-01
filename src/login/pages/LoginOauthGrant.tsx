import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Layout } from "../../base/components";
import { Alert, Button, List } from "antd";
import Logo from "../../assets/images/app-logo.png";

export default function LoginOauthGrant(props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url, oauth, client, message } = kcContext;

    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            bodyClassName="oauth"
            headerNode={
                <>
                    {client.attributes.logoUri && <img src={client.attributes.logoUri} />}
                    <p>{client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)}</p>
                </>
            }
        >
            <Layout>
                <div id="kc-oauth" className="content-area">
                    <div className="logo-wrapper">
                        <img src={Logo} alt="Public Service Portal" className="logo" />
                    </div>
                    <h3>{msg("oauthGrantRequest")}</h3>
                    {oauth.clientScopesRequested.length > 0 && (
                        <List
                            size="small"
                            bordered
                            dataSource={oauth.clientScopesRequested}
                            renderItem={clientScope => (
                                <List.Item>
                                    <span>
                                        {advancedMsg(clientScope.consentScreenText)}
                                        {clientScope.dynamicScopeParameter && (
                                            <>
                                                : <b>{clientScope.dynamicScopeParameter}</b>
                                            </>
                                        )}
                                    </span>
                                </List.Item>
                            )}
                        />
                    )}

                    {client.attributes.policyUri ||
                        (client.attributes.tosUri && (
                            <h3>
                                {client.name
                                    ? msg("oauthGrantInformation", advancedMsgStr(client.name))
                                    : msg("oauthGrantInformation", client.clientId)}
                                {client.attributes.tosUri && (
                                    <>
                                        {msg("oauthGrantReview")}
                                        <a href={client.attributes.tosUri} target="_blank" rel="noreferrer">
                                            {msg("oauthGrantTos")}
                                        </a>
                                    </>
                                )}
                                {client.attributes.policyUri && (
                                    <>
                                        {msg("oauthGrantReview")}
                                        <a href={client.attributes.policyUri} target="_blank" rel="noreferrer">
                                            {msg("oauthGrantPolicy")}
                                        </a>
                                    </>
                                )}
                            </h3>
                        ))}

                    {message && <Alert showIcon type={message?.type ?? "info"} message={message?.summary} />}
                    <form className="form-actions" action={url.oauthAction} method="POST">
                        <input type="hidden" name="code" value={oauth.code} />
                        <div className={kcClsx("kcFormGroupClass")}>
                            <div id="kc-form-options">
                                <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                            </div>

                            <div id="kc-form-buttons">
                                <div className={kcClsx("kcFormButtonsWrapperClass")}>
                                    <Button name="accept" id="kc-login" htmlType="submit" type="primary">
                                        {msgStr("doYes")}
                                    </Button>
                                    <Button name="cancel" id="kc-cancel" htmlType="submit" danger>
                                        {msgStr("doNo")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="clearfix"></div>
                </div>
            </Layout>
        </Template>
    );
}
