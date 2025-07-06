import { forwardRef } from "react";

export interface AuthInputField {
  label: string;
  type: string;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// React Hook From으로 넘겨주기 위해선 forwardRef가 꼭 필요
export const AuthInputField = forwardRef<HTMLInputElement, AuthInputField>(
  ({ label, name, type, value, onChange, onBlur }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input
          name={name}
          ref={ref}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className="border"
        />
      </div>
    );
  }
);

// React는 forwardRef()로 감싸진 컴포넌트의 정보를 잃음, 그렇기에 displayName으로 명확하게 지정해줌
AuthInputField.displayName = "AuthInputField";
