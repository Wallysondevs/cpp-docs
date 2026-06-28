# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::emplace_hint

```cpp
template< class... Args >
iterator emplace_hint( const_iterator hint, Args&&... args );  // (desde C++23)
```

  
Insere um novo elemento no container o mais próximo possível da posição imediatamente anterior a `hint`.

O construtor do tipo do elemento (`value_type`, ou seja, [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;) é chamado com exatamente os mesmos argumentos fornecidos à função, encaminhados com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

| As informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parâmetros

hint  |  \-  |  iterador para a posição antes da qual o novo elemento será inserido   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterador para o elemento inserido.

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)).

### Complexidade

| Esta seção está incompleta   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ emplace](<#/doc/container/flat_multimap/emplace>) |  constrói o elemento no local   
(função membro pública)  
[ insert](<#/doc/container/flat_multimap/insert>) |  insere elementos   
(função membro pública)