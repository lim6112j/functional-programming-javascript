/**
 * run 'yarn run deco ./decorators/ts'
 * run 'node ./decoratos/ts'
 */

class Boat {
  color: string = "red";
  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }
  @testDecorator
  pilot(): void {
    console.log("swish");
  }
}

function testDecorator(target: any, key: string): void {
  console.log(target);
  console.log(key);
  target[key]();
}
