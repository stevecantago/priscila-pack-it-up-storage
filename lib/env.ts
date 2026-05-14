type EnvGroup = {
  label: string;
  names: string[];
};

const requiredEnvGroups: EnvGroup[] = [
  {
    label: "Storable embed",
    names: [
      "NEXT_PUBLIC_STORABLE_ENV_URL",
      "NEXT_PUBLIC_STORABLE_PROVIDER_ID",
      "NEXT_PUBLIC_STORABLE_ORGANIZATION_ID",
      "NEXT_PUBLIC_STORABLE_FACILITY_ID",
      "NEXT_PUBLIC_STORABLE_ACCESS_KEY",
    ],
  },
  {
    label: "Contact form SMTP",
    names: ["CONTACT_TO_EMAIL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"],
  },
];

export type MissingEnvGroup = {
  label: string;
  names: string[];
};

export function getMissingRequiredEnvGroups() {
  return requiredEnvGroups
    .map((group) => ({
      label: group.label,
      names: group.names.filter((name) => !process.env[name]),
    }))
    .filter((group) => group.names.length > 0);
}

let hasWarned = false;

export function warnOnceForMissingRequiredEnv() {
  if (process.env.NODE_ENV === "production" || hasWarned) {
    return;
  }

  const missingGroups = getMissingRequiredEnvGroups();

  if (missingGroups.length === 0) {
    hasWarned = true;
    return;
  }

  hasWarned = true;
  console.warn("[env] Missing required environment variables", missingGroups);
}
