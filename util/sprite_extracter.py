import plistlib
from PIL import Image
import os

def parse_tuple(s: str) -> tuple:
    return tuple(map(lambda a: int(float(a)), s.strip('{}').split(',')))

def parse_rect(s: str) -> tuple:
    parts = s.strip('{}').split('},{')
    x, y = map(lambda a: int(float(a)), parts[0].split(','))
    w, h = map(lambda a: int(float(a)), parts[1].split(','))
    return (x, y, w, h)

def extract_sprites(plist_path: str, spritesheet_path: str, output_dir: str):
    with open(plist_path, 'rb') as f:
        plist_data = plistlib.load(f)

    frames = plist_data['frames']
    spritesheet = Image.open(spritesheet_path).convert('RGBA')

    os.makedirs(output_dir, exist_ok=True)

    for frame_name, data in frames.items():

        # 각 속성 파싱
        texture_rect = parse_rect(data['textureRect'])
        source_size = parse_tuple(data['spriteSourceSize'])
        offset = parse_tuple(data['spriteOffset'])

        rotated = data.get('textureRotated', False)

        x, y, w, h = texture_rect

        # 회전돼있을 경우 width/height swap
        if rotated:
            w, h = h, w

        # 크롭
        cropped = spritesheet.crop((x, y, x + w, y + h))

        # 회전돼있을 경우 오른쪽으로 90도 회전
        if rotated:
            cropped = cropped.rotate(90, expand=True)

        # 출력 이미지 만들기
        output_image = Image.new('RGBA', source_size, (0, 0, 0, 0))

        # 오프셋 보정
        paste_x = int((source_size[0] - cropped.width) / 2 + offset[0])
        paste_y = int((source_size[1] - cropped.height) / 2 - offset[1])

        # 붙이기
        output_image.paste(cropped, (paste_x, paste_y), cropped)

        # 저장
        output_path = os.path.join(output_dir, frame_name)
        output_image.save(output_path)
        print(f"✅ {frame_name} 저장 완료")

if __name__ == '__main__':
    extract_sprites(
        plist_path='./util/ch81x2.plist',
        spritesheet_path='./util/ch81x2.png',
        output_dir='./util/results'
    )
