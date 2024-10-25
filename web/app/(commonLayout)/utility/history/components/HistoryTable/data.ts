import type { UtilityHistoryKey } from '@/types/utility'

export type Column = {
  key: UtilityHistoryKey
  label: string
}

const columns: Column[] = [
  {
    key: 'label',
    label: 'Label',
  },
  {
    key: 'title',
    label: 'Job Title',
  },
  {
    key: 'createDate',
    label: 'Create Date',
  },
  {
    key: 'updateDate',
    label: 'Update Date',
  },
  {
    key: 'state',
    label: 'State',
  },
  {
    key: 'action',
    label: 'Action',
  },
]

export { columns }
