import { expose } from "comlink";
import Matercolor from "matercolors";

class WorkerThread {
  generatePalette(hexColor) {
    const colors = new Matercolor(hexColor);

    const primaryIndex = Object.entries(colors.palette.primary)
      .slice(1, 10)
      .reverse()
      .findIndex(([index, value]) => hexColor === value);

    return {
      palette: colors.palette,
      primaryIndex,
      complementaryPrimaryColor: colors.complementary(),
      analogousPrimaryColor: [
        colors.firstAnalogous(),
        colors.secondAnalogous(),
      ],
      triadicPrimaryColor: [
        colors.firstTriadic(),
        colors.secondTriadic()
      ]
    }
  }
}

expose(new WorkerThread());