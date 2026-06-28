# std::ranges::chunk_by_view&lt;V,Pred&gt;::begin

```cpp
constexpr /*iterator*/ begin();  // (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/chunk_by_view/iterator>) para o primeiro elemento da [`chunk_by_view`](<#/doc/ranges/chunk_by_view>). 

Equivalente a: 
```cpp
    ranges::iterator_t<V> iter;
    
    if (begin_.has_value())
        iter = begin_.value();
    else
    {
        iter = /*find_next*/(ranges::begin(base()));
        begin_ = iter; // caching
    }
    
    return /*iterator*/(*this, ranges::begin(base()), iter);
```

O comportamento é indefinido se o predicado subjacente `_[pred_](<#/doc/ranges/chunk_by_view>)_` não contiver um valor. 

### Parâmetros

(nenhum) 

### Valor de retorno

[Iterator](<#/doc/ranges/chunk_by_view/iterator>) para o primeiro elemento. 

### Observações

A fim de fornecer a complexidade de tempo constante amortizada exigida pelo concept [`range`](<#/doc/ranges/range>), esta função armazena em cache o resultado dentro do membro de dados `_[begin_](<#/doc/ranges/chunk_by_view>)_` para uso em chamadas subsequentes. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ end](<#/doc/ranges/chunk_by_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)