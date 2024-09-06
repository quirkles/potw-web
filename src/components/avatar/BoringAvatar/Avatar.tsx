import { PartialBy } from "@/utils/typeUtils";

import AvatarBauhaus from "./AvatarBauhaus";
import AvatarBeam from "./AvatarBeam";
import AvatarMarble from "./AvatarMarble";
import AvatarPixel from "./AvatarPixel";
import AvatarRing from "./AvatarRing";
import AvatarSunset from "./AvatarSunset";

const AVATAR_VARIANTS = {
  pixel: AvatarPixel,
  bauhaus: AvatarBauhaus,
  ring: AvatarRing,
  beam: AvatarBeam,
  sunset: AvatarSunset,
  marble: AvatarMarble,
} as const;

const DEPRECATED_VARIANTS = {
  geometric: "beam",
  abstract: "bauhaus",
} as const;

export interface AvatarProps {
  variant?: keyof typeof AVATAR_VARIANTS | keyof typeof DEPRECATED_VARIANTS;
  colors?: readonly string[];
  name?: string;
  square?: boolean;
  title?: boolean;
  size?: number;
}

export type VariantProps = PartialBy<
  Required<Omit<AvatarProps, "variant">>,
  "size"
>;

const DEFAULT_PROPS = {
  variant: "marble",
  colors: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
  name: "Clara Barton",
  square: false,
  title: false,
} as const;

export function BoringAvatar(props: AvatarProps) {
  const {
    variant = DEFAULT_PROPS.variant,
    colors = DEFAULT_PROPS.colors,
    name = DEFAULT_PROPS.name,
    square = DEFAULT_PROPS.square,
    title = DEFAULT_PROPS.title,
    size,
    ...otherProps
  } = props;

  const resolvedVariant =
    variant in DEPRECATED_VARIANTS
      ? DEPRECATED_VARIANTS[variant as keyof typeof DEPRECATED_VARIANTS]
      : variant;
  const AvatarComponent =
    AVATAR_VARIANTS[resolvedVariant as keyof typeof AVATAR_VARIANTS] ||
    AvatarMarble;

  return (
    <AvatarComponent
      colors={colors}
      name={name}
      title={title}
      size={size}
      square={square}
      {...otherProps}
    />
  );
}
