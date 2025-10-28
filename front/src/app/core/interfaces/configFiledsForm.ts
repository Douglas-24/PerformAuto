export interface ConfigFieldsForm {
    key: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'password' | 'select' | 'checkbox' | 'textarea';
    options?: string[];
    placeholder?: string;
    validator?: string[]
}