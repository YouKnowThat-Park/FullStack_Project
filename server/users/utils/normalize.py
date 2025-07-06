def normalize_phone_number(phone: str) -> str:
    return ''.join(filter(str.isdigit, phone))
    # 문자열에서 숫자만 걸러내서 문자열로 반환

def normalize_name(name: str) -> str:
    name = name.strip()
    if not name:
        raise ValueError("이름에 빈 공백만 입력할 수 없습니다.")
    return name
    # strip : 양쪽 끝 공백 제거