import React, { useState } from 'react'
import TodoButton from './TodoButton';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [selected, setSelected] = useState("Made For");

    const options = [
        "Made For",
        "Task Management",
        "Project Management",
        "Time Management",
        "Teamwork",
    ];
    const navigateTo = useNavigate();


    return (
        <div className='bg-[#FEFDFC]'>
            <div className='flex flex-col gap-12'>
                {/* HEADER */}
                <header className='m-4 py-4 px-16 text-[#39332D]'>
                    <div className='flex justify-between'>
                        <div className='py-2'>TodoList</div>
                        <div className='flex'>
                            <div className="relative inline-block py-2 min-w-50 text-center hover:bg-[#F1ECE6] rounded group">
                                <div className="cursor-pointer hover:font-semibold flex items-center justify-center gap-2">
                                    {selected}
                                    <svg
                                        className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                                <div className="absolute left-0 top-full w-full ">
                                    <div className=' hidden mt-2 p-2 group-hover:block border border-[#39332D] rounded bg-white shadow-lg transition-all duration-200 z-20'>
                                        {options
                                            .filter((opt) => opt !== selected)
                                            .map((opt) => (
                                                <div
                                                    key={opt}
                                                    className="py-2 px-3 my-1 text-left hover:bg-gray-100 hover:font-semibold cursor-pointer"
                                                    onClick={() => setSelected(opt)}
                                                >
                                                    {opt}
                                                </div>
                                            ))}</div>
                                </div>
                            </div>

                            <div>
                                <TodoButton label='Pricing' />
                                <TodoButton label='Login' onClick={()=>navigateTo('/login')} />
                                <TodoButton className='bg-[#CF3620] text-white cursor-pointer' onClick={()=>navigateTo('/signup')} label='Start for free' />
                            </div>

                        </div>
                    </div>
                </header>
                {/* MAIN */}
                <main>
                    <div className='flex flex-col gap-12'>
                        <div className="grid grid-cols-[40%_60%] gap-12 items-center m-4 py-4 px-16">
                            <div className='flex flex-col gap-8'>
                                <h2 className='text-6xl font-semibold text-[#26221E]'>Clarity finally.</h2>
                                <h3 className='text-xl text-[#7E7D79] font-semibold'>Join a growing community of professionals who manage tasks, projects, and life with clarity and confidence.</h3>
                                <TodoButton className='bg-[#CF3620] text-white w-40 mx-0! px-0! shadow-[0_8px_15px_rgba(207,54,32,0.4)]' label='Start for free' />
                            </div>
                            <div>
                                <img loading='lazy' src="/assets/todo_img.avif" alt="Todo App" className="w-full" />
                            </div>

                        </div>
                        <div>
                            <div className='grid grid-cols-[40%_60%] gap-12 items-center m-4 py-4 px-16'>
                                <div className='flex flex-col gap-6'>
                                    <h3 className='text-[#CF3620] font-semibold text-3xl'>In it for the long haul</h3>
                                    <h4 className='text-4xl font-medium text-[#26221E]'>A task manager you can trust for life.</h4>
                                    <h5 className='text-xl text-[#7E7D79] font-medium '>We’re committed to building the best to-do app — without ever compromising our values.</h5>

                                </div>
                                <div className='grid grid-cols-[20%_20%_20%_20%] p-6 items-center justify-center'>
                                    <div>
                                        <img loading='lazy' src="/assets/appTodo.avif" alt="1k+ downloads" className="w-full h-40" />
                                        <h3>1k+ downloads</h3>
                                    </div>
                                    <div>
                                        <img loading='lazy' src="/assets/todouser.avif" alt="Pro Users" className="w-full h-40" />
                                        <h3>Pro Users</h3>
                                    </div>
                                    <div>
                                        <img loading='lazy' src="/assets/countriesTodo.avif" alt="Few Countries" className="w-full h-40" />
                                        <h3>Few Countries</h3>
                                    </div>
                                    <div>
                                        <img loading='lazy' src="/assets/ProTodo.avif" alt="3k+ task completed" className="w-full h-40" />
                                        <h3>3k+ task completed</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* FOOTER */}
                <footer className='bg-[#FFF7F0]'>
                    <div className='flex flex-col gap-12 '>

                        <div className='m-4 py-4 px-16 '>
                            <hr className='border-[#D8D1CA] ' />
                            <div className='flex mt-8'>
                                <div className="grid grid-cols-[35%_65%] gap-16 w-full p-6 ">
                                    <div className="flex flex-col gap-8 text-[#26221E] max-w-lg">
                                        <p className="text-2xl font-bold">Todolist</p>
                                        <p className="text-base">
                                            Join millions of people who organize work and life with Todoist.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8 ">
                                        <div className="p-4 text-center flex flex-col gap-4">
                                            <h5 className='p-2 text-semibold text-lg hover:bg-[#F1ECE6] rounded'>Features</h5>
                                            <p>How it Works</p>
                                            <p>For Teams</p>
                                            <p>Pricing</p>
                                            <p>Compare</p>
                                            <p>Templates</p>
                                        </div>
                                        <div className="p-4 text-center flex flex-col gap-4">
                                            <h5 className='p-2 text-semibold text-lg hover:bg-[#F1ECE6] rounded'>Resources</h5>
                                            <p>Download Apps</p>
                                            <p>Help Center</p>
                                            <p>Customer Stories</p>
                                            <p>Integrations</p>
                                            <p>Status</p>
                                        </div>
                                        <div className="p-4 text-center flex flex-col gap-4">
                                            <h5 className='p-2 text-semibold text-lg hover:bg-[#F1ECE6] rounded'>Company</h5>
                                            <p>About us</p>
                                            <p>Careers</p>
                                            <p>Press</p>
                                            <p>Twist</p>
                                            <p>Hub</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Home
