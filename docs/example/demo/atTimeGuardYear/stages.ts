import { createCard, createRandomCards } from './card';
import { Desk, initDesk } from './desk';
import { cloneDeep, random } from 'lodash-es';


// 模板字符串tag方法
function valueTag(strings: TemplateStringsArray, ...keys: any[]): string {
  let result = [strings[0]];
  keys.forEach((key, i) => {
    result.push(key, strings[i + 1]);
  });
  return result.join('');
}

// 延时函数
function delay(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

// 交互描述符
export interface InteractiveDescriptor {
  type: 'radio' | 'number' | 'none';
  title: string;
  payload: any;
  isDoIt: boolean,
  getOperation(interactive?: any): any;
  getDesc?: string;
  value?: number,
  desc?: string;
}

// 步骤顺序
export class StageContext {
  public stages: Stage[];
  public currentIndex = 0;
  public desk: Desk = initDesk();
  constructor(public animationDuration: number) {
    this.stages = [
      new InitialStage(this),
      new ShuffleStage(this),
      new TearStage(this),
      new ConcatStage(this),
      new NameStage(this),
      new TakeThreeCardsToMiddle(this),
      new ConcealStage(this),
      new LocationChooseStage(this),
      new SexChooseStage(this),
      new SevenWordsSpellStage(this),
      new KeepOneStage(this),
    ];
  }
  get hasPrev() {
    return this.currentIndex > 0;
  }
  get hasNext() {
    return this.currentIndex < this.stages.length - 1;
  }
  get currentStage() {
    return this.stages[this.currentIndex];
  }
  // 获取当前交互描述内容
  getInteractiveDescriptor() {
    return this.currentStage.getInteractiveDescriptor();
  }
  // 执型动作
  async play(options?: any) {
    await this.currentStage.play(options);
  }
  undo() {
    this.currentStage.undo();
  }
  // 获取当前是否已经交互过
  hasGetInteractiveDescriptor() {
    return this.currentStage.isInteractiveDescriptor;
  }
  next() {
    if (this.hasNext) {
      this.currentIndex++;
    }
  }
  prev() {
    if (this.hasPrev) {
      this.currentIndex--;
    }
  }
}

export abstract class Stage {
  // 是否已经交互过判定
  private hasGetInteractiveDescriptor = false;
  // 初始状态
  private initialDesk: Desk | null = null;
  // 结束状态
  private playedDesk: Desk | null = null;
  // 交互描述默认内容
  protected defaultDescriptor: InteractiveDescriptor = {
    type: 'none',
    title: '',
    payload: null,
    getOperation: () => void 0,
    getDesc: '',
    isDoIt: false
  };
  constructor(public ctx: StageContext, public name: string) { }
  // 获取交互描述内容 带缓存
  getInteractiveDescriptor(): InteractiveDescriptor {
    if (this.hasGetInteractiveDescriptor) {
      return this.defaultDescriptor;
    }
    const desc = this._getInteractiveDescriptor();
    this.hasGetInteractiveDescriptor = true;
    return desc;
  }
  // 用于子级重写方法
  _getInteractiveDescriptor(): InteractiveDescriptor {
    return this.defaultDescriptor;
  }
  // 获取是否已经交互过
  get isInteractiveDescriptor() {
    return this.hasGetInteractiveDescriptor;
  }
  // 定义抽象方法 泳衣继承重写
  abstract _play(options: any): Promise<void> | void;
  async play(options: any): Promise<void> {
    if (!this.initialDesk) {
      this.initialDesk = cloneDeep(this.ctx.desk);
    }
    if (this.playedDesk) {
      this.ctx.desk = cloneDeep(this.playedDesk);
      return;
    }
    await this._play(options);
    this.playedDesk = cloneDeep(this.ctx.desk);
    return;
  }
  undo(): void {
    if (this.initialDesk) {
      this.ctx.desk = cloneDeep(this.initialDesk);
    }
  }
}

// 1/11 选牌
class InitialStage extends Stage {
  _play() {
    this.ctx.desk.line1Cards = createRandomCards(4);
  }
  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      ...this.defaultDescriptor,
      title: "随机选取 <strong>4张扑克牌</strong> "
    }
    return this.defaultDescriptor
  }
  constructor(ctx: StageContext) {
    super(ctx, '选牌');
  }
}

// 2/11 选牌
class ShuffleStage extends Stage {
  _play() {
    for (let i = this.ctx.desk.line1Cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [this.ctx.desk.line1Cards[i], this.ctx.desk.line1Cards[j]] = [
        this.ctx.desk.line1Cards[j],
        this.ctx.desk.line1Cards[i],
      ];
    }
  }

  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      ...this.defaultDescriptor,
      title: "将扑克牌 <strong>随机打乱</strong>"
    }
    return this.defaultDescriptor
  }


  constructor(ctx: StageContext) {
    super(ctx, '洗牌');
  }
}
// 3/11 撕牌
class TearStage extends Stage {
  _play() {
    for (const card of this.ctx.desk.line1Cards) {
      card.tear = 'keep-top';
      this.ctx.desk.line2Cards.push(createCard(card.value, 'keep-bottom'));
    }
  }

  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      ...this.defaultDescriptor,
      title: "将扑克牌 <strong>撕成两份</strong>"
    }
    return this.defaultDescriptor
  }

  constructor(ctx: StageContext) {
    super(ctx, '撕牌');
  }

  public undo() {
    this.ctx.desk.line2Cards = [];
    setTimeout(() => {
      super.undo();
    }, this.ctx.animationDuration);
  }
}
// 4/11 拼牌
class ConcatStage extends Stage {
  _play() {
    this.ctx.desk.line1Cards = [
      ...this.ctx.desk.line1Cards,
      ...this.ctx.desk.line2Cards,
    ];
    this.ctx.desk.line2Cards = [];
  }

  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      ...this.defaultDescriptor,
      title: "将扑克牌 <strong>并叠在一起</strong>"
    }
    return this.defaultDescriptor
  }

  constructor(ctx: StageContext) {
    super(ctx, '拼牌');
  }
}

// 将牌放到牌堆底部
class TakeCardsToTail extends Stage {
  async _play(takeNumber: number) {
    for (let i = 0; i < takeNumber; i++) {
      this.beforeCardChange();
      const [head, ...rest] = this.ctx.desk.line1Cards;
      this.ctx.desk.line1Cards = [...rest, head];
      await delay(this.ctx.animationDuration);
    }
    this.afterChange();
  }

  beforeCardChange() { }
  afterChange() { }
}
// 5/11 按姓名字数洗牌
class NameStage extends TakeCardsToTail {
  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      title: '你的姓名有几个字？',
      type: 'number',
      payload: {
        defaultValue: 3,
        min: 1,
        max: 10,
      },
      isDoIt: false,
      getOperation: function* () {
        let value: number
        value = yield
        this.value = value
        this.isDoIt = true
        this.getDesc = valueTag`填写的，名字 <strong>长度为${this.value}</strong> ，取 <em>${this.value}张牌</em> 放置到牌堆底部`
        return value
      },
    }
    return this.defaultDescriptor;
  }
  constructor(ctx: StageContext) {
    super(ctx, '按姓名字数洗牌');
  }
}

// 将牌放到牌堆中间
abstract class InsertStage extends Stage {
  _play(takeNumber: number) {
    const cards = this.ctx.desk.line1Cards;
    if (takeNumber > cards.length - 2 || takeNumber <= 0) {
      return;
    }
    const insertFromTopNumber = random(1, cards.length - takeNumber - 1);
    const lastChangeIndex = takeNumber + insertFromTopNumber - 1;
    for (let i = takeNumber; i <= lastChangeIndex; i++) {
      for (let j = i, k = 0; k < takeNumber; k++, j--) {
        // 交换j和j-1
        [cards[j], cards[j - 1]] = [cards[j - 1], cards[j]];
      }
    }
  }
}
// 6/11 取三张放中间
class TakeThreeCardsToMiddle extends InsertStage {
  constructor(ctx: StageContext) {
    super(ctx, '取三张放中间');
  }
  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      ...this.defaultDescriptor,
      title: "将 <strong>前三张牌</strong> 放在 <strong>牌堆中间</strong> ",
      getOperation: () => 3,
    };
    return this.defaultDescriptor;
  }
}
// 7/11 藏牌
class ConcealStage extends Stage {
  _play() {
    this.ctx.desk.concealCard = this.ctx.desk.line1Cards.shift()!;
  }

  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      ...this.defaultDescriptor,
      title: "取出 <strong>牌堆顶的牌</strong> ，<strong>放置一旁</strong>",
    };
    return this.defaultDescriptor;
  }

  constructor(ctx: StageContext) {
    super(ctx, '藏牌');
  }
}
// 8/11 地域选择
class LocationChooseStage extends InsertStage {
  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      title: '请选择你的地域',
      type: 'radio',
      payload: {
        defaultValue: 1,
        options: [
          { label: '南方人', value: 1 },
          { label: '北方人', value: 2 },
          { label: '不清楚', value: 3 },
        ],
      },
      isDoIt: false,
      getOperation: function* () {
        let value: number
        this.value = value = yield
        this.isDoIt = true
        this.getDesc = valueTag`<strong>${this.payload.options.find((item: any) => this.value === item.value).label}</strong> ，取 <em>${this.value}</em> 张牌插入 <em>牌堆中间</em> `
        return value
      }
    };
    return this.defaultDescriptor;
  }
  constructor(ctx: StageContext) {
    super(ctx, '地域选择');
  }
}

// 丢牌
class ThrowHeadCardsStage extends Stage {
  async _play(takeNumber: number) {
    for (let i = 0; i < takeNumber; i++) {
      this.ctx.desk.line1Cards.shift();
      await delay(this.ctx.animationDuration);
    }
  }
}
// 9/11 性别选择
class SexChooseStage extends ThrowHeadCardsStage {
  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      title: '请选择你的性别',
      type: 'radio',
      payload: {
        defaultValue: 1,
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
      isDoIt: false,
      getOperation: function* () {
        let value: number
        this.value = value = yield
        this.isDoIt = true
        this.getDesc = valueTag` <strong>${this.payload.options.find((item: any) => this.value === item.value).label}生</strong> ，<em>丢弃牌堆顶 ${this.value}</em> 张牌`
        return value
      }
    };
    return this.defaultDescriptor;
  }
  constructor(ctx: StageContext) {
    super(ctx, '性别选择');
  }
}
// 10/11 见证奇迹的时刻
class SevenWordsSpellStage extends TakeCardsToTail {
  private words: string;
  private currentIndex = 0;
  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      ...this.defaultDescriptor,
      title: "念出 <strong>“见证奇迹的时刻”</strong> 7个字，<br/> 每念一个字，就 <em>取牌堆顶一张牌放置在牌堆底</em>",
      getOperation: () => 7,
    };
    return this.defaultDescriptor;
  }
  beforeCardChange(): void {
    this.name = this.words[this.currentIndex++];
  }
  afterChange(): void {
    this.currentIndex = 0;
    this.name = this.words;
  }
  constructor(ctx: StageContext) {
    super(ctx, '见证奇迹的时刻');
    this.words = this.name;
  }
}
// 11/11 好运留下来，烦恼丢出去
class KeepOneStage extends Stage {
  private words: string[];
  async _play() {
    const stages = [this.takeStage, this.throwStage];
    let i = 0;
    let oldDuration = this.ctx.animationDuration;
    this.ctx.animationDuration *= 2;
    let wordsIndex = 0;
    while (this.ctx.desk.line1Cards.length > 1) {
      const stage = stages[i++ % stages.length];
      this.name = this.words[wordsIndex++ % this.words.length];
      await stage._play(1);
    }
    this.ctx.desk.meet = [
      this.ctx.desk.line1Cards[0],
      this.ctx.desk.concealCard!,
    ];
    this.ctx.desk.concealCard = null;
    this.ctx.desk.line1Cards = [];
    this.ctx.animationDuration = oldDuration;
    this.name = this.words.join('，');
  }

  _getInteractiveDescriptor(): InteractiveDescriptor {
    this.defaultDescriptor = {
      ...this.defaultDescriptor,
      title: "重复 <strong>“好运留下来,烦恼扔出去”</strong> , 从牌堆顶开始，<br/> “好运留下来” 将 <em>牌堆顶的一张牌放在牌堆底</em>，<br/> “烦恼扔出去”  <em>扔掉牌堆顶的一张牌</em>，<br/> <strong>重复以上操作</strong>直到<em>只剩一张牌</em>",
    }
    return this.defaultDescriptor;
  }

  private throwStage = new ThrowHeadCardsStage(this.ctx, '');
  private takeStage = new TakeCardsToTail(this.ctx, '');
  constructor(ctx: StageContext) {
    super(ctx, '好运留下来,烦恼丢出去');
    this.words = this.name.split(",")
  }
}
