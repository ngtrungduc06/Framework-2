import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Checkbox, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

interface Story {
  title: string;
  author: string;
  image: string;
  description: string;
  categoryId?: number;
}

interface Category {
  id: number;
  title: string;
  description: string;
  active: boolean;
}

export default function Lab4() {
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/categories");
      return res.data as Category[];
    },
  });

  const storyMutation = useMutation({
    mutationFn: async (values: Story) => {
      await axios.post("http://localhost:3000/stories", values);
    },
    onError: () => {
      toast.error("Lỗi khi thêm truyện!");
    },
    onSuccess: () => {
      toast.success("Thêm truyện thành công!");
    },
  });

  const categoryMutation = useMutation({
    mutationFn: async (values: Omit<Category, "id">) => {
      await axios.post("http://localhost:3000/categories", values);
    },
    onError: () => {
      toast.error("Lỗi khi thêm danh mục!");
    },
    onSuccess: () => {
      toast.success("Thêm danh mục thành công!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onFinishStory = (values: Story) => {
    storyMutation.mutate(values);
  };

  const onFinishCategory = (values: Omit<Category, "id">) => {
    categoryMutation.mutate(values);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lab 4: Thêm truyện tranh và danh mục</h2>

      <div style={{ display: "flex", gap: 50 }}>
        <div>
          <h3>Thêm truyện tranh</h3>
          <Form layout="vertical" onFinish={onFinishStory} style={{ maxWidth: 400 }}>
            <Form.Item
              label="Tên truyện"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tên truyện" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Tác giả" name="author">
              <Input />
            </Form.Item>
            <Form.Item label="Image URL" name="image">
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Danh mục" name="categoryId">
              <Select
                placeholder="Chọn danh mục"
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.title,
                }))}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={storyMutation.isPending}>
              Thêm truyện
            </Button>
          </Form>
        </div>
        <div>
          <h3>Thêm danh mục truyện</h3>
          <Form layout="vertical" onFinish={onFinishCategory} style={{ maxWidth: 400 }}>
            <Form.Item
              label="Tên danh mục"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>Active</Checkbox>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={categoryMutation.isPending}>
              Thêm danh mục
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}