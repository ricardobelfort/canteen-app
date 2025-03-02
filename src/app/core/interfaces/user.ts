export interface User {
  id: string
  name: string
  email: string
  cpf: string
  status: boolean
  roles_id: RolesId[]
}

export interface RolesId {
  id: string
  title: string
  description: string
  type?: string
  status: boolean
}
