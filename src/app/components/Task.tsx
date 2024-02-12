"use client";

import { FormEventHandler, useState } from "react";
import { ITask } from "../../../types/tasks";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editTodo, deleteTodo } from '../../../api';

interface TaskProps{
    task : ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router= useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const handleSubmitEditTodo : FormEventHandler <HTMLFormElement> = async (e) => 
  {
    e.preventDefault();
      await editTodo({
      id : task.id,// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      text: taskToEdit,
    });
    
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async  (id:string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  }

  return (
    <tr key = {task.id} >
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          <FiEdit 
            onClick={() => setOpenModalEdit(true)} 
            cursor='pointer'  
            className="text-blue-500" size={17} />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">
              Edit task
            </h3>
            <div className ="modal-action">
            <input 
              value = {taskToEdit}
              onChange ={e => setTaskToEdit(e.target.value)}
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full" 
            />
            <button type ="submit" className="btn">
              Submit
            </button>
            </div>
          </form>
        </Modal>
        <FiTrash2 
          onClick ={() => setOpenModalDelete(true)} 
          cursor='pointer' 
          className="text-red-500" size={17}/>
        
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className ="btn"
            > Yes 
            </button>
          </div> 
        </Modal>
        </td>
    </tr>
  );
}

export default Task;