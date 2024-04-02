export interface SignUpQuestion {
    id?: string,
    title: string,
    slug: string,
    inputType: string,
    options: string[],
    value: string,
    placeholder: string,
    displayCondition: boolean,
    required: boolean
  }
  