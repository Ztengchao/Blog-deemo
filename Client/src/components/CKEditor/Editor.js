import React, { PureComponent } from 'react';
import { Spin, Input, Button, message } from 'antd'
// 引入ckeditor5插件
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import MyImgUploadAdapter from './MyImgUploadAdapter';
// 引入中文包
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
import Axios from 'axios';
export class Editor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: "输入正文",
            title: "请输入标题",
            articleId: 0,
        }
        this.editor = {};
    }

    componentDidMount() {
        // 接受传入的初始内容
        let { data, title, articleId } = this.state;
        if (this.props.location.state != undefined) {
            data = this.props.location.state.content;
            title = this.props.location.state.title;
            articleId = this.props.location.state.id;
        }

        this.setState({
            title,
            data,
            articleId,
        });

        this.init(data);
    }

    saveArticle = () => {
        let data = {
            title: this.state.title,
            content: this.state.data,
            id: this.state.articleId,
        };
        Axios.post("api/article/EditArticle", data)
            .then(res => {
                if (res.data.success) {
                    this.props.history.push("/");
                } else {
                    message.error("保存失败：" + res.data.message);
                }
            })
            .catch(err => {
                message.error("保存失败：" + err);
            });
    }

    init(init_value) {

        // 初始化组件
        DecoupledEditor
            .create(
                // 文本内容所在标签
                document.querySelector('#editor'),
                {
                    language: 'zh-cn',
                    // 设置初始值
                    initialData: init_value,

                }
            )
            .then(editor => {
                // 选择toolbar所在标签
                const toolbarContainer = document.querySelector('#toolbar-container');
                toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                    // 抓取图片上传状态
                    loader.uploadType = this.uploadType.bind(this)

                    return new MyImgUploadAdapter(loader);
                };

                this.editor = editor;
                editor.model.document.on('change:data', (e) => {
                    let data = editor.getData();
                    this.setState({ data });
                })
            })
            .catch(error => {
                console.error(error);
            });
    }

    uploadType(type) {
        this.setState({
            loading: type
        })
    }

    titleOnChange = e => {
        let title = e.target.value;
        this.setState({ title });
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <div>
                    <Input maxLength={70} onChange={this.titleOnChange.bind(this)} style={{ fontSize: "26px", fontWeight: "bold" }} defaultValue={this.state.title}></Input>
                    <div style={{ marginTop: "20px" }} id="toolbar-container" ></div>
                    <div id="editor" style={{ marginTop: "20px", overflowY: "auto", height: "400px" }}>
                    </div>
                    <Button onClick={this.saveArticle.bind(this)} type="primary" style={{ marginBottom: "10%", marginTop: "20px" }} >保存</Button>
                </div>
            </Spin>
        )
    }
}