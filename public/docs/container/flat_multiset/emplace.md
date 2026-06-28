# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::emplace

```cpp
template< class... Args >
iterator emplace( Args&&... args );  // (desde C++23)
```

  
Insere um novo elemento no container, construído in-place com os `args` fornecidos. 

Primeiro, inicializa um objeto `t` do tipo [`value_type`](<#/doc/container/flat_multiset>) com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)..., então insere `t` como se fosse por 
```cpp
    auto it = ranges::upper_bound(c, t, compare);
    c.insert(it, std::move(t));
```

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<value_type, Args...> for `true`. 

O uso cuidadoso de `emplace` permite que o novo elemento seja construído, evitando operações de cópia ou movimentação desnecessárias. 

| Informações sobre a invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parameters

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Return value

Um iterator para o elemento inserido. 

### Exceptions

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Complexity

Logarítmica no tamanho do container. 

### Example

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### See also

[ emplace_hint](<#/doc/container/flat_multiset/emplace_hint>) |  constrói elementos in-place usando uma dica   
(função membro pública)  
[ insert](<#/doc/container/flat_multiset/insert>) |  insere elementos   
(função membro pública)