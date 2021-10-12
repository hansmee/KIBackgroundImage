import torch
from torchvision import models, transforms
from imagenet_classes import labels
from PIL import Image

# OMP: Error #15 방지
import os
os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

model = models.resnet18(pretrained=True)

# transform = transforms.Compose([
#     transforms.Resize(256),
#     transforms.CenterCrop(224),
#     transforms.ToTensor(),
#     transforms.Normalize(
#         mean=[0.485, 0.456, 0.406],
#         std=[0.229, 0.224, 0.225]
#     )
# ])

transform = transforms.Compose([
    transforms.Resize(128),
    transforms.CenterCrop(96),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# img = Image.open('test.jpg')
# img_t = transform(img)
# batch_t = torch.unsqueeze(img_t, 0)

# model.eval()
# out = model(batch_t)

# _, indices = torch.sort(out, descending=True)
# percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
# res = [(labels[idx.item()], percentage[idx.item()].item())
#        for idx in indices[0][:5]]
# print(res)
# [('lakeside, lakeshore', 34.08056640625), ('pier', 8.963011741638184), ('dock, dockage, docking facility', 6.874362945556641), ('volcano', 5.187458038330078), ('boathouse', 5.079440116882324)]


def get_result(filename):
    img = Image.open(filename)
    img_t = transform(img)
    batch_t = torch.unsqueeze(img_t, 0)

    model.eval()
    out = model(batch_t)

    _, indices = torch.sort(out, descending=True)
    percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    res = [(labels[idx.item()], percentage[idx.item()].item())
           for idx in indices[0][:5]]
    print(filename)
    print(res)


for idx in range(1, 8):
    get_result(f'test_imgs/test{idx}.jpg')
