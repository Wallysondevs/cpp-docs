# std::flat_set&lt;Key,Compare,KeyContainer&gt;::emplace

```cpp
template< class... Args >
std::pair<iterator, bool> emplace( Args&&... args );  // (desde C++23)
```

  
Insere um novo elemento no container, construído no local com os `args` fornecidos, se não houver um elemento com a chave no container. 

Primeiro, inicializa um objeto `t` do tipo [`value_type`](<#/doc/container/flat_set>) com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)..., então insere `t` como se fosse por 
```
    auto it = ranges::upper_bound(c, t, compare);
    c.insert(it, std::move(t));
```

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<value_type, Args...> for `true`. 

O uso cuidadoso de `emplace` permite que o novo elemento seja construído, evitando operações de cópia ou movimentação desnecessárias. 

| As informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um `pair` consistindo de um `iterator` para o elemento inserido (ou para o elemento que impediu a inserção) e um valor `bool` definido como `true` se e somente se a inserção ocorreu. 

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Complexidade

Logarítmica no tamanho do container. 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ emplace_hint](<#/doc/container/flat_set/emplace_hint>) |  constrói elementos no local usando uma dica   
(função membro pública)  
[ insert](<#/doc/container/flat_set/insert>) |  insere elementos   
(função membro pública)