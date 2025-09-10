import { createContext, useState, type ReactNode } from "react";

interface FormData {
    name: string;
    email: string;
    feedback: string;
}

interface FormContextType {
    formData: FormData;
    setFormData: (data: Partial<FormData>) => void;

}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {


    const [formData, setformDataState] = useState<FormData>({
        name: "",
        email: "",
        feedback: ""
    });

    const setFormData = (data: Partial<FormData>) => {
        setformDataState(prev => ({ ...prev, ...data }));
    }

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    )

}