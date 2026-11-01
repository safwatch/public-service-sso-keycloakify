declare module "keycloakify-emails/variables" {
  export function createVariablesHelper(templateName: string): {
    exp: (exp: string) => string;
    v: (exp: string) => string;
  };
}
