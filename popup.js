// 添加防抖函数实现
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const app = new Vue({
    el: '#app',
    data() {
        return {
            code: '',
            previewUrl: '',
            selectedExample: '',
            selectedTheme: '',
            themes: {
                blue: {
                    name: '蓝色主题',
                    code: `skinparam backgroundColor white
skinparam ArrowColor #2196F3
skinparam DefaultFontColor #333333
skinparam ParticipantBorderColor #2196F3
skinparam LifeLineBorderColor #2196F3
skinparam ParticipantBackgroundColor #E3F2FD
skinparam ActorBackgroundColor #E3F2FD
skinparam ActorBorderColor #2196F3`
                },
                dark: {
                    name: '暗色主题',
                    code: `skinparam backgroundColor #2D2D2D
skinparam ArrowColor #7E57C2
skinparam DefaultFontColor #FFFFFF
skinparam ParticipantBorderColor #7E57C2
skinparam LifeLineBorderColor #7E57C2
skinparam ParticipantBackgroundColor #4A4A4A
skinparam ActorBackgroundColor #4A4A4A
skinparam ActorBorderColor #7E57C2`
                },
                green: {
                    name: '绿色主题',
                    code: `skinparam backgroundColor white
skinparam ArrowColor #4CAF50
skinparam DefaultFontColor #333333
skinparam ParticipantBorderColor #4CAF50
skinparam LifeLineBorderColor #4CAF50
skinparam ParticipantBackgroundColor #E8F5E9
skinparam ActorBackgroundColor #E8F5E9
skinparam ActorBorderColor #4CAF50`
                },
                orange: {
                    name: '橙色主题',
                    code: `skinparam backgroundColor white
skinparam ArrowColor #FF9800
skinparam DefaultFontColor #333333
skinparam ParticipantBorderColor #FF9800
skinparam LifeLineBorderColor #FF9800
skinparam ParticipantBackgroundColor #FFF3E0
skinparam ActorBackgroundColor #FFF3E0
skinparam ActorBorderColor #FF9800`
                },
                red: {
                    name: '红色主题',
                    code: `skinparam backgroundColor white
skinparam ArrowColor #F44336
skinparam DefaultFontColor #333333
skinparam ParticipantBorderColor #F44336
skinparam LifeLineBorderColor #F44336
skinparam ParticipantBackgroundColor #FFEBEE
skinparam ActorBackgroundColor #FFEBEE
skinparam ActorBorderColor #F44336`
                },
                purple: {
                    name: '紫色主题',
                    code: `skinparam backgroundColor white
skinparam ArrowColor #9C27B0
skinparam DefaultFontColor #333333
skinparam ParticipantBorderColor #9C27B0
skinparam LifeLineBorderColor #9C27B0
skinparam ParticipantBackgroundColor #F3E5F5
skinparam ActorBackgroundColor #F3E5F5
skinparam ActorBorderColor #9C27B0`
                },
                darkBlue: {
                    name: '深蓝主题',
                    code: `skinparam backgroundColor #1A237E
skinparam ArrowColor #90CAF9
skinparam DefaultFontColor #FFFFFF
skinparam ParticipantBorderColor #90CAF9
skinparam LifeLineBorderColor #90CAF9
skinparam ParticipantBackgroundColor #283593
skinparam ActorBackgroundColor #283593
skinparam ActorBorderColor #90CAF9`
                },
                mint: {
                    name: '薄荷主题',
                    code: `skinparam backgroundColor white
skinparam ArrowColor #26A69A
skinparam DefaultFontColor #333333
skinparam ParticipantBorderColor #26A69A
skinparam LifeLineBorderColor #26A69A
skinparam ParticipantBackgroundColor #E0F2F1
skinparam ActorBackgroundColor #E0F2F1
skinparam ActorBorderColor #26A69A`
                },
                brown: {
                    name: '棕色主题',
                    code: `skinparam backgroundColor white
skinparam ArrowColor #795548
skinparam DefaultFontColor #333333
skinparam ParticipantBorderColor #795548
skinparam LifeLineBorderColor #795548
skinparam ParticipantBackgroundColor #EFEBE9
skinparam ActorBackgroundColor #EFEBE9
skinparam ActorBorderColor #795548`
                },
                cyberpunk: {
                    name: '赛博朋克',
                    code: `skinparam backgroundColor #0D0221
skinparam ArrowColor #FF00FF
skinparam DefaultFontColor #00FF00
skinparam ParticipantBorderColor #FF00FF
skinparam LifeLineBorderColor #FF00FF
skinparam ParticipantBackgroundColor #1A1A1A
skinparam ActorBackgroundColor #1A1A1A
skinparam ActorBorderColor #FF00FF`
                }
            },
            examples: {
                sequence: {
                    name: '时序图示例',
                    code: `@startuml
participant User
participant System

User -> System: 登录请求
activate System
System --> User: 返回登录结果
deactivate System
@enduml`
                },
                class: {
                    name: '类图示例',
                    code: `@startuml
class User {
    -String name
    -String password
    +login()
    +logout()
}
class Admin extends User {
    +manageSystem()
}
@enduml`
                },
                usecase: {
                    name: '用例图示例',
                    code: `@startuml
left to right direction
actor 用户
rectangle 系统 {
    用户 -- (登录)
    用户 -- (注册)
    用户 -- (查看信息)
}
@enduml`
                },
                complexFlow: {
                    name: '复杂流程示例',
                    code: `@startuml
actor 用户
participant "前端界面" as Frontend
participant "认证服务" as Auth
participant "业务服务" as Service
database "数据库" as DB

用户 -> Frontend: 1. 访问系统
activate Frontend

Frontend -> Auth: 2. 请求登录
activate Auth

Auth -> DB: 3. 验证用户信息
activate DB
DB --> Auth: 4. 返回验证结果
deactivate DB

alt 登录成功
    Auth --> Frontend: 5a. 返回Token
    Frontend -> Service: 6a. 请求业务数据
    activate Service
    
    Service -> DB: 7a. 查询数据
    activate DB
    DB --> Service: 8a. 返回数据
    deactivate DB
    
    Service --> Frontend: 9a. 返回业务数据
    deactivate Service
    
    Frontend --> 用户: 10a. 显示数据
else 登录失败
    Auth --> Frontend: 5b. 返回错误信息
    Frontend --> 用户: 6b. 显示错误提示
end

deactivate Auth
deactivate Frontend
@enduml`
                },
                workflow: {
                    name: '工作流程示例',
                    code: `@startuml
|客户|
start
:提交订单;

|销售部门|
:审核订单;
if (订单有效?) then (是)
  :计算价格;
  :生成报价单;
else (否)
  :通知客户订单无效;
  stop
endif

|客户|
:确认报价;
if (接受报价?) then (是)
  :支付订单;
else (否)
  :取消订单;
  stop
endif

|财务部门|
:确认收款;

|仓储部门|
:检查库存;
if (库存充足?) then (是)
  :准备发货;
else (否)
  :通知采购;
  :等待补货;
endif
:打包商品;

|物流部门|
:安排配送;
:更新物流信息;

|客户|
:收货确认;
:评价服务;

stop
@enduml`
                }
            }
        }
    },
    render(h) {
        return h('div', { class: 'container' }, [
            // Header
            h('div', { class: 'header' }, [
                h('h1', 'PlantUML 在线生成器'),
                h('p', '实时生成 UML 图表')
            ]),
            
            // Toolbar
            h('div', { class: 'toolbar' }, [
                h('select', {
                    class: 'examples-dropdown',
                    domProps: {
                        value: this.selectedExample
                    },
                    on: {
                        input: (event) => {
                            this.selectedExample = event.target.value;
                            this.loadExample();
                        }
                    }
                }, [
                    h('option', { attrs: { value: '' } }, '选择示例'),
                    ...Object.entries(this.examples).map(([key, example]) =>
                        h('option', { attrs: { value: key } }, example.name)
                    )
                ]),
                
                h('select', {
                    class: 'examples-dropdown',
                    domProps: {
                        value: this.selectedTheme
                    },
                    on: {
                        input: (event) => {
                            this.selectedTheme = event.target.value;
                            this.applyTheme();
                        }
                    }
                }, [
                    h('option', { attrs: { value: '' } }, '默认主题'),
                    ...Object.entries(this.themes).map(([key, theme]) =>
                        h('option', { attrs: { value: key } }, theme.name)
                    )
                ]),
                
                h('button', {
                    class: 'btn btn-secondary',
                    on: { click: this.clearCode }
                }, '清除代码'),
                
                h('button', {
                    class: 'btn btn-secondary',
                    on: { click: this.downloadImage }
                }, '下载图片')
            ]),
            
            // Content
            h('div', { class: 'content' }, [
                // Editor Container
                h('div', { class: 'editor-container' }, [
                    h('div', { class: 'section-title' }, 'PlantUML 代码'),
                    h('textarea', {
                        class: 'editor',
                        domProps: {
                            value: this.code,
                            placeholder: '在此输入 PlantUML 代码...'
                        },
                        on: {
                            input: (event) => {
                                this.code = event.target.value;
                                this.autoGenerate();
                            }
                        }
                    })
                ]),
                
                // Preview Container
                h('div', { class: 'preview-container' }, [
                    h('div', { class: 'section-title' }, '预览'),
                    h('div', { class: 'preview-image' }, [
                        this.previewUrl
                            ? h('img', {
                                attrs: {
                                    src: this.previewUrl,
                                    alt: 'UML 图表'
                                }
                            })
                            : h('div', '预览将在这里显示')
                    ])
                ])
            ])
        ]);
    },
    methods: {
        processCode(code, theme) {
            let lines = code.split('\n');
            let startIndex = lines.findIndex(line => line.trim() === '@startuml');
            let endIndex = lines.findIndex(line => line.trim() === '@enduml');
            
            if (startIndex === -1 || endIndex === -1) return code;
            
            let coreContent = lines.slice(startIndex + 1, endIndex)
                .filter(line => !line.trim().startsWith('skinparam'));
            
            let newCode = ['@startuml'];
            if (theme) {
                newCode.push(theme);
            }
            newCode.push(...coreContent);
            newCode.push('@enduml');
            
            return newCode.join('\n');
        },

        autoGenerate: debounce(function() {
            if (!this.code) return;
            
            try {
                let processedCode = this.code;
                if (this.selectedTheme) {
                    const theme = this.themes[this.selectedTheme];
                    if (theme) {
                        processedCode = this.processCode(this.code, theme.code);
                    }
                }
                const encoded = plantumlEncoder.encode(processedCode);
                this.previewUrl = `https://www.plantuml.com/plantuml/img/${encoded}`;
            } catch (error) {
                console.error('生成图表时出错:', error);
            }
        }, 500),

        applyTheme() {
            if (!this.code) return;
            const theme = this.themes[this.selectedTheme];
            if (theme) {
                this.code = this.processCode(this.code, theme.code);
            } else {
                this.code = this.processCode(this.code, '');
            }
            this.autoGenerate();
        },

        loadExample() {
            if (this.selectedExample && this.examples[this.selectedExample]) {
                const example = this.examples[this.selectedExample];
                this.code = example.code;
                if (this.selectedTheme) {
                    this.applyTheme();
                } else {
                    this.autoGenerate();
                }
            }
        },

        clearCode() {
            this.code = '';
            this.previewUrl = '';
            this.selectedExample = '';
            this.selectedTheme = '';
        },

        downloadImage() {
            if (!this.previewUrl) return;
            const link = document.createElement('a');
            link.href = this.previewUrl;
            link.download = 'plantuml-diagram.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}); 