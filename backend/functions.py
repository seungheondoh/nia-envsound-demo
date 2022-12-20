import os
import random
import torch
import pandas as pd

def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0] #First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

def encode_fn(query, tokenizer, model):    
    # Tokenize sentences
    encoded_input = tokenizer(query, padding=True, truncation=True, return_tensors='pt')
    # Compute token embeddings
    with torch.no_grad():
        model_output = model(**encoded_input)
    sentence_embeddings = mean_pooling(model_output, encoded_input['attention_mask'])
    return sentence_embeddings.squeeze(0)

def retrieval(query, tokenizer, model, all_items, item_embs, item_index):
    query_embs = [encode_fn(query, tokenizer, model)]
    items = torch.stack(query_embs + item_embs)
    items = torch.nn.functional.normalize(items, dim=1)
    logits = items @ items.T
    df = pd.Series(logits[0,1:].detach().cpu().numpy(), index=item_index)
    ret_tags = df.sort_values(ascending=False).head(3)
    ret_tags = list(ret_tags.index)
    ret_items = []
    for tag in ret_tags:
        item_pool = all_items[all_items == tag]
        ret_items.extend(random.sample(list(item_pool.index), 4))
    return ret_items, ret_tags