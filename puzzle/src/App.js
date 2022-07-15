import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Flow from './pages/Flow';
import Drag from './pages/Drag';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Blank />} />
                    <Route path='/config' element={<Blank />} />
                    <Route path='/pay' element={<Flow />} />
                    <Route path='/confirm' element={<Drag />} />
                    <Route path='/batch_notify' element={<Blank />} />
                    <Route path='/query' element={<Blank />} />
                    <Route path='/refund' element={<Blank />} />
                    <Route path='/refund_notify' element={<Blank />} />
                    <Route path='/bill' element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
