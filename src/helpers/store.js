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

const useProjectStore = create((set) => ({
  rawProjects: [],
  filteredProjects: [
    {
      id: 1,
      title: '',
      location: '',
      type: '',
      year: '',
      no: '',

    }
  ],
  setFilterdProjects: (filteredProjects) =>
    set((state) => ({ filteredProjects: filteredProjects }))
})
)

const useProjectSingleStore = create((set) => ({
  filteredProjectContent: {
    id: 1,
    title: '',
    location: '',
    type: '',
    year: '',
    no: '',
  }
  ,
  setFilterdProjects: (filteredProjectContent) =>
    set((state) => ({ filteredProjectContent: filteredProjectContent }))
})
)


const useObjectScroll = create((set) => ({
  objectPos: 1,
  setObjectPos: (objectPos) =>
    set(() => ({ objectPos: objectPos })),
})
)

export {
  useProjectStore,
  useProjectSingleStore,
  useObjectScroll
}