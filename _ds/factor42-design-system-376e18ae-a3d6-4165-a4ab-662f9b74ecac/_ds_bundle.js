/* @ds-bundle: {"format":3,"namespace":"Factor42DesignSystem_376e18","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"StatCard","sourcePath":"components/core/StatCard.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"2eac918b7774","components/core/Badge.jsx":"598ab03dd670","components/core/Button.jsx":"ebf7f2888596","components/core/Card.jsx":"50f3cb110f6b","components/core/IconButton.jsx":"eb0db0f96fe3","components/core/Input.jsx":"ca995577f661","components/core/StatCard.jsx":"1369577601e4","components/core/Switch.jsx":"678fb2f68a69","components/core/Tabs.jsx":"92d5ba82ca6e","components/core/Tag.jsx":"8520bd885e45","ui_kits/platform/DashboardScreen.jsx":"f509bdab7b8e","ui_kits/platform/LandingScreen.jsx":"f82dd7b8335f","ui_kits/platform/LoginScreen.jsx":"30cbaf3adbc2","ui_kits/platform/kit.jsx":"6580ddbbdcdb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Factor42DesignSystem_376e18 = window.Factor42DesignSystem_376e18 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Circular avatar. Falls back to gradient + initials when no image. */
function Avatar({
  src,
  name = '',
  size = 40,
  style = {},
  ...rest
}) {
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--f42-gradient-icon)',
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: size * 0.4,
      flexShrink: 0,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status pill. Tonal blue by default; semantic + solid-gradient variants. */
function Badge({
  children,
  variant = 'blue',
  style = {},
  ...rest
}) {
  const variants = {
    blue: {
      background: 'var(--f42-blue-a12)',
      color: 'var(--f42-deep-blue)'
    },
    neutral: {
      background: 'var(--f42-slate-200)',
      color: 'var(--f42-slate-700)'
    },
    success: {
      background: 'rgba(31,138,91,0.12)',
      color: '#1f8a5b'
    },
    warning: {
      background: 'rgba(214,151,42,0.16)',
      color: '#b8791a'
    },
    danger: {
      background: 'rgba(224,65,76,0.12)',
      color: '#c8313c'
    },
    gradient: {
      background: 'var(--f42-gradient-blue)',
      color: '#fff'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.4,
      borderRadius: 'var(--radius-pill)',
      letterSpacing: '0.01em',
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Factor42 primary action. Gradient (primary) / solid blue (secondary) /
 * ghost / subtle variants, three sizes. Optional leading/trailing content.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: 14,
      height: 36
    },
    md: {
      padding: '11px 20px',
      fontSize: 15,
      height: 44
    },
    lg: {
      padding: '14px 26px',
      fontSize: 16,
      height: 52
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: 'var(--radius-button)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'var(--transition-base)',
    whiteSpace: 'nowrap',
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: 'var(--f42-gradient-button)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--shadow-button)'
    },
    secondary: {
      background: 'var(--f42-primary-blue)',
      color: 'var(--text-on-brand)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-accent)',
      border: '1px solid var(--border-subtle)'
    },
    subtle: {
      background: 'var(--f42-white)',
      color: 'var(--text-heading)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.98)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. `glass` = signature frosted card; `solid` = plain white. */
function Card({
  children,
  variant = 'solid',
  interactive = false,
  padding = 24,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    solid: {
      background: 'var(--f42-white)',
      border: '1px solid var(--border-subtle)'
    },
    glass: {
      background: 'var(--glass-bg)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      backdropFilter: 'var(--glass-blur)',
      border: 'var(--glass-border)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-card)',
      boxShadow: interactive && hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      transition: 'var(--transition-base)',
      padding,
      ...variants[variant],
      ...(interactive && hover ? {
        borderColor: 'var(--border-hover)'
      } : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square icon-only button. Matches Button styling at icon scale. */
function IconButton({
  children,
  variant = 'subtle',
  size = 'md',
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const dim = {
    sm: 36,
    md: 44,
    lg: 52
  }[size];
  const variants = {
    primary: {
      background: 'var(--f42-gradient-button)',
      color: '#fff',
      boxShadow: 'var(--shadow-button)',
      border: '1px solid transparent'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-accent)',
      border: '1px solid var(--border-subtle)'
    },
    subtle: {
      background: 'var(--f42-white)',
      color: 'var(--text-heading)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    style: {
      width: dim,
      height: dim,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-button)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'var(--transition-base)',
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with optional leading icon. Border brightens + glows on focus. */
function Input({
  icon = null,
  type = 'text',
  invalid = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      display: 'inline-flex',
      color: 'var(--text-placeholder)',
      pointerEvents: 'none'
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      width: '100%',
      boxSizing: 'border-box',
      height: 44,
      padding: icon ? '0 14px 0 40px' : '0 14px',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--text-heading)',
      background: 'var(--f42-white)',
      borderRadius: 'var(--radius-input)',
      border: `1px solid ${invalid ? '#e0414c' : focus ? 'var(--f42-primary-blue)' : 'var(--border-subtle)'}`,
      boxShadow: focus ? 'var(--shadow-glow)' : 'none',
      outline: 'none',
      transition: 'var(--transition-base)',
      ...style
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/StatCard.jsx
try { (() => {
/** Metric tile: label, big value, optional delta. For dashboards. */
function StatCard({
  label,
  value,
  delta,
  trend = 'up',
  icon = null,
  style = {}
}) {
  const positive = trend === 'up';
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    variant: "solid",
    padding: 20,
    style: {
      minWidth: 180,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-accent)',
      display: 'inline-flex'
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: 'var(--text-heading)',
      margin: '8px 0 4px',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      color: positive ? '#1f8a5b' : '#c8313c'
    }
  }, positive ? '▲' : '▼', " ", delta));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. Track fills with the blue gradient when on. */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 44,
      height: 26,
      borderRadius: 'var(--radius-pill)',
      border: 0,
      padding: 3,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      background: checked ? 'var(--f42-gradient-blue)' : 'var(--f42-slate-300)',
      transition: 'var(--transition-base)',
      display: 'inline-flex',
      alignItems: 'center',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(10,15,30,0.25)',
      transform: checked ? 'translateX(18px)' : 'translateX(0)',
      transition: 'var(--transition-base)'
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
/** Underline tab bar. Active tab gets gradient text + animated underline. */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      borderBottom: '1px solid var(--border-divider)',
      ...style
    }
  }, tabs.map(t => {
    const id = typeof t === 'string' ? t : t.id;
    const label = typeof t === 'string' ? t : t.label;
    const active = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      onClick: () => onChange && onChange(id),
      style: {
        position: 'relative',
        border: 0,
        background: 'none',
        cursor: 'pointer',
        padding: '0 0 12px',
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        fontWeight: active ? 700 : 500,
        color: active ? 'var(--f42-deep-blue)' : 'var(--text-muted)',
        transition: 'var(--transition-base)'
      }
    }, label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2.5,
        borderRadius: 2,
        background: active ? 'var(--f42-gradient-blue)' : 'transparent',
        transition: 'var(--transition-base)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Outlined keyword tag with optional removable affordance. */
function Tag({
  children,
  onRemove,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 10px',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)',
      background: 'var(--f42-white)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: onRemove,
    style: {
      display: 'inline-flex',
      border: 0,
      background: 'none',
      cursor: 'pointer',
      color: 'var(--text-placeholder)',
      padding: 0,
      fontSize: 14,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/platform/DashboardScreen.jsx
try { (() => {
/* global React, Icon, Wordmark */
// Factor42 in-app dashboard.

function DashboardScreen({
  onSignOut
}) {
  const {
    Button,
    IconButton,
    Input,
    Badge,
    Card,
    StatCard,
    Tabs,
    Avatar
  } = window.Factor42DesignSystem_376e18;
  const [nav, setNav] = React.useState('overview');
  const [tab, setTab] = React.useState('all');
  const navItems = [{
    id: 'overview',
    icon: 'layout-dashboard',
    label: 'Overview'
  }, {
    id: 'campaigns',
    icon: 'megaphone',
    label: 'Campaigns'
  }, {
    id: 'inventory',
    icon: 'layers',
    label: 'Inventory'
  }, {
    id: 'yield',
    icon: 'line-chart',
    label: 'Yield'
  }, {
    id: 'reports',
    icon: 'file-bar-chart',
    label: 'Reports'
  }];
  const rows = [{
    name: 'Q2 Brand Awareness',
    adv: 'Northstar',
    status: 'live',
    pacing: 102,
    imps: '2.4M',
    rev: '$48.2K'
  }, {
    name: 'Summer Retail Push',
    adv: 'Vela Goods',
    status: 'live',
    pacing: 96,
    imps: '1.8M',
    rev: '$31.7K'
  }, {
    name: 'App Install — APAC',
    adv: 'Orbit Mobile',
    status: 'paused',
    pacing: 0,
    imps: '912K',
    rev: '$12.4K'
  }, {
    name: 'Holiday Teaser',
    adv: 'Maison Lune',
    status: 'review',
    pacing: 0,
    imps: '—',
    rev: '$0'
  }, {
    name: 'B2B Lead Gen',
    adv: 'Cobalt SaaS',
    status: 'live',
    pacing: 88,
    imps: '640K',
    rev: '$22.9K'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100%',
      fontFamily: 'var(--font-body)',
      background: 'var(--f42-bg)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      padding: '22px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 8px 22px'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    height: 24
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, navItems.map(n => {
    const active = n.id === nav;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      type: "button",
      onClick: () => setNav(n.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 10,
        border: 0,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        background: active ? 'var(--f42-blue-a12)' : 'transparent',
        color: active ? 'var(--f42-deep-blue)' : 'var(--text-body)',
        fontFamily: 'var(--font-body)',
        fontSize: 14.5,
        fontWeight: active ? 700 : 500,
        transition: 'var(--transition-base)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 19,
      color: active ? 'var(--f42-primary-blue)' : 'var(--text-muted)'
    }), n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "solid",
    padding: 16,
    style: {
      background: 'var(--f42-bg)',
      boxShadow: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-heading)'
    }
  }, "Free trial"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-muted)',
      margin: '4px 0 12px'
    }
  }, "9 days left on Pro."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    style: {
      width: '100%'
    }
  }, "Upgrade")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSignOut,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 14,
      padding: '8px 12px',
      border: 0,
      background: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontSize: 14,
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 17,
    color: "var(--text-muted)"
  }), " Sign out"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '16px 32px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(255,255,255,0.7)',
      WebkitBackdropFilter: 'blur(12px)',
      backdropFilter: 'blur(12px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    }),
    placeholder: "Search campaigns, advertisers\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Notifications",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Help",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "help-circle",
    size: 18
  })), /*#__PURE__*/React.createElement(Avatar, {
    name: "Maya Ortiz",
    size: 38
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '28px 32px',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: 'var(--text-heading)',
      margin: 0
    }
  }, "Overview"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--text-muted)',
      margin: '6px 0 0'
    }
  }, "Performance across all active campaigns.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "subtle",
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 16
    })
  }, "Last 7 days"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16,
      color: "#fff"
    })
  }, "New campaign"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Impressions",
    value: "10.2M",
    delta: "12% vs last week",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      size: 18,
      color: "var(--f42-primary-blue)"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Revenue",
    value: "$248K",
    delta: "8% vs last week",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "dollar-sign",
      size: 18,
      color: "var(--f42-primary-blue)"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Fill rate",
    value: "94.2%",
    delta: "0.8% vs last week",
    trend: "down",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "activity",
      size: 18,
      color: "var(--f42-primary-blue)"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "eCPM",
    value: "$3.41",
    delta: "3% vs last week",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "trending-up",
      size: 18,
      color: "var(--f42-primary-blue)"
    })
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "solid",
    padding: 24,
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--text-heading)',
      margin: 0
    }
  }, "Delivery throughput"), /*#__PURE__*/React.createElement(Badge, {
    variant: "blue"
  }, "Real-time")), /*#__PURE__*/React.createElement(BigChart, null)), /*#__PURE__*/React.createElement(Card, {
    variant: "solid",
    padding: 0,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: 'all',
      label: 'All campaigns'
    }, {
      id: 'live',
      label: 'Live'
    }, {
      id: 'review',
      label: 'In review'
    }],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Campaign', 'Advertiser', 'Status', 'Pacing', 'Impressions', 'Revenue'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: h === 'Pacing' || h === 'Impressions' || h === 'Revenue' ? 'right' : 'left',
      padding: '14px 24px',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border-divider)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.name,
    style: {
      borderBottom: '1px solid var(--border-divider)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 24px',
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, r.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 24px',
      color: 'var(--text-body)'
    }
  }, r.adv), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 24px'
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    Badge: Badge,
    status: r.status
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 24px',
      textAlign: 'right',
      color: 'var(--text-body)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, r.pacing ? `${r.pacing}%` : '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 24px',
      textAlign: 'right',
      color: 'var(--text-body)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, r.imps), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 24px',
      textAlign: 'right',
      fontWeight: 700,
      color: 'var(--text-heading)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, r.rev)))))))));
}
function StatusBadge({
  Badge,
  status
}) {
  const map = {
    live: ['success', '● Live'],
    paused: ['warning', '❚❚ Paused'],
    review: ['neutral', 'In review']
  };
  const [v, label] = map[status] || ['neutral', status];
  return /*#__PURE__*/React.createElement(Badge, {
    variant: v
  }, label);
}
function BigChart() {
  const data = [54, 62, 48, 71, 65, 80, 73, 88, 79, 94, 86, 97];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      height: 150
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${d}%`,
      borderRadius: '6px 6px 0 0',
      background: i >= data.length - 2 ? 'var(--f42-gradient-blue)' : 'var(--f42-blue-a30)'
    }
  }))));
}
Object.assign(window, {
  DashboardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/platform/LandingScreen.jsx
try { (() => {
/* global React, Icon, GridBg, Wordmark */
// Factor42 marketing landing page.

function LandingScreen({
  onGetStarted
}) {
  const {
    Button,
    Card,
    Badge,
    StatCard
  } = window.Factor42DesignSystem_376e18;
  const nav = ['Platform', 'Solutions', 'Pricing', 'Docs'];
  const features = [{
    icon: 'gauge',
    title: 'Unified operations',
    body: 'Run, optimize, and reconcile every campaign from one operations layer.'
  }, {
    icon: 'workflow',
    title: 'Automation engine',
    body: 'Rules and pacing that act in real time so your team works on strategy, not busywork.'
  }, {
    icon: 'line-chart',
    title: 'Yield intelligence',
    body: 'Forecasting and fill optimization that lift revenue across all your demand.'
  }];
  return /*#__PURE__*/React.createElement(GridBg, {
    style: {
      minHeight: '100%',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      padding: '16px 40px',
      background: 'rgba(240,244,255,0.72)',
      WebkitBackdropFilter: 'blur(12px)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    height: 26
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 26,
      marginLeft: 16
    }
  }, nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-body)',
      textDecoration: 'none'
    }
  }, n))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: onGetStarted
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 15,
      color: "#fff"
    }),
    onClick: onGetStarted
  }, "Book a demo"))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '72px 40px 40px',
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Ad ops at scale"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 60,
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.04,
      color: 'var(--text-heading)',
      margin: '18px 0 0'
    }
  }, "The operations layer", /*#__PURE__*/React.createElement("br", null), "for ad teams that", /*#__PURE__*/React.createElement("br", null), "ship at ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--f42-gradient-blue)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  }, "scale.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 480,
      margin: '22px 0 30px'
    }
  }, "Factor42 unifies trafficking, pacing, and yield into one workspace \u2014 so every campaign runs clean and every dollar is reconciled."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 17,
      color: "#fff"
    }),
    onClick: onGetStarted
  }, "Get started"), /*#__PURE__*/React.createElement(Button, {
    variant: "subtle",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      size: 16
    })
  }, "Watch demo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    n: "10.2M",
    l: "impressions/day"
  }), /*#__PURE__*/React.createElement(Stat, {
    n: "42%",
    l: "faster trafficking"
  }), /*#__PURE__*/React.createElement(Stat, {
    n: "99.9%",
    l: "reconciliation"
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    padding: 20,
    style: {
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--text-heading)'
    }
  }, "Live throughput"), /*#__PURE__*/React.createElement(Badge, {
    variant: "success"
  }, "\u25CF Live")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Active",
    value: "1,284",
    delta: "8% today",
    trend: "up"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Fill",
    value: "94.2%",
    delta: "1.1%",
    trend: "up"
  })), /*#__PURE__*/React.createElement(MiniChart, null))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '40px 40px 88px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, features.map(f => /*#__PURE__*/React.createElement(Card, {
    key: f.title,
    variant: "solid",
    interactive: true,
    padding: 26
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 12,
      background: 'var(--f42-blue-a12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 22,
    color: "var(--f42-primary-blue)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--text-heading)',
      margin: '0 0 8px',
      letterSpacing: '-0.01em'
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: 0
    }
  }, f.body))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 40px 88px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      background: 'var(--f42-gradient-brand)',
      borderRadius: 24,
      padding: '56px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-glow)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 34,
      fontWeight: 800,
      color: '#fff',
      margin: 0,
      letterSpacing: '-0.02em'
    }
  }, "Ready to run ad ops at scale?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: 'rgba(255,255,255,0.82)',
      margin: '10px 0 0'
    }
  }, "See Factor42 on your own inventory in a 20-minute walkthrough.")), /*#__PURE__*/React.createElement(Button, {
    variant: "subtle",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 17
    }),
    onClick: onGetStarted
  }, "Book a demo"))));
  function Stat({
    n,
    l
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 26,
        fontWeight: 800,
        color: 'var(--text-heading)',
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums'
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, l));
  }
}
function MiniChart() {
  const bars = [42, 58, 49, 71, 64, 83, 76, 92, 88, 96];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6,
      height: 84,
      padding: '8px 4px 0'
    }
  }, bars.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${b}%`,
      borderRadius: 4,
      background: i === bars.length - 1 ? 'var(--f42-gradient-blue)' : 'var(--f42-blue-a30)'
    }
  })));
}
Object.assign(window, {
  LandingScreen,
  MiniChart
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/LandingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/platform/LoginScreen.jsx
try { (() => {
/* global React, Icon, GridBg, Wordmark, IconMark */
// Factor42 sign-in screen.

function LoginScreen({
  onSignIn,
  onBack
}) {
  const {
    Button,
    Input
  } = window.Factor42DesignSystem_376e18;
  const [email, setEmail] = React.useState('maya@northstar.media');
  const [pw, setPw] = React.useState('demo1234');
  return /*#__PURE__*/React.createElement(GridBg, {
    style: {
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: 880,
      maxWidth: '100%',
      borderRadius: 24,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--f42-gradient-brand)',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 460
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    white: true,
    height: 26
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.6)'
    }
  }, "Ad ops at scale"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 800,
      color: '#fff',
      margin: '14px 0 0',
      letterSpacing: '-0.02em',
      lineHeight: 1.1
    }
  }, "One workspace for every campaign you run.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.66)'
    }
  }, "Trusted by ad ops teams at scale.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--text-heading)',
      margin: '0 0 6px',
      letterSpacing: '-0.01em'
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      margin: '0 0 24px'
    }
  }, "Sign in to your Factor42 workspace."), /*#__PURE__*/React.createElement("label", {
    style: lblStyle
  }, "Work email"), /*#__PURE__*/React.createElement(Input, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 16
    }),
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "you@company.com",
    style: {
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: lblStyle
  }, "Password"), /*#__PURE__*/React.createElement(Input, {
    type: "password",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 16
    }),
    value: pw,
    onChange: e => setPw(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    style: {
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16,
      color: "#fff"
    }),
    onClick: onSignIn,
    style: {
      width: '100%'
    }
  }, "Sign in"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 18,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-muted)',
      textDecoration: 'none'
    },
    onClick: e => {
      e.preventDefault();
      onBack && onBack();
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--color-link)',
      fontWeight: 600,
      textDecoration: 'none'
    }
  }, "Forgot password?")))));
}
const lblStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-heading)',
  marginBottom: 7
};
Object.assign(window, {
  LoginScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/platform/kit.jsx
try { (() => {
/* global React */
// Shared helpers for the Factor42 platform UI kit.

// Lucide icon helper — renders a stroke icon from the CDN sprite.
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = '';
    const el = document.createElement('i');
    el.setAttribute('data-lucide', name);
    ref.current.appendChild(el);
    window.lucide.createIcons({
      attrs: {
        width: size,
        height: size,
        stroke: color,
        'stroke-width': 1.9
      }
    });
  }, [name, size, color]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      color,
      ...style
    }
  });
}

// Full-page grid texture background.
function GridBg({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: `
        linear-gradient(var(--grid-line) 1px, transparent 1px) 0 0 / var(--grid-size) var(--grid-size),
        linear-gradient(90deg, var(--grid-line) 1px, transparent 1px) 0 0 / var(--grid-size) var(--grid-size),
        var(--f42-bg)`,
      ...style
    }
  }, children);
}

// Wordmark built from the brand asset path (relative to ui_kits/platform/).
function Wordmark({
  white = false,
  height = 26
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: white ? '../../assets/logo-white.svg' : '../../assets/logo.svg',
    alt: "Factor42",
    style: {
      height,
      display: 'block'
    }
  });
}
function IconMark({
  size = 32
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-icon.svg",
    alt: "Factor42",
    style: {
      width: size,
      height: size,
      display: 'block'
    }
  });
}
Object.assign(window, {
  Icon,
  GridBg,
  Wordmark,
  IconMark
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/kit.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

})();
