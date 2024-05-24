"use server";

import { getProviders } from "next-auth/react";
import { cn } from "@/shared/ui/utils";
import { EmailSignInForm } from "./_ui/email-sign-in-form";
import { Divider } from "./_ui/divider";
import { ProviderButton } from "./_ui/provider-button";
import { privateConfig } from "@/shared/config/private";
import { TestEmailSignInForm } from "./_ui/test-email-sign-in-form";
import { Suspense } from "react";

export async function SignInForm({ className }: { className?: string }) {
  const providers = await getProviders();
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  const testToken = privateConfig.TEST_EMAIL_TOKEN;

  return (
    <div className={cn("grid gap-6", className)}>
      <Suspense>
        {testToken ? (
          <TestEmailSignInForm testToken={testToken} />
        ) : (
          <EmailSignInForm />
        )}
        {oauthProviders.length > 0 && (
          <>
            <Divider />
            {oauthProviders.map((provider) => (
              <ProviderButton key={provider.id} provider={provider} />
            ))}
          </>
        )}
      </Suspense>
    </div>
  );
}
