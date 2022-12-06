# nia-envsound-demo

이 레파지토리는 가상 및 현실 환경음 검색을 위한 데모 사이트입니다. 

audio semantic은 kaist의 music and audio computing lab에서 학습한 PASST 모델을 backbone으로 학습한 encoder로 추출하며, 
추가적인 zeroshot retrieval을 한국어 SentenceBERT을 활용하여 검색의 사용성을 높였습니다. 자세한 내용은 Reference를 참고하시길 바랍니다.

### backend

### frontend
- npx create-react-app frontend

### Install

### Reference
- audio semantic model: https://github.com/doochi/nia121_extractor
- text semantic model: https://huggingface.co/jhgan/ko-sbert-sts
