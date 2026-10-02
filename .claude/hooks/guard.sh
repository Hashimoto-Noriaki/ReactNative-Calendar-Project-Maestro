#!/bin/bash
INPUT=$(cat)
if command -v jq >/dev/null 2>&1; then
  COMMAND=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null) || exit 2
elif command -v python3 >/dev/null 2>&1; then
  COMMAND=$(printf '%s' "$INPUT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input", {}).get("command", ""))') || exit 2
else
  echo "guard.sh: command parser is unavailable" >&2
  exit 2
fi

if [ -z "$COMMAND" ]; then
  exit 0
fi

# コマンド全体が単一の操作か判定する
# 改行・区切り（; &）・パイプ・コマンド置換・リダイレクトを含む複合コマンドは対象外にする
is_single_command() {
  case "$COMMAND" in
    *$'\n'* | *';'* | *'&'* | *'|'* | *'`'* | *'$('* | *'<'* | *'>'*) return 1 ;;
  esac
  return 0
}

# 安全と判断した gh サブコマンドのみ除外（単一の操作のときだけ）
if is_single_command && [[ "$COMMAND" =~ ^gh\ (pr\ create|pr\ view|issue\ view)([[:space:]]|$) ]]; then
  exit 0
fi

# git commit は除外（単一の操作のときだけ）
if is_single_command && [[ "$COMMAND" =~ ^git\ commit([[:space:]]|$) ]]; then
  exit 0
fi

# 本番環境への直接操作をブロック
if echo "$COMMAND" | grep -q "production"; then
  echo "本番環境への直接操作は禁止されています" >&2
  exit 2
fi

exit 0
