import messages from '../i18n/messages/fr.json';

type Messages = typeof messages;

function get<T extends object>(obj: T, path: string): string {
  const keys = path.split('.');
  let current: any = obj;
  for (const key of keys) {
    if (current == null) return path;
    current = current[key];
  }
  return typeof current === 'string' ? current : path;
}

function interpolate(str: string, params: Record<string, any>): string {
  return str.replace(/\{(\w+)(?:,[^}]*)?\}/g, (_, key) => {
    return params[key] !== undefined ? String(params[key]) : `{${key}}`;
  });
}

export function t(namespace: string) {
  return function (key: string, params?: Record<string, any>): string {
    const fullKey = `${namespace}.${key}`;
    const value = get(messages, fullKey);
    if (!params) return value;
    return interpolate(value, params);
  };
}

export function tHas(namespace: string) {
  return function (key: string): boolean {
    const fullKey = `${namespace}.${key}`;
    const value = get(messages, fullKey);
    return value !== fullKey;
  };
}
