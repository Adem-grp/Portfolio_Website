"""Run the portfolio backend and frontend development server together.

Usage:
    python main.py
    python main.py --backend-only
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parent
FRONTEND_DIR = ROOT / "frontend"
BACKEND_PYTHON = (
    ROOT
    / "backend"
    / ".venv"
    / ("Scripts" if os.name == "nt" else "bin")
    / ("python.exe" if os.name == "nt" else "python")
)


def command_exists(command: str) -> bool:
    try:
        subprocess.run(
            [command, "--version"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
    except OSError:
        return False
    return True


def frontend_command() -> list[str]:
    npm = "npm.cmd" if os.name == "nt" else "npm"
    return [npm, "run", "dev", "--", "--host", "localhost"]


def terminate_process(process: subprocess.Popen[object], name: str) -> None:
    if process.poll() is None:
        print(f"Stopping {name}...")
        process.terminate()
        try:
            process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the portfolio development services.")
    parser.add_argument("--backend-only", action="store_true", help="Run only the FastAPI backend.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if not (ROOT / "backend" / ".env").exists():
        print("Missing backend/.env. Create it using the example in README.md.", file=sys.stderr)
        return 1

    python = str(BACKEND_PYTHON) if BACKEND_PYTHON.exists() else sys.executable
    backend = subprocess.Popen([python, "-m", "backend.main"], cwd=ROOT)
    frontend = None

    try:
        if not args.backend_only:
            if not (FRONTEND_DIR / "node_modules").exists():
                print(
                    "Frontend dependencies are missing. Run `cd frontend; npm install`, "
                    "or use `python main.py --backend-only`.",
                    file=sys.stderr,
                )
                terminate_process(backend, "backend")
                return 1
            if not command_exists("npm.cmd" if os.name == "nt" else "npm"):
                print("npm is not available on PATH. Use --backend-only or install Node.js.", file=sys.stderr)
                terminate_process(backend, "backend")
                return 1
            frontend = subprocess.Popen(frontend_command(), cwd=FRONTEND_DIR)

        services = "backend" if args.backend_only else "backend and frontend"
        print(f"Portfolio {services} running. Press Ctrl+C to stop.", flush=True)
        print("Backend API: http://localhost:8000/docs", flush=True)
        if frontend is not None:
            print("Portfolio UI: http://localhost:5173", flush=True)

        return_code = 0
        while True:
            if backend.poll() is not None:
                return_code = backend.returncode or 1
                print(f"Backend stopped with exit code {return_code}.")
                break
            if frontend is not None and frontend.poll() is not None:
                return_code = frontend.returncode or 1
                print(f"Frontend stopped with exit code {return_code}.")
                break
            time.sleep(0.25)
    except (KeyboardInterrupt, SystemExit):
        pass
    finally:
        if frontend is not None:
            terminate_process(frontend, "frontend")
        terminate_process(backend, "backend")

    return return_code


if __name__ == "__main__":
    raise SystemExit(main())
