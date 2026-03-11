import { useState } from "react";
import { Form, Input, Button, Table, Modal } from "antd";

function UserPage() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([
        { key: 1, name: "Duc", email: "duc@gmail.com", role: "Admin" },
        { key: 2, name: "Hung", email: "hung@gmail.com", role: "User" },
        { key: 3, name: "Cong", email: "cong@gmail.com", role: "User" }
    ]);
    const [form] = Form.useForm();
    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        { title: "Role", dataIndex: "role" }
    ];
    const onFinish = (values: any) => {
        console.log("Register:", values);
    };
    const onAddUser = (values: any) => {
        const newUser = {
            key: Date.now(),
            name: values.name,
            email: values.email,
            role: "User"
        };
        setData([...data, newUser]);
        form.resetFields();
        setOpen(false);
    };
    return (
        <div style={{ padding: 20 }}>

            <h2>Register Form</h2>

            <Form
                onFinish={onFinish}
                layout="vertical"
                style={{ maxWidth: 400 }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please enter email" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter password" }]}
                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
            <br />
            <Button type="primary" onClick={() => setOpen(true)}>
                Add User
            </Button>
            <Modal
                title="Add User"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={onAddUser}
                    layout="vertical"
                >

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter email" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
            <br /><br />
            <h2>User Table</h2>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />

        </div>
    );
}
export default UserPage;