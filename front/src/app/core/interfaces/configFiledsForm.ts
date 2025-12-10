export interface ConfigFieldsForm {
    key: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'password' | 'select' | 'checkbox' | 'textarea';
    options?: OptionSelect[];
    placeholder?: string;
    validator?: string[]
}

export interface OptionSelect {
    value: string | number ;
    label: string;
}