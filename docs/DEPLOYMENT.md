# Deployment Runbook · GitHub Pages 发布

## 本地预检

环境：Node.js ≥20；Python 3（本地 HTTP 服务器，可选）。

~~~bash
npm test
npm run serve
~~~

浏览器访问 http://localhost:4173 ，检查 81 章导航、原译对照、搜索、主题过滤和深链 #chapter-81。不要使用 file:// 直接打开 index.html。

## 首次启用 GitHub Pages（必要的一次性手工设置）

GitHub Repo → **Settings → Pages → Build and deployment → Source → GitHub Actions**。选择此项并保存。依据 [GitHub 官方 Pages 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

然后到 [Actions](https://github.com/1998x-stack/TaoTeChing/actions) 查看「Deploy Tao Te Ching to Pages」的最近运行；必要时通过 workflow_dispatch 手动执行。

**提醒：** 写入 workflow 并不意味着 Pages 自动获得启用权限。只有部署成功且公开 URL 可访问后，才能标记为 live。

## 自动发布流程

~~~text
push to main
  -> CI: npm test
  -> Pages job: npm test
  -> assemble dist (index, CSS, JS, chapters, SVG, .nojekyll)
  -> configure-pages@v5
  -> upload-pages-artifact@v4
  -> deploy-pages@v4
  -> https://1998x-stack.github.io/TaoTeChing/
~~~

源文件必须使用相对 URL，因为 Pages 站点挂在 /TaoTeChing/ 子路径下。禁止将根路径 / 当作绝对资源根路径。

## 验收清单

- CI 与 Pages 均成功；
- 打开主页无资源 404；
- 页面内容可在手机阅读；
- 输入关键词「上善若水」结果正确；
- 打开 #chapter-81，阅读室显示第八十一章；
- 原文/译文切换正确；
- 刷新后主题和书签仍保持；
- 启用减少动画后没有不必要运动。

## 故障处理

- **404:** Pages 未启用、Actions 未完成，或资源使用了绝对路径。检查 Settings → Pages 和 workflow。
- **部署权限:** 查看 workflow 是否有 pages: write 与 id-token: write；环境名 github-pages。
- **模块加载失败:** 需要 HTTP 访问；确认 dist/data/chapters.js 被复制。
- **npm test 失败:** 检查 81 条数据是否编号连续、HTML 控件 ID 是否一致、文件是否缺失。
- **页面只有骨架:** 控制台检查 JavaScript 模块异常，尤其是文件路径和 JSON 语法。

## 回滚

通过 GitHub 恢复最近一个通过验证的提交（优先 revert，不强推），让主分支重新触发部署。重要文本校勘修订须在 PR 中记录变更来源。