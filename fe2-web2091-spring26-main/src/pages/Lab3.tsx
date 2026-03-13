import { Form, Input, Button } from "antd";

const Lab3= () => {
    // Bài 1
    const onFinish = (values: any) => {
        console.log("Form data:", values);
    };
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

    return (
        <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
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
                rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                    { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" }
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Lab3;