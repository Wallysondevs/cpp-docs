# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::emplace

```cpp
template< class... Args >
std::pair<iterator, bool> emplace( Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container, construído in-place com os `args` fornecidos, se não houver um elemento com a chave no container.

O construtor do novo elemento é chamado com exatamente os mesmos argumentos fornecidos a `emplace`, encaminhados via [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... O elemento pode ser construído mesmo que já exista um elemento com a chave no container, caso em que o elemento recém-construído será destruído imediatamente.

O uso cuidadoso de `emplace` permite que o novo elemento seja construído, evitando operações de cópia ou move desnecessárias.

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_set/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_set/bucket_count>), um rehashing ocorre. Se o rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados.

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um `pair` consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor booleano definido como `true` se e somente se a inserção ocorreu.

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)).

### Complexidade

Constante amortizada em média, caso pior linear no tamanho do container.

### Example

| Esta seção está incompleta  
Motivo: nenhum exemplo   
  
### Veja também

[ emplace_hint](<#/doc/container/unordered_set/emplace_hint>) |  constrói elementos in-place usando uma dica   
(função membro pública)  
[ insert](<#/doc/container/unordered_set/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)