from db import get_db_path, init_db


def main() -> None:
    init_db()
    print(f"Database initialized at: {get_db_path()}")


if __name__ == "__main__":
    main()
