describe("ConsoleOutput", function() {
  var consoleOutput;

  beforeEach(function() {
    consoleOutput = new ConsoleOutput();
  });

  describe(".isXterm256ColorSequence", function() {
    describe("with valid xterm 256 color", function () {
      it("returns true", function () {
        expect(consoleOutput.isXterm256ColorSequence("38;5;120")).toBe(true);
      });
    });

    describe("with invalid xterm 256 color", function () {
      it("returns false", function () {
        expect(consoleOutput.isXterm256ColorSequence("35;5;120")).toBe(false);
      });
    });
  });

  describe("#toHtml", function() {
    it ("replaces escape sequence 0m with </span>", function () {
      consoleOutput.content = "\x1b\[0m";
      var htmlContent = consoleOutput.toHtml();
      expect(htmlContent).toEqual("</span>");
    });

    it ("replaces escape sequence 39m with </span>", function () {
      consoleOutput.content = "\x1b\[39m";
      var htmlContent = consoleOutput.toHtml();
      expect(htmlContent).toEqual("</span>");
    });

    describe("foreground color sequence replacement", function () {
      it("replaces escape sequence with black color", function () {
        consoleOutput.content = "\x1b\[30mmy black string";
        expectedHtml = '<span style="color: black">my black string';
        expect(consoleOutput.toHtml()).toEqual(expectedHtml);
      });
    });

    describe("background color sequence replacement", function () {
      it("replaces escape sequence with red background color", function () {
        consoleOutput.content = "\x1b\[41mmy text on red background";
        expectedHtml = '<span style="background-color: red">my text on red background';
        expect(consoleOutput.toHtml()).toEqual(expectedHtml);
      });
    });

    describe("foreground and background colors sequence replacement", function () {
      it("replaces escape sequence with red background color and white foreground color", function () {
        consoleOutput.content = "\x1b\[37;41mmy text on red background and white foreground";
        expectedHtml = '<span style="color: white; background-color: red">my text on red background and white foreground';
        expect(consoleOutput.toHtml()).toEqual(expectedHtml);
      });
    });

    describe("xterm 256 colors", function() {
      describe('foreground color sequence replacement', function() {
        it('replaces escape sequence 38;5;0 with black color', function () {
          consoleOutput.content = "\x1b\[38;5;0mmy black text";
          expect(consoleOutput.toHtml()).toEqual('<span style="color: #000000">my black text')
        });
      });

      describe('background color sequence replacement', function() {
        it('replaces escape sequence 48;5;0 with black background color', function () {
          consoleOutput.content = "\x1b\[48;5;0mmy text on black background";
          expect(consoleOutput.toHtml()).toEqual('<span style="background-color: #000000">my text on black background')
        });
      });
    });
  });
});
