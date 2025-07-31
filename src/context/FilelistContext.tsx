import { createContext } from "react"

export const FilelistContext = createContext({
  files: [],
  setFiles: () => {}
})

export default FilelistContext
