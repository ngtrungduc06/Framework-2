import { Table, Button, Image } from "antd";


const studentColumns = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Avatart",
        dataIndex: "avatar",
        render: (avatar: string) => <Image width={50} src={avatar} />,
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Age",
        dataIndex: "age",
    },
    {
        title: "Major",
        dataIndex: "major",
    },
];

const studentData = [
    { key: 1, id: 1, name: "Nam", age: 20, major: "IT", avatar: "https://i.pravatar.cc/50?img=1" },
    { key: 2, id: 2, name: "Linh", age: 21, major: "Business", avatar: "https://i.pravatar.cc/50?img=2" },
    { key: 3, id: 3, name: "Hà", age: 19, major: "Design", avatar: "https://i.pravatar.cc/50?img=3" },
    { key: 4, id: 4, name: "Hùng", age: 22, major: "IT", avatar: "https://i.pravatar.cc/50?img=4" },
];



const productColumns = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Product Name",
        dataIndex: "name",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Category",
        dataIndex: "category",
    },
];

const productData = [
    { key: 1, id: 1, name: "Laptop", price: "$1200", category: "Electronics" },
    { key: 2, id: 2, name: "Phone", price: "$800", category: "Electronics" },
    { key: 3, id: 3, name: "Headphone", price: "$150", category: "Accessories" },
    { key: 4, id: 4, name: "Keyboard", price: "$70", category: "Accessories" },
    { key: 5, id: 5, name: "Mouse", price: "$50", category: "Accessories" },
];


const userColumns = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (status: string) => (
            <span style={{ color: status === "active" ? "green" : "red" }}>
                {status}
            </span>
        ),
    },
    {
        title: "Action",
        render: () => (
            <>
                <Button type="primary" style={{ marginRight: 8 }}>
                    Edit
                </Button>
                <Button danger>Delete</Button>
            </>
        ),
    },
];

const userData = [
    {
        key: 1,
        id: 1,
        name: "Nguyen Van A",
        email: "a@gmail.com",
        status: "active",
    },
    {
        key: 2,
        id: 2,
        name: "Tran Thi B",
        email: "b@gmail.com",
        status: "inactive",
    },
    {
        key: 3,
        id: 3,
        name: "Le Van C",
        email: "c@gmail.com",
        status: "active",
    },
];


export default function LabTable() {
    return (
        <div style={{ padding: 40 }}>
            <h1>Danh Sách</h1>

            <h2>1. Danh sách sinh viên</h2>
            <Table columns={studentColumns} dataSource={studentData} />

            <h2 style={{ marginTop: 50 }}>2. Danh sách sản phẩm</h2>
            <Table
                columns={productColumns}
                dataSource={productData}
                pagination={{ pageSize: 3 }}
            />

            <h2 style={{ marginTop: 50 }}>3. User Management</h2>
            <Table columns={userColumns} dataSource={userData} />
        </div>
    );
}