import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DashBoard } from '../components/dashboard/Dashboard';
import { KanbanBoard } from '../components/dashboard/Kanbanboard';
import { ProfileSetting } from '../components/dashboard/ProfileSetting';
import { SignIn } from '../components/login/SignIn';
import { SignUp } from '../components/login/SignUp';
import { PrivateRoutes } from './PrivateRoutes';

export const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index path='/login' element={<SignIn />} />
                    <Route path='/' element={<Navigate to= '/login' />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path='/dashboard' element={<DashBoard />} />
                        <Route path='/profile-setting' element={<ProfileSetting />} />
                        <Route path='/kanban-board' element={<KanbanBoard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
