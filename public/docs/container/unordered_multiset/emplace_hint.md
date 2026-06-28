# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::emplace_hint

```cpp
template< class... Args >
iterator emplace_hint( const_iterator hint, Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container, usando `hint` como uma sugestão de onde o elemento deve ser colocado.

Os construtores da chave e do valor mapeado são chamados com exatamente os mesmos argumentos fornecidos à função, encaminhados com [`std::forward`](<#/doc/utility/forward>)&lt;Args&gt;(args)....

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_multiset/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_multiset/bucket_count>), um rehashing ocorre.
Se um rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados.

### Parâmetros

hint  |  \-  |  iterator, usado como uma sugestão de onde inserir o novo elemento   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterator para o elemento inserido.

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)).

### Complexidade

Constante amortizada em média, no pior caso linear no tamanho do container.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ emplace](<#/doc/container/unordered_multiset/emplace>) | constrói o elemento no local   
(função membro pública)  
[ insert](<#/doc/container/unordered_multiset/insert>) | insere elementos ou nós (desde C++17)   
(função membro pública)