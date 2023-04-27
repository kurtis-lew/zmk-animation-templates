import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d/lib/components";
import {
  easeInOutCubic,
} from "@motion-canvas/core/lib/tweening";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import {
  createSignal,
  SignalValue,
  SimpleSignal,
} from "@motion-canvas/core/lib/signals";
import { createRef } from "@motion-canvas/core/lib/utils";

const KeySize = 200;
const KeyRadius = 10;
export const KeyBorderThickness = 10;
export const KeyTravel = 40;

export interface KeyProps extends NodeProps {
  binding?: SignalValue<string>;
  params?: SignalValue<string>;
}

export class Key extends Node {
  @initial("&kp")
  @signal()
  protected declare readonly binding: SimpleSignal<string, this>;

  @initial("")
  @signal()
  protected declare readonly params: SimpleSignal<string, this>;

  protected bindingText: SignalValue<string>;
  protected paramsText: SignalValue<string>;
  protected keyPosition = createSignal(0);

  protected container = createRef<Node>();
  protected body = createRef<Rect>();
  protected border = createRef<Rect>();
  protected fill = createRef<Rect>();
  protected bindingTextBox = createRef<Txt>();
  protected paramsTextBox = createRef<Txt>();
  protected shadow = createRef<Rect>();

  public constructor(props?: KeyProps) {
    super({ ...props });

    this.bindingText = this.binding();
    this.paramsText = this.params();

    this.add(
      <Node ref={this.container} y={-KeyTravel}>
        <Rect
          layout
          ref={this.body}
          direction={"column-reverse"}
          justifyContent={"end"}
          width={KeySize}
          height={KeySize}
          y={() => this.keyPosition()}
          fill={"#FFFFFF"}
          radius={KeyRadius}
          stroke={"#000000"}
          lineWidth={KeyBorderThickness}
          clip
        >
          <Rect ref={this.fill} grow={0} fill={"#FFFFFF"} />
          <Txt
            layout={false}
            ref={this.bindingTextBox}
            text={this.bindingText}
            fill={"#000000"}
            width={KeySize}
            padding={15}
            fontWeight={600}
            fontSize={32}
            fontFamily={"sans-serif"}
            y={-65}
          />
          <Txt
            layout={false}
            ref={this.paramsTextBox}
            text={this.paramsText}
            fill={"#000000"}
            width={KeySize}
            justifyContent={"center"}
            fontWeight={600}
            fontSize={32}
            fontFamily={"sans-serif"}
          />
          <Rect
            layout={false}
            ref={this.border}
            width={KeySize}
            height={KeySize}
            fill={"#FFFFFF00"}
            radius={KeyRadius}
            stroke={"#000000"}
            lineWidth={KeyBorderThickness}
          />
        </Rect>

        <Rect
          ref={this.shadow}
          width={KeySize}
          height={KeySize}
          y={KeyTravel}
          radius={KeyRadius}
          fill={"#000000"}
          stroke={"#000000"}
          lineWidth={KeyBorderThickness}
          zIndex={-1}
        />
      </Node>
    );
  }

  public *press(duration: number) {
    yield* this.body().position.y(KeyTravel, duration, easeInOutCubic);
  }

  public *release(duration: number) {
    yield* this.body().position.y(0, duration, easeInOutCubic);
  }
}
