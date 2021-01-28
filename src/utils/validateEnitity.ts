import { validate } from "class-validator"

interface ParsedValidationError {
    isSuccessful: boolean;
    error?: {
        [key: string]: any;
    }
}

function toTitle(text: string): string {
    return text[0].toUpperCase() + text.substring(1);
}

export default async function validateEntity(Entity): Promise<ParsedValidationError> {
    const err = await validate(Entity)
    const isSuccessful = (err.length === 0)

    return {
        isSuccessful,
        ...!isSuccessful && {
            error: {
                [err[0].property]: toTitle(Object.values(err[0].constraints!)[0])
            }
        }
    }
}