# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::emplace

```cpp
template< class... Args >
iterator emplace( Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container, construído in-place com os `args` fornecidos. 

O construtor do novo elemento é chamado com exatamente os mesmos argumentos fornecidos a `emplace`, encaminhados via [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... 

O uso cuidadoso de `emplace` permite que o novo elemento seja construído, evitando operações de cópia ou move desnecessárias. 

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_multiset/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_multiset/bucket_count>), um rehashing ocorre.  
Se um rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados. 

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterator para o elemento inserido. 

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Complexidade

Constante amortizada em média, no pior caso linear no tamanho do container. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ emplace_hint](<#/doc/container/unordered_multiset/emplace_hint>) |  constrói elementos in-place usando uma dica   
(função membro pública)  
[ insert](<#/doc/container/unordered_multiset/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)