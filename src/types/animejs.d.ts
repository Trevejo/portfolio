declare module "animejs" {
  interface AnimejsAnimatable {
    target: HTMLElement;
  }

  interface AnimejsInstance {
    targets: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | string;
  }

  interface AnimeTimelineParams {
    easing?: string;
    duration?: number;
    direction?: "normal" | "reverse" | "alternate";
    loop?: number | boolean;
    delay?: number;
  }

  interface AnimeAnimParams {
    targets: HTMLElement | HTMLElement[] | string;
    width?: number | string;
    height?: number | string;
    translateX?: number | string;
    translateY?: number | string;
    opacity?: number;
    duration?: number;
    delay?: number;
    easing?: string;
    begin?: (anim: AnimejsInstance) => void;
    complete?: (anim: AnimejsInstance) => void;
  }

  const anime: {
    timeline(params?: AnimeTimelineParams): {
      add(params: AnimeAnimParams): void;
    };
  };

  export default anime;
}
