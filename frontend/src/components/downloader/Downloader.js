import React, { useState } from "react";
import { Typography, Form, Input, Button, Row, Col } from "antd";
import {
    PlayCircleOutlined,
    DownloadOutlined,
    AudioMutedOutlined,
    VideoCameraFilled,
    AudioFilled,

} from "@ant-design/icons";
import { BsCameraVideoOffFill } from "react-icons/bs";
import Axios from "axios";
import image from '../../Image/R.png'
const { Title } = Typography;

function App() {
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hide, sideHide] = useState('hidden');
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
            <div className="text-center">
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
                <div className="mt-12 ml-11  grid grid-cols-2 gap-4">
                    {data !== null ? (
                        <>
                            <div className="ml-6">

                                <iframe className="mt-3"
                                    width="570"
                                    height="320"
                                    src={`${data.data.url}`}
                                    title="video"

                                />
                                <div className="mt-3 mr-12 text-left text-xl font-bold">
                                    {data.data.title.title}
                                </div>
                            </div>
                            <div className="ml-12 justify-end"


                            >
                                <Button className="text-2xl font-medium h-12 m-3">
                                    Video</Button>
                                <Button className="text-2xl font-medium h-12 m-3">
                                    Audio</Button>
                                <div className="ml-12 text-right ">
                                    <div className="ml-12 ">

                                        <div className="grid grid-cols-2 grid-flow-row gap-2 items-center">


                                            {data?.data.info.map((value, index) => (
                                                <span key={index} xs={24} md={3}>
                                                    <Button className="flex  items-center justify-around font-medium text-xl h-12 w-64 mb-6 gap-3"
                                                        download
                                                        href={value.url}
                                                        target="_self"
                                                        type="primary"
                                                        ghost
                                                        icon={
                                                            value.hasVideo === true ? (

                                                                value.hasAudio === true ? (

                                                                    <VideoCameraFilled style={{ color: "#FF0000" }} />
                                                                ) : <BsCameraVideoOffFill style={{ color: "#FF0000" }} />
                                                            ) : <AudioFilled style={{ color: "#FF0000" }} />

                                                        }
                                                    >
                                                        {value.mimeType.split(";")[0] + "   "}


                                                        {value.hasVideo ? value.height + "p" : ""}
                                                    </Button>
                                                </span>
                                            ))}
                                        </div>

                                    </div>



                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;