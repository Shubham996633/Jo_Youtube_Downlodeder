import React, { useState } from "react";
import { Typography, Form, Input, Button, Row, Col } from "antd";
import {
    PlayCircleOutlined,
    DownloadOutlined,
    AudioMutedOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import image from '../../Image/R.png'
const { Title } = Typography;

function App() {
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    console.log(data)
    async function submitForm(values) {
        setLoading(true);
        const data = await Axios.get(
            `http://localhost:4000/download?url=${values.url}`
        );
        setData(data);
        setLoading(false);
    }

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <div className="flex flex-row ">

                    <img className="mt-4 ml-3" src={image} />
                    <span className="text-3xl font-bold text-red-700 mt-9 ml-3">JoYoutube Downloader</span>
                </div>
                <div className="font-bold text-4xl mt-3 mb-6">

                    Download Video and Audio from YouTube
                </div>


                <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>

                    <Form form={form} name="dynamic_rule" onFinish={submitForm}>
                        <Form.Item {...formItemLayout} name="url" label=" " colon={false}>
                            <Input className=" mt-3 mb-3  placeholder:text-slate-400 block bg-white w-full  border-4 border-pink-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-pink-500 focus:ring-pink-500 focus:ring-1 text-xl1"
                                size="large"

                                placeholder="Paste your video link here"
                                required={true}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button className="bg-rose-600 font-bold text-3xl w-600 h-12 mb-3  "
                                type="primary"
                                htmlType="submit"
                                icon={<DownloadOutlined />}

                                loading={loading}
                            // onClick={() =>setLoading(true)}
                            >
                                Download
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="mt-12 ml-11">
                    {data !== null ? (
                        <>
                            <iframe className=""
                                width="570"
                                height="320"
                                src={`${data.data.url}`}
                                title="video"
                            />
                            <span>{data.data.hey.videoDetails.title}</span>
                            <div
                                style={{
                                    marginTop: "2rem",
                                    paddingLeft: "10rem",
                                    paddingRight: "10rem",
                                }}
                            >
                                <Title level={5}>Avilable Formats</Title>
                                <br />
                                <Row gutter={[10, 20]}>
                                    {data?.data.info.map((value, index) => (
                                        <Col key={index} xs={24} md={3}>
                                            <Button
                                                download
                                                href={value.url}
                                                target="_self"
                                                type="primary"
                                                ghost
                                                icon={
                                                    value.hasAudio === false ? (
                                                        <AudioMutedOutlined style={{ color: "#FF0000" }} />
                                                    ) : null
                                                }
                                            >
                                                {value.mimeType.split(";")[0] + "   "}
                                                {value.hasVideo ? value.height + "p" : ""}
                                            </Button>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </>
                    ) : (
                        <>
                            <Title level={4}>SUBSCRIBE NOD YOUTUBE CHANNEL</Title>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;