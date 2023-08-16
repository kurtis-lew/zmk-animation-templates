import { Rect, RectProps, Txt } from "@motion-canvas/2d/lib/components";
import { Modifier } from "./Modifier";
import { makeRef, createRef } from "@motion-canvas/core/lib/utils";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { Length } from "@motion-canvas/2d/src/partials";
import { linear } from "@motion-canvas/core/lib/tweening";

export interface TerminalProps extends RectProps {
  fontSize?: number;
  width: SignalValue<Length>;
  height: SignalValue<Length>;
}

export class Terminal extends Rect {
  @initial(48)
  @signal()
  public declare readonly fontSize: SimpleSignal<number, this>;

  private readonly outputContainer = createRef<Rect>();

  private readonly modifierContainer = createRef<Rect>();
  private readonly modifiersRowOne = createRef<Rect>();
  private readonly modifiersRowTwo = createRef<Rect>();
  public readonly modifierSHIFT = createRef<Modifier>();
  public readonly modifierCTRL = createRef<Modifier>();
  public readonly modifierALT = createRef<Modifier>();
  public readonly modifierGUI = createRef<Modifier>();

  protected lines: Array<Txt> = [];

  public constructor(props?: TerminalProps) {
    super({
      layout: true,
      offset: [-1, -1],
      direction: "column",
      justifyContent: "end",
      fill: "rgb(41,45,62)",
      padding: 32,
      ...props,
    });

    this.add(
      <Rect
        ref={this.outputContainer}
        layout
        grow={1}
        padding={32}
        paddingTop={120}
        direction={"column"}
      />
    );
    this.add(
      <Rect ref={this.modifierContainer} layout direction={"column"}>
        <Rect
          ref={this.modifiersRowOne}
          layout
          width={"100%"}
          direction={"row"}
        >
          <Modifier ref={this.modifierSHIFT} modifier={"SHIFT"} />
          <Modifier ref={this.modifierALT} modifier={"ALT"} />
        </Rect>
        <Rect
          ref={this.modifiersRowTwo}
          layout
          width={"100%"}
          direction={"row"}
        >
          <Modifier ref={this.modifierCTRL} modifier={"CTRL"} />
          <Modifier ref={this.modifierGUI} modifier={"GUI"} />
        </Rect>
      </Rect>
    );
  }

  public *newLine() {
    const textRef = makeRef(this.lines, this.lines.length);
    const output = this.children()[0];
    output.add(
      <Txt
        ref={textRef}
        fill={"#BFC7D5"}
        fontFamily={"monospace"}
        fontSize={this.fontSize()}
        height={this.fontSize() * (4 / 3)}
      />
    );
  }

  public *type(index: number, value: string, typingSpeed: number) {
    const newText = this.lines[index - 1].text() + value;
    yield* this.lines[index - 1].text(
      newText,
      typingSpeed * value.length,
      linear
    );
  }

  public *backspace(index: number, number: number, typingSpeed: number) {
    const newText = this.lines[index - 1].text().slice(0, -number);
    yield* this.lines[index - 1].text(newText, typingSpeed * number, linear);
  }
}
