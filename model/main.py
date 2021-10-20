import torch
from torchvision import models, transforms
from imagenet_classes import labels
from PIL import Image

import sys
from io import BytesIO
from urllib import request
from collections import defaultdict

# OMP: Error #15 방지
import os
os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

model = models.resnet18(pretrained=True)

transform = transforms.Compose([
    transforms.Resize(128),
    transforms.CenterCrop(96),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

result = defaultdict(int)


def get_result(url):
    res_img = request.urlopen(url).read()
    img = Image.open(BytesIO(res_img))
    img_t = transform(img)
    batch_t = torch.unsqueeze(img_t, 0)

    model.eval()
    out = model(batch_t)

    _, indices = torch.sort(out, descending=True)
    percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100

    for idx in indices[0][:5]:
        label = labels[idx.item()].split(',')[0]
        result[label] += percentage[idx.item()].item()


if __name__ == '__main__':
    urls = sys.argv[1].split()

    for url in urls:
        get_result(url)

    print(max(result.items(), key=lambda x: x[1])[0], end='')
