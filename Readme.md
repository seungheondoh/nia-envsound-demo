# nia-envsound-demo

이 레파지토리는 가상 및 현실 환경음 검색을 위한 데모 사이트입니다. 

audio semantic은 kaist의 music and audio computing lab에서 학습한 PASST 모델을 backbone으로 학습한 encoder로 추출하며, 
추가적인 zeroshot retrieval을 한국어 SentenceBERT을 활용하여 검색의 사용성을 높였습니다. 자세한 내용은 Reference를 참고하시길 바랍니다.

### 0. Requirement

- Docker
- node --version v18.12.1
- npm --version 8.19.2
- python 3.7 + FLASK


### 1. Start backend

```
cd backend
pip install -r requirements.txt
python query_to_meta.py --port {BackendPort}
```

### 2. frontend (Serving with Docker)

```
cd frontend
npm install
npm run build
sudo docker build -t nginx-react:0.1 .
sudo docker run -d --name my-react-app -p 61002:80 nginx-react:0.1
```

### Reference
- audio semantic model: https://github.com/doochi/nia121_extractor
- text semantic model: https://huggingface.co/jhgan/ko-sbert-sts
