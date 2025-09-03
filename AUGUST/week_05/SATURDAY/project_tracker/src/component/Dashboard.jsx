import {
    addProject, deleteProject, editProject, fetchProjects, addTask,
    editTask,
    deleteTask,
} from '../redux/projectSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import {
    Avatar, AvatarGroup, Progress, Box,
    Flex,
    Input,
    Button,
    VStack,
    HStack,
    Text,
    Spinner,
    useDisclosure,
    Select,
    Checkbox,
} from "@chakra-ui/react"


const Dashboard = () => {


    const dispatch = useDispatch();
    const { items: projects, loading, error } = useSelector((state) => state.projects)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskPriority, setTaskPriority] = useState("low");
    const [selectedProject, setSelectedProject] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleAddProject = () => {
        if (!title || !description) return alert("please fill all fields");
        dispatch(addProject({ title, description }));
        setTitle("")
        setDescription("")
    }

    useEffect(() => {
        dispatch(fetchProjects());
    }, [])

    const handleDelete = (id) => {
        dispatch(deleteProject(id));

    };

    const handleUpdate = (id) => {
        const newTitle = prompt("Enter new title");
        if (newTitle) {
            dispatch(editProject({ id, updates: { title: newTitle } }));
        }
    };

    const today = new Date().toISOString().split("T")[0]; // "2025-09-03"

    const todaysProjects = Object.entries(projects)
        .filter(([id, project]) => project.createdAt.split("T")[0] === today)
        .map(([id, project]) => ({ id, ...project }));

    const bgcolor = ["#cae0f8", "#ffd6ca", "#d4edda"]



    // tasks
    const handleOpenTasks = (projectId) => {
        setSelectedProject(projectId);
        onOpen();
    };
    const handleAddTask = () => {
        if (!taskTitle) return alert("Enter task title");
        dispatch(
            addTask({
                projectId: selectedProject,
                task: { title: taskTitle, priority: taskPriority },
            })
        );
        setTaskTitle("");
        setTaskPriority("low");
    };
    // Toggle Task Completed
    const handleToggleTask = (projectId, taskId, completed) => {
        dispatch(editTask({ projectId, taskId, updates: { completed } }));
    };

    // Delete Task
    const handleDeleteTask = (projectId, taskId) => {
        dispatch(deleteTask({ projectId, taskId }));
    };




    return (
        <>
            <Box>


                <NavBar />



                <Box mt="50px" ml={[0, 10]} m={[2, 2, 5]} bg="white" py={10} rounded="3xl">

                    <Text position="relative" bottom={7} ml={10} fontSize="2xl" fontWeight="bold">Today Task</Text>
                    <HStack
                        spacing={6}
                        display={["grid", "flex", "flex"]}

                        justifyContent="space-around"

                    >


                        {Object.entries(projects)
                            .filter(([id, project]) => project.createdAt.split("T")[0] === new Date().toISOString().split("T")[0])
                            .map(([id, project], index) => (
                                <Box
                                    key={id}
                                    bg={bgcolor[index % bgcolor.length]}
                                    height="97%"
                                    rounded="3xl"
                                    width="220px"
                                    py={3}
                                    m={2}
                                >
                                    <Text px={1} bg="gray.100" rounded="50px" width="100px" mt={3} ml={3}>
                                        High Priority
                                    </Text>

                                    {/* Project Title */}
                                    <Text ml={3} whiteSpace="normal" fontSize="xl" fontWeight="bold">
                                        {project.title}
                                    </Text>

                                    {/* Truncated Description (10 words) */}
                                    <Text ml={3}>
                                        {project.description.split(" ").length > 10
                                            ? project.description.split(" ").slice(0, 10).join(" ") + "..."
                                            : project.description}
                                    </Text>

                                    {/* Example Progress */}
                                    <Progress.Root ml={3} mt={5} value={44} maxW="sm">
                                        <HStack gap="4">
                                            <Progress.Track flex="1" rounded="xl" color="gray.200">
                                                <Progress.Range />
                                            </Progress.Track>
                                            <Progress.ValueText mr={3}>44%</Progress.ValueText>
                                        </HStack>
                                    </Progress.Root>
                                </Box>
                            ))}




                    </HStack>



                </Box>

                <Box w={["95%", "80%", "60%"]} mx="auto" p={4} bg="gray.50" borderRadius="xl" boxShadow="sm">
                    {/* Add New Project Form */}
                    <VStack spacing={4} align="stretch" mb={6}>
                        <HStack spacing={3}>
                            <Input
                                placeholder="Project Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                bg="white"
                                borderRadius="md"
                            />
                            <Input
                                placeholder="Project Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                bg="white"
                                borderRadius="md"
                            />
                            <Button colorScheme="purple" onClick={handleAddProject}>
                                Add Project
                            </Button>
                        </HStack>
                    </VStack>

                    {/* Loading / Error */}
                    {loading && (
                        <Flex justify="center" mb={4}>
                            <Spinner />
                        </Flex>
                    )}
                    {error && (
                        <Text color="red.500" mb={4}>
                            {error}
                        </Text>
                    )}

                    {/* Project List */}
                    <VStack spacing={4} align="stretch">
                        {projects &&
                            Object.entries(projects).map(([id, project]) => (
                                <Box
                                    key={id}
                                    p={4}
                                    bg="white"
                                    borderRadius="md"
                                    boxShadow="sm"
                                >
                                    <Text fontWeight="bold">{project.title}</Text>
                                    <Text mb={2}>{project.description}</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        Created At: {new Date(project.createdAt).toLocaleString()}
                                    </Text>

                                    <HStack mt={2} spacing={2}>
                                        <Button size="sm" colorScheme="blue" onClick={() => handleUpdate(id)}>
                                            Edit
                                        </Button>
                                        <Button size="sm" colorScheme="red" onClick={() => handleDelete(id)}>
                                            Delete
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setSelectedProject(id)}
                                        >
                                            View Tasks
                                        </Button>
                                    </HStack>


                                    {selectedProject === id && (
                                        <VStack spacing={3} mt={4} align="stretch">
                                            {/* Add Task */}
                                            <HStack>
                                                <Input
                                                    placeholder="Task Title"
                                                    value={taskTitle}
                                                    onChange={(e) => setTaskTitle(e.target.value)}
                                                    bg="white"
                                                    borderRadius="md"
                                                />
                                                <Select.Root
                                                    value={taskPriority}
                                                    onChange={(e) => setTaskPriority(e.target.value)}
                                                    bg="white"
                                                    borderRadius="md"
                                                     // changes background on hover
                                                    _focus={{ borderColor: "purple.500" }}
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </Select.Root>
                                                <Button colorScheme="green" onClick={handleAddTask}>
                                                    Add Task
                                                </Button>
                                            </HStack>

                                            {/* Task List */}
                                            {project.tasks &&
                                                Object.entries(project.tasks).map(([taskId, task]) => (
                                                    <HStack key={taskId} justify="space-between" p={2} bg="gray.50" borderRadius="md">
                                                        <Checkbox.Root
                                                        color="purple.500"
                                                            checked={task.completed}
                                                            onChange={(e) => handleToggleTask(id, taskId, e.target.checked)}
                                                        >
                                                            {task.title} ({task.priority})
                                                        </Checkbox.Root>
                                                        <Button size="xs" bg="#271e4d" onClick={() => handleDeleteTask(id, taskId)}>
                                                            Delete
                                                        </Button>
                                                    </HStack>
                                                ))}
                                        </VStack>
                                    )}


                                </Box>
                            ))}
                    </VStack>
                </Box>



            </Box>
        </>
    );
}

export default Dashboard;
