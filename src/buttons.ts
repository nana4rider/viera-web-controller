import { VieraKey } from 'panasonic-viera-ts';

const MenuFunctionButtons: Button[] = [
  { type: 'std', label: '録画一覧', key: VieraKey.reclist },
  { type: 'std', label: 'データ', key: VieraKey.data },
  { type: 'std', label: 'アプリ', key: VieraKey.apps },
  { type: 'std', label: 'メニュー', key: VieraKey.menu },
  { type: 'std', label: 'サブメニュー', key: VieraKey.option },
];

const MenuInputModeButtons: Button[] = [
  { type: 'std', label: 'テレビ', key: VieraKey.tv },
  { type: 'std', label: 'ゲーム(HDMI1)', key: VieraKey.hdmi1 },
  { type: 'std', label: 'パソコン(HDMI2)', key: VieraKey.hdmi2 },
];

const NumberButtons: KeyButton[] = [
  { type: 'std', label: '1', key: VieraKey.num_1 },
  { type: 'std', label: '2', key: VieraKey.num_2 },
  { type: 'std', label: '3', key: VieraKey.num_3 },
  { type: 'std', label: '4', key: VieraKey.num_4 },
  { type: 'std', label: '5', key: VieraKey.num_5 },
  { type: 'std', label: '6', key: VieraKey.num_6 },
  { type: 'std', label: '7', key: VieraKey.num_7 },
  { type: 'std', label: '8', key: VieraKey.num_8 },
  { type: 'std', label: '9', key: VieraKey.num_9 },
  { type: 'std', label: '10', key: VieraKey.num_0 },
  { type: 'std', label: '11', key: VieraKey.num_11 },
  { type: 'std', label: '12', key: VieraKey.num_12 },
];

const NamedButtons: Button[] = [
  { type: 'std', label: 'NHK 総合', key: VieraKey.num_1 },
  { type: 'std', label: 'NHK Eテレ', key: VieraKey.num_2 },
  { type: 'std', label: '群馬テレビ', key: VieraKey.num_3 },
  { type: 'std', label: '日テレ', key: VieraKey.num_4 },
  { type: 'std', label: 'テレビ朝日', key: VieraKey.num_5 },
  { type: 'std', label: 'TBS', key: VieraKey.num_6 },
  { type: 'std', label: 'テレビ東京', key: VieraKey.num_7 },
  { type: 'std', label: 'フジテレビ', key: VieraKey.num_8 },
  { type: 'app', label: 'Amazon', productId: '0010000100190002' },
  { type: 'app', label: 'YouTube', productId: '0070000200190001' },
  { type: 'app', label: 'TVer', productId: '0040002500000001' },
  { type: 'app', label: 'Hulu', productId: '0010000F00000002' },
];

const FooterButtons: Button[] = [
  { type: 'std', label: 'スキップ', icon: 'fast-backward', key: VieraKey.skip_prev },
  { type: 'std', label: 'スキップ', icon: 'fast-forward', key: VieraKey.skip_next },
  { type: 'std', label: '早戻し', icon: 'backward', key: VieraKey.rewind },
  { type: 'std', label: '早送り', icon: 'forward', key: VieraKey.fast_forward },
  { type: 'std', label: '30秒送り', icon: 'caret-square-right', key: VieraKey.thirty_second_skip },
  { type: 'std', label: '録画', icon: 'record-vinyl', key: VieraKey.record },
  { type: 'std', label: '停止', icon: 'stop-circle', key: VieraKey.stop },
  { type: 'std', label: '一時停止', icon: 'pause-circle', key: VieraKey.pause },
  { type: 'std', label: '再生', icon: 'play-circle', key: VieraKey.play },
  { type: 'std', label: '音声切替', icon: 'headphones', key: VieraKey.mpx },
];

interface KeyButton {
  type: 'std';
  label: string;
  key: VieraKey;
  icon?: string;
}

interface AppButton {
  type: 'app';
  label: string;
  productId: string;
  icon?: string;
}

type Button = KeyButton | AppButton;

export {
  KeyButton, AppButton, Button,
  MenuFunctionButtons, MenuInputModeButtons, NumberButtons, NamedButtons, FooterButtons
};
