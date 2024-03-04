import { useCallback } from 'react'
import produce from 'immer'
import { useBoolean } from 'ahooks'
import type { StartNodeType } from './types'
import type { InputVar } from '@/app/components/workflow/types'
import { useWorkflow } from '@/app/components/workflow/hooks'
const useConfig = (id: string, payload: StartNodeType) => {
  const { handleNodeDataUpdate } = useWorkflow()
  // const [inputs, setInputs] = useState<StartNodeType>(initInputs)
  const inputs = payload
  const setInputs = (newInputs: StartNodeType) => {
    handleNodeDataUpdate({
      id,
      data: newInputs,
    })
  }

  const [isShowAddVarModal, {
    setTrue: showAddVarModal,
    setFalse: hideAddVarModal,
  }] = useBoolean(false)

  const handleVarListChange = useCallback((newList: InputVar[]) => {
    const newInputs = produce(inputs, (draft: any) => {
      draft.variables = newList
    })
    setInputs(newInputs)
  }, [inputs, setInputs])

  const handleAddVariable = useCallback((payload: InputVar) => {
    const newInputs = produce(inputs, (draft: any) => {
      draft.variables.push(payload)
    })
    setInputs(newInputs)
  }, [inputs, setInputs])
  return {
    inputs,
    isShowAddVarModal,
    showAddVarModal,
    hideAddVarModal,
    handleVarListChange,
    handleAddVariable,
  }
}

export default useConfig
