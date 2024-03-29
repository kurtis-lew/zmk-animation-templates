import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { easeInOutCubic } from "@motion-canvas/core/lib/tweening";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { createRef } from "@motion-canvas/core/lib/utils";

const KeySize = 256;
const KeyRadius = 16;
export const KeyBorderThickness = 8;
export const KeyTravel = 64;

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

  protected body = createRef<Rect>();
  protected border = createRef<Rect>();
  protected bindingTextBox = createRef<Txt>();
  protected paramsTextBox = createRef<Txt>();
  protected shadow = createRef<Rect>();

  public constructor(props?: KeyProps) {
    super({ ...props });

    this.add(
      <Rect
        layout
        ref={this.body}
        direction={"column-reverse"}
        justifyContent={"end"}
        width={KeySize}
        height={KeySize}
        fill={"#FFFFFF"}
        radius={KeyRadius}
        stroke={"#000000"}
        lineWidth={KeyBorderThickness}
        y={-KeyTravel}
        clip
      >
        <Txt
          layout={false}
          ref={this.bindingTextBox}
          text={this.binding}
          fill={"#000000"}
          width={KeySize}
          padding={15}
          fontSize={48}
          fontWeight={600}
          fontFamily={"sans-serif"}
          y={-80}
        />
        <Txt
          layout={false}
          ref={this.paramsTextBox}
          text={this.params}
          fill={"#000000"}
          width={KeySize}
          justifyContent={"center"}
          fontSize={48}
          fontWeight={600}
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
    );
    this.add(
      <Rect
        ref={this.shadow}
        width={KeySize}
        height={KeySize}
        radius={KeyRadius}
        fill={"#000000"}
        stroke={"#000000"}
        lineWidth={KeyBorderThickness}
        zIndex={-1}
      />
    );
  }

  public *press(duration: number) {
    yield* this.body().position.y(0, duration, easeInOutCubic);
  }

  public *release(duration: number) {
    yield* this.body().position.y(-KeyTravel, duration, easeInOutCubic);
  }
}
