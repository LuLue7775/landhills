import { useRouter } from 'next/router'
import { useEffect } from 'react'
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

const useProjectStore = create((set) => ({
  newSequence: [],
  setSequence: (element) =>
    set((state) => ({ newSequence: [...state.newSequence, element] })),
  firstpageProjectPool: [],
  // setFirstpagefirstpageProjectPool: (elements) =>
  //   set((state) => ({ firstpageProjectPool: [...state.firstpageProjectPool, ...elements] })),
  setFirstpagefirstpageProjectPool: (elements) =>
    set((state) => ({ firstpageProjectPool: elements })),
  requestPage: 1,
  setRequestPage: () =>
    set((state) => ({ requestPage: parseInt(state.requestPage) + 1 })),
  // projectsTotalPage: 1,
  // setProjectsTotalPage: (elements) =>
  //   set((state) => ({ projectsTotalPage: parseInt(elements) })),
})
)
const useArchiveStore = create((set) => ({
  requestArchivePage: 1,
  setRequestArchivePage: () =>
    set((state) => ({ requestArchivePage: parseInt(state.requestArchivePage) + 1 })),
  archivePool: [],
  setArchivePool: (elements) => set((state) => ({ archivePool: [...state.archivePool, ...elements] })),

})
)

export {
  useMeshRefStore,
  useProjectStore,
  useArchiveStore
}

const asPathStore = create((set) => ({
  prevAsPath: undefined,
  currentAsPath: undefined,
}));

/** use as a hook to get prevAsPath and currentAsPath*/
export const useAsPath = () => {
  return asPathStore((state) => state);
};

/** use everywhere you like */
export const getAsPath = () => {
  return asPathStore.getState();
};

export const useAsPathInitializer = () => {
  const { asPath } = useRouter();
  const { currentAsPath } = useAsPath();

  useEffect(() => {
    if (currentAsPath !== asPath) {
      asPathStore.setState((state) => ({
        ...state,
        currentAsPath: asPath,
        prevAsPath: currentAsPath,
      }));
    }
  }, [asPath, currentAsPath]);
};