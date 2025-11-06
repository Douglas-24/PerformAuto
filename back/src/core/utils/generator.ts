import { generate } from 'generate-password'
export function passwordGenerate() {
    return generate({
        length: 16,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        strict: true
    })
}

