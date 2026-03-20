import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image, Input, Popconfirm, Space, Table, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const fetchStories = async () => {
    const res = await axios.get("http://localhost:3000/stories");
    return res.data.map((item: any) => ({
        ...item,
        createdAt: item.createdAt ?? new Date().toISOString(),
    }));
};

const fetchCategories = async () => {
    const res = await axios.get("http://localhost:3000/categories");
    return res.data;
};

const deleteStory = async (id: number) => {
    await axios.delete(`http://localhost:3000/stories/${id}`);
    return id;
};

export default function StoryList() {
    const [keyword, setKeyword] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["getAllStories"],
        queryFn: fetchStories,
    });

    const { data: categories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const categoryMap = useMemo(() => {
        return (categories ?? []).reduce((acc: any, item: any) => {
            acc[item.id] = item.title;
            return acc;
        }, {} as Record<number, string>);
    }, [categories]);

    const deleteMutation = useMutation({
        mutationFn: deleteStory,
        onSuccess: () => {
            message.success("Xóa truyện thành công");
            queryClient.invalidateQueries({ queryKey: ["getAllStories"] });
        },
        onError: () => {
            message.error("Xóa truyện thất bại");
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    const filteredData = useMemo(
        () =>
            data?.filter((item: any) =>
                item.title.toLowerCase().includes(keyword.toLowerCase()),
            ) ?? [],
        [data, keyword],
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Tên truyện",
            dataIndex: "title",
        },
        {
            title: "Tác giả",
            dataIndex: "author",
        },
        {
            title: "Thể loại",
            dataIndex: "categoryId",
            render: (id: number) => categoryMap[id] ?? "-",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            render: (src: string) => <Image src={src} height={100} />,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (date: string) => {
                if (!date) {
                    return "-";
                }
                const parsed = new Date(date);
                if (Number.isNaN(parsed.getTime())) {
                    return "-";
                }
                return parsed.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <Space>
                    <Button type="link" onClick={() => navigate(`/lab6/${record.id}`)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <a>Xóa</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    if (isError) {
        return <div>Có lỗi xảy ra khi tải dữ liệu</div>;
    }

    if (isCategoriesLoading) {
        return <div>Đang tải danh mục...</div>;
    }

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input.Search
                placeholder="Tìm kiếm theo tên truyện"
                allowClear
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ maxWidth: 400 }}
            />
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                loading={isLoading || deleteMutation.status === "pending"}
                pagination={{ pageSize: 5 }}
            />
        </Space>
    );
}