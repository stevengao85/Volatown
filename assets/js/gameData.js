window.GAME_DATA = {
  "title": "波动城：希腊女神与期权学徒",
  "subtitle": "A static visual-novel style learning game for Netlify",
  "version": "1.1.0",
  "titleBackground": "assets/img/fantasy/bg-title.jpg",
  "finalBackground": "assets/img/fantasy/bg-title.jpg",
  "chapters": [
    {
      "id": 1,
      "key": "delta",
      "title": "第一关：方向与买卖",
      "subtitle": "Direction & Position",
      "goddess": "Delta",
      "theme": "direction",
      "background": "assets/img/fantasy/bg-ch1.jpg",
      "reward": "方向罗盘",
      "summary": "先把看涨、看跌与买卖方式拆开。",
      "dialogue": [
        [
          "Delta",
          "欢迎来到方向街。在期权的世界里，你要分清看涨和看跌，以及买和卖。"
        ],
        [
          "Apprentice",
          "我知道！看涨就是买，看跌就是卖！"
        ],
        [
          "Master",
          "你这句只对了一半。"
        ],
        [
          "Delta",
          "是的，期权的看涨看跌是一回事，但买和卖是另一回事。"
        ],
        [
          "Apprentice",
          "哦！我明白了！是不是买涨就是卖跌，买跌就是卖涨？"
        ],
        [
          "Delta",
          "你这么说也不能算完全错。但买涨和卖跌毕竟还是两回事，差别非常大。"
        ],
        [
          "Apprentice",
          "都有哪些差别哦，Delta老师？"
        ],
        [
          "Delta",
          "差别就在于买方是拥有权利，而卖方要承担义务。买方的最大亏损是有限的，潜在收益无限。卖方正好反过来"
        ],
        [
          "Apprentice",
          "我有点乱了……"
        ],
        [
          "Delta",
          "别急。新手一上来要搞清买方卖方，权利义务、看涨看跌这么多概念，肯定乱。"
        ],
        [
          "Master",
          "所以你还是先把买方学透。希望标的涨，你就买Call，希望跌就买Put。"
        ],
        [
          "Apprentice",
          "但我还是想问，买Call和卖Put到底有什么差别？"
        ],
        [
          "Delta",
          "好吧，既然你这么好学，我就告诉你。买Call是你希望标的马上就大涨。那如果你只是觉得他会涨，但不知道什么时候涨，也不清楚能涨多少，那会好就是卖 Put。"
        ],
        [
          "Apprentice",
          "我明白了，强烈看涨就买Call，温和看涨就卖Put。"
        ],
        [
          "Master",
          "做卖方还有行权价、接货、以及保证金的问题。不过这些以后再说了。"
        ],
        [
          "Delta",
          "接下来做测试。"
        ]
      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "如果你判断标的短期内会大涨，那么你应该采取的措施是：",
          "options": [
            "买入 Call",
            "买入 Put",
            "卖出 Call",
            "不看方向"
          ],
          "answer": 0,
          "explanation": "入门阶段先记：看涨 → 买 Call。"
        },
        {
          "difficulty": "中",
          "question": "如果你判断标的会在近期（例如一个月内）下跌，那么最直接的方式是：",
          "options": [
            "买入 Call",
            "买入 Put",
            "卖出 Put",
            "买入股票"
          ],
          "answer": 1,
          "explanation": "入门阶段先记：看跌 → 买 Put。"
        },
        {
          "difficulty": "高",
          "question": "如果你对一只标的是看好的，但不清楚什么时候会涨，也对涨幅没有把握，那么哪种思路更接近这个判断？",
          "options": [
            "买入 Put",
            "卖出 Put",
            "卖出 Call",
            "买入跨式"
          ],
          "answer": 1,
          "explanation": "卖 Put 适合偏看涨或中性偏多、且愿意被指派买入标的的人。"
        }
      ],
      "location": "方向街",
      "mapX": 16.5,
      "mapY": 26.0
    },
    {
      "id": 2,
      "key": "vega",
      "title": "第二关：行权价与打和点",
      "subtitle": "Break-even",
      "goddess": "Vega",
      "theme": "volatility",
      "background": "assets/img/fantasy/bg-ch2.jpg",
      "reward": "波动铃",
      "summary": "方向对了还不够，价格还得走过成本线。",
      "dialogue": [
        [
          "Vega",
          "欢迎来到打和摊位。"
        ],
        [
          "Vega",
          "上一关在Delta那里你应该已经学过了期权的看涨看跌以及买方卖方的概念。"
        ],
        [
          "Vega",
          "但是你不要认为，方向做对了就一定能赚钱。"
        ],
        [
          "Apprentice",
          "为什么？"
        ],
        [
          "Vega",
          "因为期权也有成本，你的收益至少要覆盖期权的成本。"
        ],
        [
          "Master",
          "是的，她的意思是打和点，也就是盈亏平衡线。"
        ],
        [
          "Apprentice",
          "就是回本线？"
        ],
        [
          "Vega",
          "对。记住：Call 的打和点，行权价加权利金；Put 的打和点，行权价减权利金。"
        ],
        [
          "Apprentice",
          "这么简单？"
        ],
        [
          "Vega",
          "公式简单。真正难的是，市场的运行给不给你来到打和点以上的机会。"
        ],
        [
          "Master",
          "所以方向判断、幅度判断、成本判断，缺一不可。"
        ],
        [
          "Vega",
          "对，新手最爱把“方向对了”误会成“赚钱稳了”，做对了方向也赚不到钱的情况太多了。"
        ],
        [
          "Apprentice",
          "好吧，我承认，我之前确实没有想这么多。"
        ],
        [
          "Vega",
          "记住打和点的概念。没到打和点，方向对也可能还是输。"
        ]
      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "一张 Call 的行权价为 100，权利金为 6。它的打和点是：",
          "options": [
            "94",
            "100",
            "106",
            "110"
          ],
          "answer": 2,
          "explanation": "Call 打和点 = 行权价 + 权利金 = 106。"
        },
        {
          "difficulty": "中",
          "question": "一张 Put 的行权价为 50，权利金为 2。它的打和点是：",
          "options": [
            "48",
            "50",
            "52",
            "46"
          ],
          "answer": 0,
          "explanation": "Put 打和点 = 行权价 - 权利金 = 48。"
        },
        {
          "difficulty": "高",
          "question": "标的现价 100。合约甲：Call，行权价 100，权利金 3；合约乙：Call，行权价 105，权利金 1。哪张更容易先到达打和点？",
          "options": [
            "合约甲",
            "合约乙",
            "两者一样",
            "无法判断"
          ],
          "answer": 0,
          "explanation": "甲的打和点是 103，乙的打和点是 106。103 更近。"
        }
      ],
      "location": "波动集市",
      "mapX": 28.5,
      "mapY": 42.0
    },
    {
      "id": 3,
      "key": "rho",
      "title": "第三关：价内价外",
      "subtitle": "ITM / ATM / OTM",
      "goddess": "Rho",
      "theme": "value",
      "background": "assets/img/fantasy/bg-ch3.jpg",
      "reward": "价值书签",
      "summary": "把价内、价平、价外分清楚，后面才不会全乱。",
      "dialogue": [
        [
          "Rho",
          "你会区分期权的价内价外吗？"
        ],
        [
          "Apprentice",
          "什么是期权的价内价外？"
        ],
        [
          "Master",
          "就是用来衡量期权如果现在立刻行权，有没有价值。"
        ],
        [
          "Rho",
          "是的。对于Call来说，如果现价高于行权价，就是价内。"
        ],
        [
          "Apprentice",
          "因为它本身已经有价值？"
        ],
        [
          "Rho",
          "对。Put 则相反，现价低于行权价时是价内。"
        ],
        [
          "Apprentice",
          "那现价刚好等于行权价怎么说？"
        ],
        [
          "Rho",
          "那叫平价。"
        ],
        [
          "Vega",
          "呵呵，Rho这关看似简单，其实相当容易搞混。"
        ],
        [
          "Rho",
          "还有，你做买方，最希望的是从价外到价内的那一瞬间，因为原本只有一点时间价值的东西开始有了内在价值，这过程很爽。但做卖方最怕的是从价外变到价内，因为你要承担要么交付股票要么买别人股票的义务。这一点你能理解吗？"
        ],
        [
          "Apprentice",
          "我又感觉头晕晕的了。"
        ],
        [
          "Gamma",
          "价内价外都头晕晕，后面给你乱大套！"
        ],
        [
          "Apprentice",
          "这才第三关，压力已经这么大。。。"
        ],
        [
          "Rho",
          "（我们大姐Gamma说话比较直。）"
        ],
        [
          "Master",
          "学会了就没有压力。先把名字和逻辑对上。"
        ]

      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "标的现价 105，一张 Call 的行权价 100。这张 Call 属于：",
          "options": [
            "价内",
            "价平",
            "价外",
            "无法判断"
          ],
          "answer": 0,
          "explanation": "Call 在现价高于行权价时为价内。"
        },
        {
          "difficulty": "中",
          "question": "标的现价 95，一张 Put 的行权价 100。这张 Put 属于：",
          "options": [
            "价外",
            "价平",
            "价内",
            "已归零"
          ],
          "answer": 2,
          "explanation": "Put 在现价低于行权价时为价内。"
        },
        {
          "difficulty": "中",
          "question": "标的现价 100，Call 行权价 100，Put 行权价 100。此时这两张期权分别是：",
          "options": [
            "Call 价内，Put 价外",
            "Call 价外，Put 价内",
            "两者都平价",
            "两者都价内"
          ],
          "answer": 2,
          "explanation": "现价等于行权价时，通常视为平价。"
        },
        {
          "difficulty": "高",
          "question": "以下四句表述中，那句是正确的？",
          "options": [
            "价内Call的买方通常会买入股票，价外Call的卖方通常会被指派卖出股票。",
            "价内Call的卖方通常会被指派买入股票，价内Put的买方通常会买入股票。",
            "价外Put的卖方通常不会被指派买入股票，价外Put的买方通常会行权卖出股票。",
            "价外Put的买方通常不会行权卖出股票，价内Call的卖方通常会被指派卖出股票。"
          ],
          "answer": 3,
          "explanation": "现价等于行权价时，通常视为平价。"
        }
      ],
      "location": "价值档案馆",
      "mapX": 25.0,
      "mapY": 66.5
    },
    {
      "id": 4,
      "key": "theta",
      "title": "第四关：时间价值",
      "subtitle": "Time Value",
      "goddess": "Theta",
      "theme": "time",
      "background": "assets/img/fantasy/bg-ch4.jpg",
      "reward": "沙漏碎片",
      "summary": "期权价格不只包含现在值多少钱，还包含未来可能值多少钱。",
      "dialogue": [
        [
          "Theta",
          "前三关过了？但我看你身上还是有一种新手的急躁感。"
        ],
        [
          "Apprentice",
          "做期权的人不都是想赚快钱嘛？"
        ],
        [
          "Theta",
          "谁说的？做期权也可以慢慢变富。"
        ],
        [
          "Master",
          "这一关学的是时间价值。"
        ],
        [
          "Theta",
          "一张期权的价格包含两部分，“已经值多少钱”和“未来可能值多少钱”。"
        ],
        [
          "Apprentice",
          "我猜这就是所谓的“内在价值”和“时间价值”了吧？"
        ],
        [
          "Theta",
          "对的。孺子可教也。"
        ],
        [
          "Apprentice",
          "所以离到期越远，时间价值通常越高。"
        ],
        [
          "Theta",
          "没错，你的sense不错。因为期限越远，市场越肯为“可能性”付钱。"
        ],
        [
          "Master",
          "还有，你要注意，平价附近的期权，时间价值往往更高。"
        ],
        [
          "Apprentice",
          "这是为什么？他不是最接近行权吗？"
        ],
        [
          "Theta",
          "完全不是这样的。平价附近的期权不确定性最高。你琢磨琢磨。"
        ],
        [
          "Apprentice",
          "我有点明白了。越往价内和越往价外都是确定性更高的。"
        ],
        [
          "Theta",
          "好，别得意，来答题。"
        ]
      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "一张 Call 行权价 100，标的现价 108，期权价格为 10。它的时间价值是：",
          "options": [
            "2",
            "8",
            "10",
            "18"
          ],
          "answer": 0,
          "explanation": "内在价值 = 108 - 100 = 8，时间价值 = 10 - 8 = 2。"
        },
        {
          "difficulty": "中",
          "question": "其他条件相近时，哪张期权通常有更多时间价值？",
          "options": [
            "还有 3 天到期的期权",
            "还有 30 天到期的期权",
            "两者一样",
            "无法比较"
          ],
          "answer": 1,
          "explanation": "到期越远，时间价值通常越高。"
        },
        {
          "difficulty": "高",
          "question": "标的现价 100，同到期日下，哪张 Call 通常时间价值更高？",
          "options": [
            "行权价 80",
            "行权价 100",
            "行权价 130",
            "行权价 150"
          ],
          "answer": 1,
          "explanation": "价平附近的期权通常时间价值最高。"
        }
      ],
      "location": "时间塔前厅",
      "mapX": 52.0,
      "mapY": 85.0
    },
    {
      "id": 5,
      "key": "theta",
      "title": "第五关：时间损耗与Theta",
      "subtitle": "Theta in Action",
      "goddess": "Theta",
      "theme": "time",
      "background": "assets/img/fantasy/bg-ch5.jpg",
      "reward": "衰减印记",
      "summary": "买方不动，时间也会动；Theta 就是这种流失速度。",
      "dialogue": [
        [
          "Theta",
          "上一关你学的是时间价值。这一关我们看看时间价值是怎样损耗的。"
        ],
        [
          "Apprentice",
          "我知道时间损耗。价外期权的时间损耗很恐怖！"
        ],
        [
          "Theta",
          "不仅是价外，所有期权的时间价值都在随时损耗。"
        ],
        [
          "Theta",
          "那么，怎样衡量每天时间价值的损耗速度？"
        ],
        [
          "Master",
          "希腊字母Theta。"
        ],
        [
          "Apprentice",
          "所以 Theta = 每天大概亏多少时间价值？"
        ],
        [
          "Theta",
          "在其他条件不变时，可以这么理解。"
        ],
        [
          "Apprentice",
          "所以那买期权的人岂不是很怕时间损耗？"
        ],
        [
          "Theta",
          "是的，说到点子上了。如果股价一个月不动，那时间价值的亏损就会非常明显。"
        ],
        [
          "Theta",
          "事实上期权的买方就是在赌价格变化与时间损耗哪个更快。其实就是Delta与Theta的对决。"
        ],
        [
          "Master",
          "没错，那么反过来，期权的卖方就是寻求从时间损耗中获利。"
        ],
        [
          "Apprentice",
          "怪不得很多人喜欢卖方。"
        ],
        [
          "Theta",
          "喜欢是一回事，能不能赚到钱是另一回事。"
        ],
        [
          "Apprentice",
          "怎么会赚不到钱？"
        ],
        [
          "Theta",
          "如果你方向做错，卖方的风险比买方高得多。"
        ],
         [
          "Apprentice",
          "为什么？"
        ],
        [
          "Theta",
          "因为买方最多亏损的是本金，而卖方则可能翻几倍的亏。"
        ],
        [
          "Apprentice",
          "那这样的话，盈亏岂不是完全不对称？赚一点小钱，代价却是可能亏一大笔钱。"
        ],
        [
          "Theta",
          "你没有考虑概率。期权卖方是在用大的概率博小的收益。这种小的收益在一次次大概率事件中积累起来，就可以了。这就是上一关我告诉你利用期权慢慢变富的原理。"
        ],
        [
          "Theta",
          "考考你，既然期权卖方的亏钱概率是小的，但亏损的幅度可能巨大。那么这时当可能面临亏损的时候，你应该怎样做？"
        ],
        [
          "Apprentice",
          "止损？"
        ],
        [
          "Theta",
          "Exactly! "
        ],
        [
          "Theta",
          "除了止损，还可以向下去展期。这个属于高阶技巧，我们这里就不涉及了。总之，不要任由short put去无限亏损下去。这很重要"
        ]
      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "如果一张你买入的期权 Theta 为 -0.05，在其他条件不变时，过一天它大约会：",
          "options": [
            "涨 0.05",
            "跌 0.05",
            "不变",
            "涨 5"
          ],
          "answer": 1,
          "explanation": "Theta 为 -0.05，表示时间过去一天，期权价格大约减少 0.05。"
        },
        {
          "difficulty": "中",
          "question": "在其他条件不变时，谁通常更希望时间赶快过去？",
          "options": [
            "期权买方",
            "期权卖方",
            "买股票的人",
            "全都一样"
          ],
          "answer": 1,
          "explanation": "时间衰减通常对卖方更有利。"
        },
        {
          "difficulty": "高",
          "question": "哪类期权通常 Theta 衰减更快？",
          "options": [
            "离到期还很远的深度价内期权",
            "刚上市的新股",
            "临近到期的价平期权",
            "永不到期的期权"
          ],
          "answer": 2,
          "explanation": "临近到期的价平期权，时间衰减通常最快。"
         },
         {
          "difficulty": "高",
          "question": "做short put的人，最害怕的是什么？",
          "options": [
            "股票价格大涨",
            "股票价格大跌",
            "股票价格轻微上涨",
            "股票价格轻微下跌"
          ],
          "answer": 1,
          "explanation": "股票价格大跌，put的权利金会大幅增加，卖put的人会损失惨重"
        },
        {
          "difficulty": "高",
          "question": "当临近期权到期，以下关于时间价值和时间损耗的判断，哪句是正确的？",
          "options": [
            "越临近到期，价外期权的时间价值越少，价内期权的时间价值越多。",
            "越临近到期，价外期权的时间价值越少，平价期权的时间价值越多。",
            "越临近到期，价内期权的theta绝对值越小，价外期权的theta绝对值越大。",
            "越临近到期，平价期权的theta绝对值越大，价内期权的theta绝对值越小。"
          ],
          "answer": 3,
          "explanation": "价平附近的期权通常时间价值最高。"
        }
      ],
      "location": "时间塔高层",
      "mapX": 56.0,
      "mapY": 68.5
    },
    {
      "id": 6,
      "key": "delta",
      "title": "第六关：价格敏感度与Delta",
      "subtitle": "Delta in Action",
      "goddess": "Delta",
      "theme": "direction",
      "background": "assets/img/fantasy/bg-ch6.jpg",
      "reward": "方向刻印",
      "summary": "标的动一格，期权大概会动多少，就看 Delta。",
      "dialogue": [
        [
          "Delta",
          "Hello！又见面了~ 今天我来教你Delta的概念。"
        ],
        [
          "Apprentice",
          "是价格敏感度？"
        ],
        [
          "Delta",
          "对。Delta的概念是期权价格跟正股价格的变化比例。"
        ],
        [
          "Delta",
          "Call 的 Delta 一般是正的，从0到1；Put 的 Delta 一般是负的，从-1变到0。"
        ],
        [
          "Apprentice",
          "因为Call与股票的变化方向相同，Put则是相反的。"
        ],
        [
          "Delta",
          "对。你有点开窍了。"
        ],
        [
          "Apprentice",
          "那 Delta的取值是代表什么？"
        ],
        [
          "Delta",
          "Delta的值反映的是正股价格变化1，期权价格变化多少。"
        ],
        [
          "Apprentice",
          "诶，感觉有点像杠杆率？"
        ],
        [
          "Delta",
          "不一样，Delta衡量的是价格的变化。杠杆率衡量的是涨跌幅的变化。Delta和杠杆率可以互相换算的，你琢磨琢磨。"
        ],
        [
          "Apprentice",
          "（沉思中...）"
        ],
        [
          "Master",
          "Delta也能用来估算敞口。"
        ],
        [
          "Delta",
          "对，如果持有多张期权，那么 Delta 是可以叠加的。"
        ],
        [
          "Master",
          "Delta也可以用来计算对冲比例。"
        ],
        [
          "Delta",
          "是的，一张期权能对冲多少正股，就用Delta来计算。所以Delta有时也被叫做“对冲值”。但计算的时候要记得乘以100哦。因为每张期权代表100股。"
        ],
        [
          "Apprentice",
          "明白了。"
        ],
        [
          "Delta",
          "来答题，看看你掌握的怎么样。"
        ]
      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "一张 Call 的 Delta 为 0.6。若标的大致上涨 1 元，在其他条件不变时，这张期权理论上大约：",
          "options": [
            "下跌 0.6",
            "上涨 0.6",
            "不变",
            "上涨 6"
          ],
          "answer": 1,
          "explanation": "Call 的 Delta 为正，标的上涨时，期权通常也上涨。"
        },
        {
          "difficulty": "中",
          "question": "一张 Put 的 Delta 为 -0.4。若标的大致上涨 2 元，在其他条件不变时，这张 Put 理论上大约：",
          "options": [
            "下涨 0.8",
            "上跌 0.8",
            "不变",
            "下跌 2"
          ],
          "answer": 0,
          "explanation": "-0.4 × 2 = -0.8。"
        },
        {
          "difficulty": "高",
          "question": "你持有 2 张 Call，每张合约 Delta 为 0.5，每张合约对应 100 股。你的总 Delta 大约等于多少股标的的方向暴露？",
          "options": [
            "200 股",
            "150 股",
            "100 股",
            "50 股"
          ],
          "answer": 2,
          "explanation": "2 × 0.5 × 100 = 100。"
        },
        {
          "difficulty": "高",
          "question": "设股票X的现价为600，它的一张看涨期权的价格为12，Delta等于0.3，请你计算这张期权的有效杠杆率是多少",
          "options": [
            "50",
            "40",
            "15",
            "3"
          ],
          "answer": 2,
          "explanation": "-0.4 × 2 = -0.8。"
        }
      ],
      "location": "方向街高台",
      "mapX": 76.0,
      "mapY": 84.0
    },
    {
      "id": 7,
      "key": "vega",
      "title": "第七关：隐含波动率",
      "subtitle": "Vega in Action",
      "goddess": "Vega",
      "theme": "volatility",
      "background": "assets/img/fantasy/bg-ch7.jpg",
      "reward": "隐波面纱",
      "summary": "你买的不只是方向，也是市场对未来波动的预期。",
      "dialogue": [
        [
          "Vega",
          "我们又见面了。这一关来聊隐含波动率，也就是IV。"
        ],
        [
          "Vega",
          "这是期权里面最难、也最好玩的部分。"
        ],
        [
          "Master",
          "隐含波动率（也叫IV）反映的是市场对一只股票未来波动情况的预期。"
        ],
        [
          "Vega",
          "对。隐含波动率也会影响期权价格。隐含波动率越高，期权通常会更贵。"
        ],
        [
          "Apprentice",
          "所以我买入期权时，也在做多波动率？"
        ],
        [
          "Vega",
          "话没错，但逻辑其实应该是反过来的。如果你认为一只股票的IV会升高，那么你应该做买方；如果你认为他的IV降低，那你应该做卖方。"
        ],
        [
          "Apprentice",
          "怎么判断股票的IV是升高还是降低"
        ],
        [
          "Vega",
          "好问题。一般股票的IV都会在一个区间内变化。如果目前IV在区间上方，那么你就应该期待IV回落；如果在区间下方，你就要期待它回升。"
        ],
        [
          "Vega",
          "这种事情以前做交易的人都是靠脑子记的，现在就不用了。Moomoo App已经帮你做好了统计。只要在期权页面选择“分析”，然后选择“波动率分析”就可以看到当前的IV处在区间什么分位数了。"
        ],
        [
          "Apprentice",
          "太棒了。"
        ],
        [
          "Vega",
          "隐含波动率也会对时间价值有影响。IV升高，期权的时间价值会增厚。"
        ],
        [
          "Apprentice",
          "不是说时间价值只会变少，不会增加吗？"
        ],
        [
          "Vega",
          "那是在IV不变的情况下。如果IV增加，则时间价值会变多。这就相当于无中生有，凭空给期权“造”出来了一部分价值。而一旦IV下降，这部分价值就变没了。"
        ],
        [
          "Apprentice",
          "这么神奇。"
        ],
        [
          "Vega",
          "是的，另外你还要注意，不同的股票，它的IV规律也不同。有的股票IV一向都很低，例如银行、能源、公用事业这些板块。有的股票IV天生就高，比如科技、加密、还有新股。七巨头里面普遍IV较低，除了英伟达和特斯拉稍微高一点。"
        ],
        [
          "Apprentice",
          "Vega老师，你好渊博哦。"
        ],
        [
          "Gamma",
          "这些都是基本功了。记不住这些，怎么玩期权啊？"
        ]
      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "在其他条件不变时，如果隐含波动率上升，买入的期权通常会：",
          "options": [
            "更值钱",
            "更不值钱",
            "完全不变",
            "立刻归零"
          ],
          "answer": 0,
          "explanation": "隐波上升通常有利于买方期权。"
        },
        {
          "difficulty": "中",
          "question": "同一标的、同一行权价、其他条件相近时，哪张期权通常 Vega 更大？",
          "options": [
            "还有 7 天到期",
            "还有 90 天到期",
            "两者一样",
            "无法比较"
          ],
          "answer": 1,
          "explanation": "远月期权通常对隐波更敏感。"
        },
        {
          "difficulty": "中",
          "question": "以下哪个选项中股票倾向于具有最高的隐含波动率？",
          "options": [
            "微软、英伟达、AMD",
            "高盛、摩根大通、贝莱德",
            "Circle、Robinhood、Strategy",
            "礼来、安进、诺和诺德"
          ],
          "answer": 2,
          "explanation": "加密板块的IV一般在70或以上。其它那几个板块选项都普遍在40以下，除了英伟达目前为50多。"
        },
        {
          "difficulty": "高",
          "question": "关于隐含波动率，以下哪个说法是正确的",
          "options": [
            "隐含波动率升高会使Call的价格增加，Put的价格减少",
            "隐含波动率的变化对期权买方和卖方的影响是相同的",
            "隐含波动率降低，会时期权凭空失去一部分时间价值，所以隐含波动率降低等于时间损耗",
            "隐含波动率不会在很长时间内维持在极低的水平"
          ],
          "answer": 3,
          "explanation": "IV倾向于均值回归，太低了会反弹，太高了会回落。"
        }
      ],
      "location": "波动广场",
      "mapX": 81.0,
      "mapY": 52.0
    },
    {
      "id": 8,
      "key": "gamma",
      "title": "第八关：期权组合",
      "subtitle": "Basic Option Structures",
      "goddess": "Gamma",
      "theme": "risk",
      "background": "assets/img/fantasy/bg-ch8.jpg",
      "reward": "风控印章",
      "summary": "组合不是花活，是把风险和成本都框起来。",
      "dialogue": [
        [
          "Gamma",
          "终于到我这里了。前面以理论居多，现在开始实战了。"
        ],
        [
          "Gamma",
          "你要在我这里过两关，分别是期权组合和业绩期赌期权。现在先聊聊期权组合。"
        ],
        [
          "Apprentice",
          "我学过买Call买Put卖Call卖Put，那么期权组合就是他们之间的排列组合吗？"
        ],
        [
          "Gamma",
          "表面上看没错。但你要理解，期权组合实际上是为了改善单腿期权的缺陷。"
        ],
        [
          "Master",
          "组合策略的意义，是把收益和风险都框住。"
        ],
        [
          "Gamma",
          "比如你看涨，但Call太贵，而你不想成本太高，这时可以做牛市看涨价差。也就是买一个Call的同时卖一个行权价更高的Call"
        ],
        [
          "Apprentice",
          "这有什么意义吗？"
        ],
        [
          "Gamma",
          "当然有，这种组合会给你留一个价格向上的敞口，但比单独买一个Call便宜的多。更重要的是，因为你既有买也有卖，所以IV对你的影响变小了。记得之前说过吗，买方怕IV下降，而卖方怕IV升高。其实你这一买一卖之间已经构成了对冲。"
        ],
        [
          "Apprentice",
          "有意思？"
        ],
        [
          "Master",
          "如果你持有正股，担心下跌，可以买保护性 Put。"
        ],
        [
          "Apprentice",
          "相当于用期权和股票之间构成对冲？？"
        ],
        [
          "Gamma",
          "对。而且不只是保护性Put。如果你持有正股，觉得股票涨不动了，但又不想卖，那么你可以玩一点卖备兑式Call。你能分析出备兑Call最大的风险吗？"
        ],
        [
          "Apprentice",
          "股票大涨？？"
        ],
        [
          "Gamma",
          "聪明！因为备兑相当于为股票封顶，只要你做了备兑，那么股票再涨多少，都与你无关了。所以一旦发现正股要涨，你就要及时把备兑Call的仓位平掉。"
        ],
        [
          "Apprentice",
          "明白了。"
        ],
        [
          "Gamma",
          "期权组合远远不止我们聊过的这几个。你到Moomoo App上面，选择一只股票，在“期权”这一栏目下面，选择“策略构建”，里面就有各种各样的策略，你可以对着这些组合研究一下。"
        ]
      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "如果你看涨标的，但想降低买入 Call 的成本，同时接受收益有上限，最常见的简单策略是：",
          "options": [
            "牛市看涨价差",
            "买入 Put",
            "卖出裸 Call",
            "买入跨式"
          ],
          "answer": 0,
          "explanation": "牛市看涨价差适合看涨、控成本、接受封顶收益。"
        },
        {
          "difficulty": "中",
          "question": "如果你已经持有正股，又担心股价下跌，最常见的保护型策略是：",
          "options": [
            "再买更多股票",
            "买入保护性 Put",
            "卖出裸 Put",
            "买入更多 Call"
          ],
          "answer": 1,
          "explanation": "Protective Put 可以给持仓“买保险”。"
        },
        {
          "difficulty": "高",
          "question": "如果你持有正股，同时卖出一张 Call 收取权利金，这个策略的最大的风险是：",
          "options": [
            "下跌风险完全消失",
            "上涨空间被封住一部分",
            "期权永远不会亏",
            "持股成本会立刻归零"
          ],
          "answer": 1,
          "explanation": "备兑 Call 能收权利金，但上涨收益会受限。"
        }
       ],
      "location": "风控大厅",
      "mapX": 72.0,
      "mapY": 27.0
    },
    {
      "id": 9,
      "key": "gamma",
      "title": "第九关：业绩期赌期权",
      "subtitle": "Earnings Season",
      "goddess": "Gamma",
      "theme": "risk",
      "background": "assets/img/fantasy/bg-ch9.jpg",
      "reward": "竞技场通行印",
      "summary": "财报期拼的不只是方向，还有幅度与隐波变化。",
      "dialogue": [
        [
          "Gamma",
          "这里是全城最令人兴奋、最有可能赚一笔、但也最容易亏钱的地方。"
        ],
        [
          "Apprentice",
          "听起来很刺激。"
        ],
        [
          "Master",
          "财报季最危险的地方，在于很多人以为只要猜对涨跌就够了。"
        ],
        [
          "Gamma",
          "没错。你不仅要猜对方向，还要猜对“涨多少、跌多少”，而且还要关注隐含波动率的变化。"
        ],
        [
          "Apprentice",
          "这么复杂。"
        ],
        [
          "Gamma",
          "是的。但你要想玩转业绩期，这些你都要搞清楚。"
        ],
        [
          "Gamma",
          "一般在业绩发布之前，期权市场会预期业绩发布之后的股价变化范围，这个就叫做EM（Expected Move）。那么当实际业绩出来之后，会有一个实际的价格变化，叫做AM（Actual Move）。"
        ],
        [
          "Apprentice",
          "那么实际AM与EM会是什么关系？"
        ],
        [
          "Gamma",
          "好问题。其实这个是没有规律的，要靠一些运气在里面。我只能告诉你，如果绩后的实际AM大于EM的范围，那么买期权赌业绩就会赚钱；相反如果AM无法突破EM的范围，那么买期权赌业绩就会亏钱。"
        ],
        [
          "Apprentice",
          "这不是盲盒吗。"
        ],
        [
          "Gamma",
          "是盲盒。但Moomoo App为你提供了好用的工具，帮你看过往赌盲盒的输赢情况。在Moomoo里面选中一只股票，点“期权”，然后点“业绩分析”，里面有一项是AM vs EM，在这里你就能看到过去N个季度买期权赌业绩的输赢分部。"
        ],
        [
          "Gamma",
          "如果一只股票AM超越EM的情况，在15次里面有8次以上，那就算是对买方相当友好的了。相反如果低于6次，则基本上等于买方地狱。"
        ],
        [
          "Apprentice",
          "好炫。"
        ],
        [
          "Gamma",
          "业绩前后隐含波动率的变化规律，你知道吗？能不能说说看？"
        ],
        [
          "Apprentice",
          "我觉得一般绩前IV会升高，绩后IV回落。"
        ],
        [
          "Gamma",
          "对！这也是对买期权赌业绩非常不友好的一点！就算你赌对了方向，如果幅度不够，追不回IV回落带来的损失，那你还是会亏钱。"
        ],
        [
          "Gamma",
          "一句话，久赌必输，做期权要讲方法策略，不是纯粹赌博！"
        ]
      ],
      "quiz": [
        {
          "difficulty": "低",
          "question": "财报前买入期权，财报后常见的一项风险是：",
          "options": [
            "利率永远不变",
            "隐含波动率大幅回落",
            "股票一定停牌",
            "合约自动翻倍"
          ],
          "answer": 1,
          "explanation": "这就是常说的 IV Crush。"
        },
        {
          "difficulty": "中",
          "question": "某股票财报前市场隐含的预期波动很大。你买入 Call 后，财报公布，股价只小涨一点。最可能发生的是：",
          "options": [
            "方向对了，期权一定大赚",
            "期权可能仍然亏钱",
            "期权一定不变",
            "期权必定翻十倍"
          ],
          "answer": 1,
          "explanation": "财报交易拼的不只是方向，还有幅度和隐波变化。"
        },
        {
          "difficulty": "高",
          "question": "对初学者来说，哪种业绩期做法更稳妥？",
          "options": [
            "重仓买入单边裸 Call",
            "满仓买入跨式",
            "用小仓位做确定风险的价差策略",
            "连续加仓摊平"
          ],
          "answer": 2,
          "explanation": "财报期波动大、隐波变化快，小仓位、定义风险更适合新手。"
        },
        {
          "difficulty": "高",
          "question": "设股票Y在业绩发布前股价为100，期权市场预期的价格变化（EM）是6%。那么绩后股价为以下哪个，买Call赌业绩的人才会赚到钱",
          "options": [
            "94",
            "100",
            "106",
            "110"
          ],
          "answer": 3,
          "explanation": "买方想要赚钱，必须AM需要大于EM，等于只能打和。"
        }
      ],
      "location": "业绩竞技场",
      "mapX": 50.0,
      "mapY": 11.0
    }
  ],
  "characters": [
    {
      "name": "Delta",
      "title": "方向女神",
      "personality": "热情、直爽、最容易相处，负责波动城的方向街。",
      "portrait": "assets/img/fantasy/delta-emblem.png",
      "avatar": "assets/img/fantasy/delta-avatar.png",
      "accent": "#ffb155"
    },
    {
      "name": "Theta",
      "title": "时间女神",
      "personality": "高冷、毒舌、有经验，掌管时间塔的所有倒计时。",
      "portrait": "assets/img/fantasy/theta-emblem.png",
      "accent": "#b992ff"
    },
    {
      "name": "Vega",
      "title": "波动女神",
      "personality": "好动、顽皮、爱捉弄人，负责波动集市里的情绪与热度。",
      "portrait": "assets/img/fantasy/vega-emblem.png",
      "archivePortrait": "assets/img/fantasy/vega-emblem.png",
      "accent": "#50dfff"
    },
    {
      "name": "Gamma",
      "title": "风控女神",
      "personality": "强势、霸道、掌控欲极强，坐镇风控大厅。",
      "portrait": "assets/img/fantasy/gamma-emblem.png",
      "accent": "#ff708e"
    },
    {
      "name": "Rho",
      "title": "价值女神",
      "personality": "文静、细致，是五姐妹里最安静的小妹。",
      "portrait": "assets/img/fantasy/rho-emblem.png",
      "accent": "#dce7ff"
    },
    {
      "name": "Master",
      "title": "导师",
      "personality": "学识渊博，戴眼镜，有耐心，把复杂的规则拆成能听懂的话。",
      "portrait": "assets/img/fantasy/master-emblem.png",
      "avatar": "assets/img/fantasy/master-avatar.png",
      "accent": "#cbd5e1"
    },
    {
      "name": "Apprentice",
      "title": "期权学徒",
      "personality": "好奇、冲动、容易上头，但愿意学，也会在犯错后成长。",
      "portrait": "assets/img/fantasy/apprentice-emblem.png",
      "avatar": "assets/img/fantasy/apprentice-avatar.png",
      "accent": "#8bf5c4"
    }
  ],
  "settings": {
    "typingSpeed": 18,
    "autoDelay": 1700
  }
};
