import './seprator.css';

interface SeparatorProps {
  type: 'horizontal' | 'vertical'
}

export function Separator({ type }: SeparatorProps) {
  if (type == 'horizontal') {
    return  <div  className="horizontal-separator"></div>
  }

  return  <div className="vertical-separator"></div>
}1