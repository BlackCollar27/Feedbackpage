import { Check } from 'lucide-react';

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({ id, checked, onChange, label, className = '' }: CheckboxProps) {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <label
          htmlFor={id}
          className="relative flex items-center justify-center w-5 h-5 bg-white border-2 border-gray-300 rounded-md cursor-pointer transition-all peer-checked:bg-black peer-checked:border-black peer-focus:ring-2 peer-focus:ring-black/20 hover:border-gray-400 peer-checked:hover:border-gray-800"
        >
          {checked && (
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          )}
        </label>
      </div>
      {label && (
        <label htmlFor={id} className="ml-3 text-sm text-gray-700 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
}
