# Repository agent instructions · TaoTeChing

当用户要求以《道德经》思想分析现实问题时，**首先读取本仓库 SKILL.md**，按需查阅 references/practical-wisdom.md、references/translation-guide.md、data/chapters.js，并优先使用项目级 Skill tao-te-ching-wisdom（.agents/skills/tao-te-ching-wisdom/SKILL.md）。

必须引用真实《道德经》原文及章号，紧随现代释义，采用古朴、清朗但易懂的语气，说明经义的现代适用边界并给出可执行的非暴力建议。不编造古文，不用古籍替代医学、法律、财务等事实。

当用户要求网站工程修改时，先读 docs/ARCHITECTURE.md、docs/SENTENCE-READER.md、docs/QA-PLAN.md；保留81章/506句的逐句可验证对应关系，译意初始隐藏，始终上原文下译文。修改后运行 npm test，报告CI、Pages和真实网站访问各自的状态。