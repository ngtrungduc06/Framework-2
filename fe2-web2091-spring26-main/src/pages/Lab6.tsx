import { Form, Input, Button, Spin, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface StoryFormValues {
    title: string;
    author: string;
    description?: string;
    image?: string;
}

const EditStory = () => {
    const [form] = Form.useForm<StoryFormValues>();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const storyId = Number(id ?? 1);
    const invalidId = Number.isNaN(storyId);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["story", storyId],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/stories/${storyId}`);
            return res.data;
        },
        retry: false,
        enabled: !invalidId,
    });

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form]);

    const mutation = useMutation({
        mutationFn: async (values: StoryFormValues) => {
            return axios.put(`http://localhost:3000/stories/${storyId}`, values);
        },
        onSuccess: () => {
            message.success("Cập nhật thành công");
            queryClient.invalidateQueries({ queryKey: ["stories"] });
            queryClient.invalidateQueries({ queryKey: ["story", storyId] });
            navigate("/lab5");
        },
        onError: () => {
            message.error("Cập nhật thất bại, thử lại sau");
        },
    });

    const onFinish = (values: StoryFormValues) => {
        mutation.mutate(values);
    };

    if (invalidId) {
        return <div>ID truyện không hợp lệ</div>;
    }

    if (isError) {
        return <div>Không thể tải dữ liệu truyện với ID: {storyId}</div>;
    }

    if (isLoading) return <Spin tip="Đang lấy dữ liệu..." />;

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            disabled={isLoading || mutation.isPending}
        >
            <Form.Item
                name="title"
                label="Tên truyện"
                rules={[{ required: true, message: "Nhập tên truyện" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="author"
                label="Tác giả"
                rules={[{ required: true, message: "Nhập tác giả" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="image" label="Ảnh">
                <Input />
            </Form.Item>

            <Form.Item name="description" label="Mô tả">
                <Input.TextArea />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={mutation.isPending}
                    style={{ marginRight: 8 }}
                >
                    Cập nhật
                </Button>

                <Button
                    type="default"
                    onClick={() => navigate("/lab5")}
                    disabled={mutation.isPending}
                >
                    Quay lại
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditStory;