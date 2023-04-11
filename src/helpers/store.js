import create from 'zustand'
import shallow from 'zustand/shallow'

const useStoreImpl = create(() => {
  return {
    router: null,
    dom: null,
  }
})

const useStore = (sel) => useStoreImpl(sel, shallow)
Object.assign(useStore, useStoreImpl)

const { getState, setState } = useStoreImpl

export { getState, setState }
export default useStore



/**
 * Other stores for pages data.
 */

const useMeshRefStore = create((set) => ({
  meshRef: {},
  setMeshRef: (meshRef) =>
    set(() => ({ meshRef: meshRef })),
})
)

export {
  useMeshRefStore
}

const useProjectStore = create((set) => ({
  newSequence: [],
  setSequence: (element) =>
    set((state) => ({ newSequence: [...state.newSequence, element] })),
  projectPool: [],
  setProjectPool: (elements) =>
    set((state) => ({ projectPool: [...state.projectPool, ...elements] })),
  requestPage: 1,
  setRequestPage: () =>
    set((state) => ({ requestPage: state.requestPage + 1 })),


})
)

export {
  useProjectStore
}