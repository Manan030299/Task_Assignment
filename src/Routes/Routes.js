import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashBoard } from '../components/dashboard/DashBoard';
import { KanbanBoard } from '../components/dashboard/KanbanBoard';
import { ProfileSetting } from '../components/dashboard/ProfileSetting';
import { SignIn } from '../components/login/SignIn';
import { SignUp } from '../components/login/SignUp';

export const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/dashboard' element={<DashBoard />} />
                    <Route path='/profile-setting' element={<ProfileSetting />} />
                    <Route path='/kanban-board' element={<KanbanBoard />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
