"use client";

import React, {
    useEffect, useState, useImperativeHandle,
    forwardRef
} from "react";

import { SignUpQuestion } from '@/app/models/signupQuestion';

function InterestFormRendered(props: any, ref: any) {
    const [stepFormData, setStepFormData] = useState(
        props.formSteps[props.formIndex],
    );

    useEffect(() => {
        setStepFormData(props.formSteps[props.formIndex])
        checkFormDataFilled(props.formSteps[props.formIndex].questions);
    }, [props])

    useImperativeHandle(ref, () => ({
        getStepFormData: () => {
            return stepFormData;
        },
    }));

    const checkFormDataFilled = (formFields: SignUpQuestion[]) => {
        var isFormDatafilled = true;
        for (let i = 0; i < formFields.length; i++) {
            if (
                formFields[i].hasOwnProperty('value')
            ) {
                if (
                    formFields[i].value === '' ||
                    formFields[i].value === null || formFields[i].value.length === 0
                ) {
                    if (formFields[i]?.required) {
                        isFormDatafilled = false;
                    }
                }
            } else {
                if (formFields[i]?.required) {
                    isFormDatafilled = false;
                }
            }
        }
        props.formDataValidate(!isFormDatafilled);
    };

    const formatValue = (value: string) => {
        let space_underscore = value.split(' ').join('_')
        return space_underscore.charAt(0).toLowerCase() + space_underscore.slice(1)
    }

    // const reverseFormatValue = (value: any) => {
    //     let space_underscore = value.split('_').join(' ') 
    //     return space_underscore.charAt(0).toUpperCase() + space_underscore.slice(1)
    // }


    const handleValuchanged = (formValue: any,
        flag: string,
        item: any,
        index: number,) => {
        const { value, checked: isChecked } = formValue.target;

        if (flag === 'INPUT_TEXT') {
            const updatedformData = stepFormData?.questions.map(
                (formData: any, key: any) => {
                    if (key === index) {
                        formData.value = value
                    }
                    return formData;
                },
            );

            setStepFormData((prevState: any) => ({
                ...prevState,
                questions: updatedformData,
            }));
            checkFormDataFilled(updatedformData)
        }
        else if (flag === "INPUT_CHECKBOX") {
            const updatedformData = stepFormData?.questions.map(
                (formData: any, key: any) => {
                    if (key === index) {
                        if (formData.value && formData.value.length > 0) {
                            let exists = formData.value.includes(
                                item.slug === "motivations" ? formatValue(value) : value,
                            );
                            if (exists) {
                                const index = formData.value.indexOf(item.slug === "motivations" ? formatValue(value) : value);
                                if (index > -1) {
                                    formData.value.splice(index, 1);
                                }
                            }
                            else {
                                if (item.slug === "motivations") {
                                    let formattedvalue = formatValue(value)
                                    formData.value.push(formattedvalue)
                                }
                                else {
                                    formData.value.push(value)
                                }
                            }
                        }
                        else {
                            let answer = [];
                            if (item.slug === "motivations") {
                                let formattedvalue = formatValue(value)
                                answer.push(formattedvalue)
                            }
                            else {
                                answer.push(value)
                            }

                            formData.value = answer;
                        }
                    }
                    return formData;
                },
            );

            setStepFormData((prevState: any) => ({
                ...prevState,
                questions: updatedformData,
            }));

            checkFormDataFilled(updatedformData)
        }

    }

    const renderFormField = (question: any, index: number) => {
        if (question && question.inputType === "INPUT_TEXT") {
            return (
                <div key={index} className="mt-2 flex justify-start items-center">
                    <input
                        type="text"
                        className={`w-[16.875rem] h-9 p-2 rounded-md text-sm text-black placeholder:font-light placeholder:text-[#AFAFAF] ${question.value ? 'border-[1px] border-[#333E48]' : ""}`}
                        name={question.slug}
                        id={question.slug}
                        value={question.value}
                        placeholder={question.placeholder}
                        onChange={(e: any) =>
                            handleValuchanged(
                                e,
                                question.inputType,
                                question,
                                index,
                            )
                        }
                    />
                </div>
            )

        }
        else if (question && question.inputType === "INPUT_CHECKBOX") {
            let optionValues = question.options
            return (
                <div key={index} className="flex-col justify-between items-center mt-4">
                    {optionValues &&
                        optionValues.map((option: any, i: any) => {
                            return (
                                <div key={i} className="flex items-start justify-start mb-3">
                                    <div>
                                        <input
                                            id="default-checkbox"
                                            name="checkbox"
                                            type="checkbox"
                                            value={option.title}
                                            checked={question.value.includes(question.slug === "motivations" ? formatValue(option.title) : option.title) ? true : false}
                                            onChange={(e: any) =>
                                                handleValuchanged(
                                                    e,
                                                    question.inputType,
                                                    question,
                                                    index,
                                                )
                                            }
                                        />
                                    </div>
                                    <label
                                        className="ms-3 font-medium text-[0.938rem] text-left leading-6 text-custom-gray">{option.title}</label>
                                </div>
                            )

                        })}
                </div>
            )
        }
    }

    return (
        <>
            {stepFormData && stepFormData?.questions.length > 0
                ? stepFormData?.questions.map((formData: any, index: any) => {
                    return renderFormField(formData, index);
                })
                : null}

        </>
    );
}

export default forwardRef(InterestFormRendered);
