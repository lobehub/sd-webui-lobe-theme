declare const onUiUpdate: (callback: () => void) => void
declare const onUiLoaded: (callback: () => void) => void
declare const onUiTabChange: (callback: () => void) => void
declare const switch_to_txt2img: () => void
declare const switch_to_img2img: () => void
interface Window {
  threedopenpose: {
    onResize: (width: number, height: number) => void
    onChangeCameraNear: (value: number) => void
    onChangeCameraFar: (value: number) => void
    onChangeCameraFocalLength: (value: number) => void
    onChangeHeadSize: (value: number) => void
    onChangeNoseToNeck: (value: number) => void
    onChangeShoulderWidth: (value: number) => void
    onChangeShoulderToHip: (value: number) => void
    onChangeArmLength: (value: number) => void
    onChangeForearm: (value: number) => void
    onChangeUpperArm: (value: number) => void
    onChangeHandSize: (value: number) => void
    onChangeHips: (value: number) => void
    onChangeLegLength: (value: number) => void
    onChangeThigh: (value: number) => void
    onChangeLowerLeg: (value: number) => void
    onChangeFootSize: (value: number) => void
    detectImage: () => void
    setBackground: () => void
    saveScene: () => void
    loadScene: () => void
    restoreLastSavedScene: () => void
    undo: () => void
    redo: () => void
    randomPose: () => void
    copyBodyZ: () => void
    copyBodyX: () => void
    removeBody: () => void
    onChangeMoveMode: (value: boolean) => void
    onChangeOnlyHand: (value: boolean) => void
    onChangeEnablePreview: (value: boolean) => void
    makeImages: () => void
    sendTxt2img: (
      pose_image: string | null,
      pose_target: string,
      depth_image: string | null,
      depth_target: string,
      normal_image: string | null,
      normal_target: string,
      canny_image: string | null,
      canny_target: string
    ) => void
    sendImg2img: (
      pose_image: string,
      pose_target: string,
      depth_image: string,
      depth_target: string,
      normal_image: string,
      normal_target: string,
      canny_image: string,
      canny_target: string
    ) => void
    downloadPoseImage: (image: string | null) => void
    downloadDepthImage: (image: string | null) => void
    downloadNormalImage: (image: string | null) => void
    downloadCannyImage: (image: string | null) => void
  }
}
