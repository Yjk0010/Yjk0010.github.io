import { PropsType } from './PolygonScoreTypes';


function useConfig(ctx: CanvasRenderingContext2D, props: Required<PropsType>) {
  // 设置字体类型和大小
  const fontSize = 16;
  const fontFamily = 'PingFangSC-Regular, sans-serif';
  ctx.font = `${fontSize}px ${fontFamily}`;
  // 多行文字间隙
  const vGap = fontSize * 0.5; // 垂直间隙
  // 获取最长文字在画布中的宽度
  const maxTextWidth = props.scores.reduce((max, [text, score]) => {
    const textWidth = ctx.measureText(text).width;
    const scoreWidth = ctx.measureText(score.toString()).width;
    return Math.max(max, textWidth, scoreWidth);
  }, 0);
  // 获取多行文字的最大高度
  const maxTextHeight = fontSize * 2 + vGap;
  // 获取需要预留的文字空间
  const textSpace = Math.max(maxTextWidth, maxTextHeight);
  // 文字与内圆的间距
  const textPadding = 8;
  // 得到圆的半径
  const radius = ctx.canvas.width / 2 - textSpace - textPadding;
  // 线
  const lineWidth = 1;
  const lineColor = '#bdc4fc';
  // 背景
  const bgColor = '#a8b1ff';
  return {
    fontSize,
    fontFamily,
    radius,
    textPadding,
    lineWidth,
    lineColor,
    bgColor,
    vGap,
    maxTextHeight,
  };
}

function drawHelper(
  radius: number,
  sides: number,
  callback: (x: number, y: number, i: number) => void
) {
  const angle = (2 * Math.PI) / sides;
  for (let i = 0; i < sides; i++) {
    const x = radius * Math.sin(angle * i);
    const y = -radius * Math.cos(angle * i);
    callback(x, y, i);
  }
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  props: Required<PropsType>
) {
  const config = useConfig(ctx, props);
  const { width, height } = ctx.canvas;
  // 初始化画布
  ctx.translate(width / 2, height / 2);
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = config.lineWidth;
  ctx.fillStyle = config.bgColor;
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const { scores } = props;
  const sides = scores.length;

  // 画内部多边形
  ctx.beginPath();
  drawHelper(config.radius, sides, (x, y, i) => {
    const [_, score] = scores[i];
    const percent = score / props.maxScore;
    x = x * percent;
    y = y * percent;
    ctx.lineTo(x, y);
  });
  ctx.fill();

  // 画多边形外圈
  ctx.beginPath();
  ctx.moveTo(0, -config.radius);
  drawHelper(config.radius, sides, (x, y) => {
    ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.stroke();

  // 画连线
  drawHelper(config.radius, sides, (x, y) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  // 画文字
  drawHelper(config.radius + config.textPadding, sides, (x, y, i) => {
    const [text, score] = scores[i];
    const textWidth = ctx.measureText(text).width;
    const scoreWidth = ctx.measureText(score.toString()).width;
    const maxWidth = Math.max(textWidth, scoreWidth);
    const vGap = config.vGap; // 垂直间隙
    let firstLineX = x,
      firstLineY = y;
    let secondLineX = x,
      secondLineY = y;
    // 定义允许的误差
    const allowError = 0.1;
    if (Math.abs(x) < allowError) {
      firstLineX = x;
    } else if (x > 0) {
      firstLineX = secondLineX = x + maxWidth / 2;
    } else if (x < 0) {
      firstLineX = secondLineX = x - maxWidth / 2;
    }
    secondLineX = firstLineX;
    if (Math.abs(y) < allowError) {
      firstLineY = y - config.fontSize - vGap / 2;
    } else if (y > 0) {
      firstLineY = y;
    } else {
      firstLineY = y - config.fontSize * 2 - vGap;
    }
    secondLineY = firstLineY + config.fontSize + vGap;

    ctx.fillText(text, firstLineX, firstLineY);
    ctx.fillText(score.toString(), secondLineX, secondLineY);
  });
}

export function draw(cvs: HTMLCanvasElement, props: Required<PropsType>) {
  const ctx = cvs.getContext('2d')!;
  const { width, height } = cvs;
  ctx.save();
  // 清空画布
  ctx.clearRect(0, 0, width, height);
  // 画
  drawPolygon(ctx, props);
  ctx.restore();
}
