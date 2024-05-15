import View from "@/components/themed/View";
import { StyleProp, ViewProps, ViewStyle } from "react-native";

export const BoxUnitMultiplier = 8;

export type BoxUnit = number;
export interface BoxProps {
  /**
   * Number that will be multiplied by the grid unit
   */
  px?: BoxUnit;
  py?: BoxUnit;
  pt?: BoxUnit;
  pl?: BoxUnit;
  pr?: BoxUnit;
  pb?: BoxUnit;

  my?: BoxUnit;
  mx?: BoxUnit;
  ml?: BoxUnit;
  mr?: BoxUnit;
  mt?: BoxUnit;
  mb?: BoxUnit;
  flex?: number;
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  safeAreaView?: boolean;
}

export const getBoxSpacing = ({
  px = 0,
  py = 0,
  pt = 0,
  pl = 0,
  pr = 0,
  pb = 0,

  mx = 0,
  my = 0,
  ml = 0,
  mr = 0,
  mt = 0,
  mb = 0,
}: BoxProps): StyleProp<ViewStyle> => {
  const Paddings =
    px || py
      ? {
          paddingVertical: py * BoxUnitMultiplier,
          paddingHorizontal: px * BoxUnitMultiplier,
        }
      : {
          paddingTop: pt * BoxUnitMultiplier,
          paddingRight: pr * BoxUnitMultiplier,
          paddingBottom: pb * BoxUnitMultiplier,
          paddingLeft: pl * BoxUnitMultiplier,
        };

  const Margins =
    mx || my
      ? {
          marginVertical: my * BoxUnitMultiplier,
          marginHorizontal: mx * BoxUnitMultiplier,
        }
      : {
          marginTop: mt * BoxUnitMultiplier,
          marginRight: mr * BoxUnitMultiplier,
          marginBottom: mb * BoxUnitMultiplier,
          marginLeft: ml * BoxUnitMultiplier,
        };

  return {
    ...Margins,
    ...Paddings,
  };
};

const Box = ({
  justifyContent,
  alignItems,
  style,
  children,
  flexDirection,
  flex,
  ...props
}: ViewProps & BoxProps) => {
  const computedStyles = [
    getBoxSpacing(props),
    { justifyContent, alignItems, flexDirection, flex },
    style,
  ];

  return (
    <View style={computedStyles} {...props}>
      {children}
    </View>
  );
};

export default Box;
