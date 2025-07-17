export type IconsId =
    | 'admin-function'
    | 'alert'
    | 'close'
    | 'copy-success'
    | 'copy'
    | 'delete'
    | 'double-file'
    | 'double-left'
    | 'email'
    | 'export'
    | 'file'
    | 'import'
    | 'left-arrow'
    | 'left'
    | 'lock'
    | 'logo'
    | 'logout'
    | 'menu-expand'
    | 'menu'
    | 'pen-off'
    | 'pen'
    | 'right'
    | 'role'
    | 'setting'
    | 'sort-down'
    | 'sort-up'
    | 'user';

export type IconsKey =
    | 'AdminFunction'
    | 'Alert'
    | 'Close'
    | 'CopySuccess'
    | 'Copy'
    | 'Delete'
    | 'DoubleFile'
    | 'DoubleLeft'
    | 'Email'
    | 'Export'
    | 'File'
    | 'Import'
    | 'LeftArrow'
    | 'Left'
    | 'Lock'
    | 'Logo'
    | 'Logout'
    | 'MenuExpand'
    | 'Menu'
    | 'PenOff'
    | 'Pen'
    | 'Right'
    | 'Role'
    | 'Setting'
    | 'SortDown'
    | 'SortUp'
    | 'User';

export enum Icons {
    AdminFunction = 'admin-function',
    Alert = 'alert',
    Close = 'close',
    CopySuccess = 'copy-success',
    Copy = 'copy',
    Delete = 'delete',
    DoubleFile = 'double-file',
    DoubleLeft = 'double-left',
    Email = 'email',
    Export = 'export',
    File = 'file',
    Import = 'import',
    LeftArrow = 'left-arrow',
    Left = 'left',
    Lock = 'lock',
    Logo = 'logo',
    Logout = 'logout',
    MenuExpand = 'menu-expand',
    Menu = 'menu',
    PenOff = 'pen-off',
    Pen = 'pen',
    Right = 'right',
    Role = 'role',
    Setting = 'setting',
    SortDown = 'sort-down',
    SortUp = 'sort-up',
    User = 'user',
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
    [Icons.AdminFunction]: '61697',
    [Icons.Alert]: '61698',
    [Icons.Close]: '61699',
    [Icons.CopySuccess]: '61700',
    [Icons.Copy]: '61701',
    [Icons.Delete]: '61702',
    [Icons.DoubleFile]: '61703',
    [Icons.DoubleLeft]: '61704',
    [Icons.Email]: '61705',
    [Icons.Export]: '61706',
    [Icons.File]: '61707',
    [Icons.Import]: '61708',
    [Icons.LeftArrow]: '61709',
    [Icons.Left]: '61710',
    [Icons.Lock]: '61711',
    [Icons.Logo]: '61712',
    [Icons.Logout]: '61713',
    [Icons.MenuExpand]: '61714',
    [Icons.Menu]: '61715',
    [Icons.PenOff]: '61716',
    [Icons.Pen]: '61717',
    [Icons.Right]: '61718',
    [Icons.Role]: '61719',
    [Icons.Setting]: '61720',
    [Icons.SortDown]: '61721',
    [Icons.SortUp]: '61722',
    [Icons.User]: '61723',
};
