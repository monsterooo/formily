import { isVue2, h as _h } from 'vue-demi'
import ReactiveField from './ReactiveField'
import { getRawComponent } from '../utils/getRawComponent'

import type { IFieldProps, DefineComponent } from '../types'
import { getFieldProps } from '../utils/getFieldProps'

let Field: DefineComponent<IFieldProps>

/* istanbul ignore else */
if (isVue2) {
  Field = {
    functional: true,
    name: 'Field',
    props: getFieldProps(),
    render(h, context) {
      const props = context.props as IFieldProps
      const componentData = {
        ...context.data,
        props: {
          fieldType: 'Field',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        },
      }
      return _h(ReactiveField, componentData, context.children)
    },
  } as unknown as DefineComponent<IFieldProps>
} else {
  Field = {
    name: 'Field',
    props: getFieldProps(),
    setup(props: IFieldProps, context) {
      return () => {
        const componentData = {
          fieldType: 'Field',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        } as any
        const slots = context.slots as any
        return _h(ReactiveField, componentData, slots)
      }
    },
  } as unknown as DefineComponent<IFieldProps>
}

export default Field
