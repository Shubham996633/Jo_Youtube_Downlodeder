import React, { useState } from "react";
import { Typography, Form, Input, Button, } from "antd";
import {
    DownloadOutlined,

} from "@ant-design/icons";
import { BsCameraVideoOffFill, BsCameraVideoFill } from "react-icons/bs";
import { MdAudiotrack } from "react-icons/md";

import Axios from "axios";
import image from '../../Image/R.png'
const { Title } = Typography;



function App() {
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [related, setRelated] = useState([]);
    const [inputText, setInputText] = useState('')
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    console.log(data)
    async function submitForm(values) {
        setLoading(true);
        console.log(values)
        const data = await Axios.get(
            `https://youtube-downloader-4vbg.onrender.com/download?url=${values.url}`
        );
        setData(data);
        setRelated(data?.data.relation.related_videos);
        setInputText(values.url)
        setLoading(false);

    }


    const handleClick = (e) => {
        console.log(e);
        var content = {
            url: `https://www.youtube.com/watch?v=${e}`,
            id: e
        };
        console.log(content.url)
        submitForm(content)
        window.scrollTo(0, 0)

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
                                value={inputText}
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
                <div className="mt-12 ml-11  grid grid-cols-1 gap-4 lg:gap-2 lg:ml-6">


                    {data !== null ? (
                        <>

                            <div className="grid grid-cols-2 gap-4 lg:gap-2 md:grid-cols-1 lg:grid-cols-2">

                                <div className="ml-6  xl:ml-2 lg:ml-2">

                                    <iframe className="mt-3 border shadow-lg shadow-indigo-500/40 rounded-md p-2 hover:scale-105 ease-in-out duration-300 cursor-pointer"
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

                                    <div className="ml-12 text-left xl:ml-6 lg:ml-3 ">
                                        <div className="ml-12 xl:ml-6 lg:ml-3 ">

                                            <div className="grid grid-cols-3 grid-flow-row gap-2 items-center xl:grid-cols-3 lg:grid-cols-2">


                                                {data?.data.info.map((value, index) => (
                                                    <span key={index} xs={24} md={3}>
                                                        <Button
                                                            download
                                                            href={value.url}
                                                            target="_blank"
                                                            type="primary"

                                                            className={`${value.hasVideo === true ? (value.hasAudio === true ? ('bg-green-700') : 'bg-sky-600') : 'bg-pink-500'} flex  items-center justify-around font-medium text-xl h-16 w-48 mb-6 xl:h-16`}
                                                            icon={
                                                                value.hasVideo === true ? (

                                                                    value.hasAudio === true ? (

                                                                        <BsCameraVideoFill style={{ color: "#ffffff" }} />
                                                                    ) : <BsCameraVideoOffFill style={{ color: "#ffffff" }} />
                                                                ) : <MdAudiotrack style={{ color: "#ffffff" }} />

                                                            }
                                                        >
                                                            {value.container + " "}


                                                            {value.hasVideo ? value.height + "p" : ""}
                                                        </Button>
                                                    </span>
                                                ))}
                                            </div>

                                        </div>



                                    </div>
                                    <h1 className="text-3xl text-left place-self-start font-bold mt-3 mb-6 -ml-36" >Related Videos </h1>
                                </div>
                            </div>


                            <div className="grid grid-cols-4 gap-4  ">

                                {related.map((value, index) => (


                                    <div className={`flex flex-col items-center justify-between  border shadow-lg shadow-indigo-500/40 rounded-md p-2 hover:scale-105 ease-in-out duration-300 cursor-pointer ${value.id}`}
                                        onClick={() => handleClick(value.id)}
                                        key={value.id}
                                    >

                                        <img className="w-96 h-76 object-contain"


                                            src={`${value.thumbnails[1].url}`}
                                            title={`${value.title}`}

                                        />
                                        <span>{value.title}</span>
                                    </div>


                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </div>

                <div className="text-center text-xl font-bold m-6 text-sky-600">
                    <h1>2023 JoYoutubeDownloader</h1>

                </div>



            </div>


        </>
    );
}

export default App;