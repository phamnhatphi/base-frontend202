import type { useAbility } from '@casl/vue';

export type RetrieveApiResponse<T> = {
    data: T;
};

export type ValidationErrors = Record<
    string,
    string | string[] | Record<string, string | string[]> | Record<string, string | string[] | Record<string, string | string[]>>[]
>;

export type Ability = ReturnType<typeof useAbility>;

export type ValidationResult = string | boolean;
export type ValidationRule<T = unknown> =
    ((val: T) => ValidationResult) | ((val: T) => PromiseLike<ValidationResult>);
export type ValidationRuleGenerator<ValT = unknown, OptsT = unknown> =
    OptsT extends object
        ? (options?: OptsT, errorMessage?: string) => ValidationRule<ValT>
        : (errorMessage?: string) => ValidationRule<ValT>;

export type Permission = {
    subject: string;
    action: string;
};
export type PermissionCallable = (ability: Ability) => boolean;
export type PermissionRule = Permission | PermissionCallable;

export type ApiEndpoint<UriType> = {
    uri: UriType;
    method: 'get' | 'post' | 'put' | 'delete' | 'head' | 'options';
};
