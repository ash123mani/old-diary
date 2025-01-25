interface SeparatorProps {
  type: 'horizontal' | 'vertical'
}

export function Separator({ type }: SeparatorProps) {
  if (type == 'horizontal') {
    return  <div style={{ height: '1px', background: "var(--border)" }} ></div>
  }

  return  <div style={{ width: '1px', background: "var(--border)" }} ></div>
}