import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { Modifier } from "./Modifier";
import { makeRef, createRef } from "@motion-canvas/core/lib/utils";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SimpleSignal } from "@motion-canvas/core/lib/signals";
import { linear } from "@motion-canvas/core/lib/tweening";

export interface TerminalProps extends NodeProps {
  fontSize?: number;
  width?: any;
  height?: any;
}

export class Terminal extends Node {
  @initial(48)
  @signal()
  public declare readonly fontSize: SimpleSignal<number, this>;

  @initial(900)
  @signal()
  public declare readonly width: SimpleSignal<any, this>;

  @initial("100%")
  @signal()
  public declare readonly height: SimpleSignal<any, this>;

  private readonly terminalContainer = createRef<Rect>();

  private readonly outputContainer = createRef<Rect>();

  private readonly modifierContainer = createRef<Rect>();
  private readonly modifiersRowOne = createRef<Rect>();
  private readonly modifiersRowTwo = createRef<Rect>();
  private readonly modifierSHIFT = createRef<Modifier>();
  private readonly modifierCTRL = createRef<Modifier>();
  private readonly modifierALT = createRef<Modifier>();
  private readonly modifierGUI = createRef<Modifier>();

  protected lines: Array<Txt> = [];

  public constructor(props?: TerminalProps) {
    super({ ...props });

    this.add(
      <Rect
        ref={this.terminalContainer}
        layout
        offset={[-1, -1]}
        width={this.width}
        height={this.height}
        direction={"column"}
        justifyContent={"end"}
        fill={"rgb(41,45,62)"}
        padding={32}
      >
        <Rect
          ref={this.outputContainer}
          layout
          grow={1}
          padding={32}
          paddingTop={120}
          direction={"column"}
        />

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
      </Rect>
    );
  }

  public *newLine() {
    const textRef = makeRef(this.lines, this.lines.length);
    const output = this.children()[0].children()[0];
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
