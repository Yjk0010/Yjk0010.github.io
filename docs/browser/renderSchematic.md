# 浏览器渲染原理

<flowchart :chart="
`
start=>start: 开始
e=>end: 结束
op1=>operation: My Operation
op2=>operation: Stuff|current
cond=>condition: Yes
or No?|approved
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...
para=>parallel: parallel tasks
start->op1(right)->cond
cond(yes, right)->c2
cond(no)->para
c2(true)->io->e
c2(false)->e
para(path2, right)->op2->e
`"></flowchart>
