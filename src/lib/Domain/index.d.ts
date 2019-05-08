import { Task } from '../Task';

export type DomainTasks = {
  [name: string]: Task<any, any>
}
