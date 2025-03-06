# Network-Analysis-System
A network hotspot public opinion monitoring and management system developed out of interest

> A public opinion management system developed using Django+MySql+Echarts architecture. Beginners are familiar with it for the first time. We hope experts and scholars can correct us

拟定的系统整体布局如下：
System/                          # 主项目目录
├── manage.py                   # Django管理脚本
├── README.md                   # 项目说明文件
├── System/                     # 主配置目录
│   ├── __init__.py
│   ├── settings.py             # 项目设置
│   ├── urls.py                 # 主URL配置
│   ├── asgi.py                 # ASGI配置
│   └── wsgi.py                 # WSGI配置
├── sentiment_analysis/         # 舆情分析应用
│   ├── __init__.py
│   ├── admin.py                # 管理界面配置
│   ├── apps.py                 # 应用配置
│   ├── models.py               # 数据模型
│   ├── views.py                # 视图函数
│   ├── urls.py                 # URL路由
│   ├── templates/              # 模板文件
│   │   └── sentiment_analysis/
│   │       ├── index.html      # 主页
│   │       ├── dashboard.html  # 数据面板
│   │       ├── trends.html     # 趋势分析
│   │       ├── wordcloud.html  # 词云展示
│   │       └── contact.html    # 联系页面
│   ├── static/                 # 静态文件
│   │   └── sentiment_analysis/
│   │       ├── css/
│   │       │   ├── main.css
│   │       │   └── contact.css
│   │       ├── js/
│   │       │   ├── main.js
│   │       │   └── echarts/
│   │       └── images/
│   └── scrapers/               # 爬虫模块
│       ├── __init__.py
│       ├── weibo_scraper.py    # 微博爬虫
│       ├── zhihu_scraper.py    # 知乎爬虫
│       └── news_scraper.py     # 新闻爬虫
├── user_management/            # 用户管理应用
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── templates/
│       └── user_management/
│           ├── login.html
│           ├── register.html
│           └── profile.html
└── requirements.txt            # 项目依赖

环境配置需要执行requirement.txt文件中的配置要求，随后试着运行
> cd System
> python manage.py runserver
定位浏览器地址为 localhost:8000 即可进行本地预览！

持续更新中...