import { VieraKey } from 'panasonic-viera-ts';

const MenuFunctionButtons: Button[] = [
  { label: '録画一覧', key: VieraKey.reclist, icon: 'hdd' },
  { label: 'データ', key: VieraKey.data, icon: 'database' },
  { label: 'アプリ', key: VieraKey.apps, icon: 'puzzle-piece' },
  { label: 'メニュー', key: VieraKey.menu, icon: 'caret-square-down' },
  { label: 'サブメニュー', key: VieraKey.option, icon: 'caret-square-down' },
];

const MenuInputModeButtons: Button[] = [
  { label: 'テレビ', key: VieraKey.tv, icon: 'tv' },
  { label: 'ゲーム(HDMI1)', key: VieraKey.hdmi1, icon: 'gamepad' },
  { label: 'パソコン(HDMI2)', key: VieraKey.hdmi2, icon: 'keyboard' },
];

const NumberButtons: KeyButton[] = [
  { label: '1', key: VieraKey.num_1 },
  { label: '2', key: VieraKey.num_2 },
  { label: '3', key: VieraKey.num_3 },
  { label: '4', key: VieraKey.num_4 },
  { label: '5', key: VieraKey.num_5 },
  { label: '6', key: VieraKey.num_6 },
  { label: '7', key: VieraKey.num_7 },
  { label: '8', key: VieraKey.num_8 },
  { label: '9', key: VieraKey.num_9 },
  { label: '10', key: VieraKey.num_0 },
  { label: '11', key: VieraKey.num_11 },
  { label: '12', key: VieraKey.num_12 },
];

const CursorButtons: KeyButton[] = [
  { label: 'right', key: VieraKey.right },
  { label: 'down', key: VieraKey.down },
  { label: 'left', key: VieraKey.left },
  { label: 'up', key: VieraKey.up },
];

const NamedButtons: KeyButton[] = [
  { label: 'NHK 総合', key: VieraKey.num_1 },
  { label: 'NHK Eテレ', key: VieraKey.num_2 },
  { label: '群馬テレビ', key: VieraKey.num_3 },
  { label: '日テレ', key: VieraKey.num_4 },
  { label: 'テレビ朝日', key: VieraKey.num_5 },
  { label: 'TBS', key: VieraKey.num_6 },
  { label: 'テレビ東京', key: VieraKey.num_7 },
  { label: 'フジテレビ', key: VieraKey.num_8 },
];

const FooterButtons: Button[] = [
  { label: 'スキップ', icon: 'fast-backward', key: VieraKey.skip_prev },
  { label: 'スキップ', icon: 'fast-forward', key: VieraKey.skip_next },
  { label: '早戻し', icon: 'backward', key: VieraKey.rewind },
  { label: '早送り', icon: 'forward', key: VieraKey.fast_forward },
  { label: '30秒送り', icon: 'caret-square-right', key: VieraKey.thirty_second_skip },
  { label: '録画', icon: 'record-vinyl', key: VieraKey.record },
  { label: '停止', icon: 'stop-circle', key: VieraKey.stop },
  { label: '一時停止', icon: 'pause-circle', key: VieraKey.pause },
  { label: '再生', icon: 'play-circle', key: VieraKey.play },
  { label: '音声切替', icon: 'headphones', key: VieraKey.mpx },
];

interface KeyButton {
  label: string;
  key: VieraKey;
  icon?: string;
}

interface AppButton {
  label: string;
  productId: string;
  icon?: string;
}

type Button = KeyButton | AppButton;

export {
  KeyButton, AppButton, Button,
  MenuFunctionButtons, MenuInputModeButtons, FooterButtons,
  NumberButtons, NamedButtons, CursorButtons
};

