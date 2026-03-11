import { Table } from "antd";


const studentColumns = [
    {
        title: "ID",
        dataIndex: "id",
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
    { key: 1, id: 1, name: "Nam", age: 20, major: "IT" },
    { key: 2, id: 2, name: "Linh", age: 21, major: "Business" },
    { key: 3, id: 3, name: "Hà", age: 19, major: "Design" },
    { key: 4, id: 4, name: "Hùng", age: 22, major: "IT" },
    { key: 5, id: 5, name: "Trang", age: 20, major: "Business" },
];


export default function LabTable() {
    return (
        <div style={{ padding: 40 }}>
            <h1>Danh Sách</h1>
            <h2>1. Danh sách sinh viên</h2>
            <Table columns={studentColumns} dataSource={studentData} />
        </div>
    );
}