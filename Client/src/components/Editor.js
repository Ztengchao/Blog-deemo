import React, { PureComponent, Fragment } from 'react';
import { Spin } from 'antd'
// 引入ckeditor5插件
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import MyImgUploadAdapter from './MyImgUploadAdapter';
// 引入中文包
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
export class Editor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.editor = {};
    }

    componentDidMount() {
        // 接受传入的初始内容
        let { value = "" } = this.props;
        this.init(value);
    }

    init(init_value) {

        DecoupledEditor.builtinPlugins.map(plugin => console.log(plugin.pluginName));

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
                // 内容变更时触发，获取内容，因为我是写完直接下一步的。
                editor.model.document.on('change:data', (e) => {
                    let richText = editor.getData();
                    console.log(richText);
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

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <div >
                    <div id="toolbar-container" ></div>
                    <div id="editor" >
                        <p>请输入文本内容...</p>
                    </div>
                </div>
            </Spin>
        )
    }
}