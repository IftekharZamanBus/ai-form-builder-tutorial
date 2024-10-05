import React, { ChangeEvent } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { QuestionSelectModel } from "@/types/form-types";
import { FieldOptionSelectModel } from "@/types/form-types";
import { Label } from "@/components/ui/label";

type Props = {
  element: QuestionSelectModel & {
    fieldOptions: Array<FieldOptionSelectModel>;
  };
  value: string;
  onChange: (value?: string | ChangeEvent<HTMLInputElement>) => void;
};

const FormField = ({ element, value, onChange }: Props) => {
  if (!element) return null;

  const components = {
    Input: () => <Input type="text" value={value} onChange={onChange} />,
    Switch: () => (
      <Switch
        checked={value === "true"}
        onCheckedChange={(checked: boolean) =>
          onChange(checked ? "true" : "false")
        }
      />
    ),
    Textarea: () => (
      <Textarea
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(event.target.value)
        }
      />
    ),
    Select: () => (
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>{value || "Select an option"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {element.fieldOptions.map((option) => (
            <SelectItem
              key={`${option.text} ${option.value}`}
              value={`answerId_${option.id}`}
            >
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    RadioGroup: () => {
      return (
        <RadioGroup onValueChange={onChange}>
          {element.fieldOptions.map((option) => (
            <div
              key={`${option.text} ${option.value}`}
              className="flex items-center space-x-2"
            >
              <FormControl>
                <RadioGroupItem
                  value={`answerId_${option.id}`}
                  id={option?.value?.toString() || `answerId_${option.id}`}
                />
              </FormControl>
              <Label className="text-base">{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    },
  };

  return element.fieldType && components[element.fieldType]
    ? components[element.fieldType]()
    : null;
};

export default FormField;
