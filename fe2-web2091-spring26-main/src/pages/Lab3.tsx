import { Form, Input, Button, InputNumber, Tabs, Card } from "antd";
import { useState } from "react";

const PracticeForm = () => {
    const [post, setPost] = useState<any>(null);

    const onLogin = (values: any) => {
        console.log("Bài 1:", values);
    };

    const onRegister = (values: any) => {
        console.log("Bài 2:", values);
    };

    const onProduct = (values: any) => {
        console.log("Bài 3:", values);
    };

    const onPost = (values: any) => {
        setPost(values);
    };

    const items = [
        {
            key: "1",
            label: "Bài 1",
            children: (
                <Form layout="vertical" onFinish={onLogin} style={{ maxWidth: 400 }}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Nhập password" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form>
            ),
        },

        {
            key: "2",
            label: "Bài 2",
            children: (
                <Form layout="vertical" onFinish={onRegister} style={{ maxWidth: 500 }}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Nhập tên" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Nhập email" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: "Nhập phone" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Nhập password" },
                            { min: 6, message: "Tối thiểu 6 ký tự" },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form>
            ),
        },

        {
            key: "3",
            label: "Bài 3",
            children: (
                <Form layout="vertical" onFinish={onProduct} style={{ maxWidth: 500 }}>
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: "Nhập giá" }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: "Nhập số lượng" }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Thêm sản phẩm
                    </Button>
                </Form>
            ),
        },

        {
            key: "4",
            label: "Bài 4",
            children: (
                <>
                    <Form layout="vertical" onFinish={onPost} style={{ maxWidth: 500 }}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: "Nhập title" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Slug" name="slug">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Content" name="content">
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item label="Image URL" name="image">
                            <Input />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" block>
                            Thêm bài viết
                        </Button>
                    </Form>

                    {post && (
                        <Card title="Bài viết vừa thêm" style={{ marginTop: 20 }}>
                            <p><b>Title:</b> {post.title}</p>
                            <p><b>Slug:</b> {post.slug}</p>
                            <p><b>Content:</b> {post.content}</p>
                            <p><b>Image:</b> {post.image}</p>
                        </Card>
                    )}
                </>
            ),
        },
    ];

    return <Tabs defaultActiveKey="1" items={items} />;
};

export default PracticeForm;