import { ModalProvider } from 'react-modal-hook'

import { colors } from '../theme/colorNames'

import '../src/styles/global.css'

export const decorators = [
  (Story) => (
    <ModalProvider>
      <Story />
    </ModalProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: '#fff' },
      { name: 'light', value: colors.neutral2 },
      { name: 'dark', value: '#1a1d1e' },
    ],
  },
  docs: {
    source: {
      type: 'code',
    },
  },
  layout: 'centered',
}
