"use client"; //import React from 'react'

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import  {FormEventHandler, useState} from 'react'
import { addTodo } from '../../../api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const AddTask = () => {
    const router = useRouter();

    const [modalOpen, setModalOpen] = useState(false);
    const [newTaskValue , setNewTaskValue] = useState<string>('');

    const handleSubmitNewTodo: FormEventHandler <HTMLFormElement> = async (e) => 
    {
      e.preventDefault();
      await addTodo({
        id : uuidv4(),// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        text: newTaskValue,
      })
      console.log(newTaskValue);
      setNewTaskValue("");
      setModalOpen(false);
      router.refresh();
    };


  return (
    <div>
        <button 
            onClick={()=> setModalOpen(true)}
            className='btn btn-primary w-full'
        > 
            ADD NEW TASK <AiOutlinePlus className='ml-2'size={15}/>
        </button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">
              ADD NEW TASK
            </h3>
            <div className ="modal-action">
            <input 
              value = {newTaskValue}
              onChange ={e => setNewTaskValue(e.target.value)}
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
    </div>
  );
};

export default AddTask