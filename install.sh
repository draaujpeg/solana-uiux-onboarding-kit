#!/bin/bash
#
# Solana UI/UX Onboarding Kit installer.
#
# Installs the skill for any agent that reads Agent Skills from .agents/skills or
# .claude/skills: Claude Code, Codex, Copilot, Gemini CLI, Cursor, Windsurf,
# Cline, OpenCode, and others.
#
#   ./install.sh                 install for the current user
#   ./install.sh --project       install into this project only
#   ./install.sh --path <dir>    install to one custom directory
#   ./install.sh --link          symlink instead of copying, so git pull updates it
#
# Or, without cloning:
#
#   npx skills add draaujpeg/solana-uiux-onboarding-kit

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_NAME="solana-onboarding"
SOURCE_DIR="$SCRIPT_DIR/skills/$SKILL_NAME"

SCOPE="user"
CUSTOM_PATH=""
LINK=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --project)
            SCOPE="project"
            shift
            ;;
        --path)
            if [ -z "$2" ]; then
                echo "Error: --path needs a directory"
                exit 1
            fi
            SCOPE="custom"
            CUSTOM_PATH="$2"
            shift 2
            ;;
        --link)
            LINK=true
            shift
            ;;
        -h|--help)
            cat <<'USAGE'
Solana UI/UX Onboarding Kit installer

Usage: ./install.sh [OPTIONS]

Options:
  --project     Install into the current project (.agents/skills and .claude/skills)
  --path PATH   Install to a single custom directory
  --link        Symlink instead of copying, so a git pull updates the skill
  -h, --help    Show this message

Default is to install for the current user:
  ~/.agents/skills/solana-onboarding   Codex, Copilot, Gemini CLI, Cursor, Windsurf, OpenCode
  ~/.claude/skills/solana-onboarding   Claude Code, Cline, and compatible readers
USAGE
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage."
            exit 1
            ;;
    esac
done

if [ ! -f "$SOURCE_DIR/SKILL.md" ]; then
    echo "Error: no SKILL.md in '$SOURCE_DIR'."
    echo "Run this from a clone of the repository."
    exit 1
fi

case $SCOPE in
    user)    TARGETS=("$HOME/.agents/skills/$SKILL_NAME" "$HOME/.claude/skills/$SKILL_NAME") ;;
    project) TARGETS=(".agents/skills/$SKILL_NAME" ".claude/skills/$SKILL_NAME") ;;
    custom)  TARGETS=("$CUSTOM_PATH") ;;
esac

install_to() {
    local dest="$1"
    mkdir -p "$(dirname "$dest")"

    if [ -e "$dest" ] || [ -L "$dest" ]; then
        # Interactive runs ask. Piped ones, which is how `curl | bash` and CI
        # reach this, would otherwise hang forever waiting on a closed stdin.
        if [ -t 0 ]; then
            read -p "'$dest' exists. Overwrite? (y/N) " -n 1 -r </dev/tty 2>/dev/null || REPLY=""
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "Skipped $dest"
                return
            fi
        else
            echo "'$dest' exists, overwriting (non-interactive)"
        fi
        rm -rf "$dest"
    fi

    if [ "$LINK" = true ]; then
        ln -s "$SOURCE_DIR" "$dest"
        echo "Linked:    $dest -> $SOURCE_DIR"
    else
        cp -r "$SOURCE_DIR" "$dest"
        echo "Installed: $dest"
    fi
}

echo "Installing the Solana onboarding skill..."
echo ""
for target in "${TARGETS[@]}"; do
    install_to "$target"
done

echo ""
if [ "$SCOPE" = "custom" ]; then
    echo "Done. Make sure '$CUSTOM_PATH' is a directory your agent scans for skills."
else
    echo "Done. Agents reading these directories pick the skill up automatically:"
    echo "  .agents/skills   Codex, Copilot, Gemini CLI, Cursor, Windsurf, OpenCode"
    echo "  .claude/skills   Claude Code, Cline, and compatible readers"
fi
echo ""
echo "To use it, describe an onboarding screen, paste an error your product shows,"
echo "or ask your agent to review the entry flow of the project you are in."
