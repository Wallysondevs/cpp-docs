# std::multimap&lt;Key,T,Compare,Allocator&gt;::emplace_hint

```cpp
template< class... Args >
iterator emplace_hint( const_iterator hint, Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container o mais próximo possível da posição imediatamente anterior a `hint`.

O construtor do tipo do elemento (`value_type`, ou seja, [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;) é chamado com exatamente os mesmos argumentos fornecidos à função, encaminhados com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

Nenhum iterator ou referência é invalidado.

### Parâmetros

hint  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterator para o elemento inserido.

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

Logarítmica no tamanho do container em geral, mas constante amortizada se o novo elemento for inserido imediatamente antes de `hint`.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ emplace](<#/doc/container/multimap/emplace>)(C++11) |  constrói o elemento no local   
(public member function)  
[ insert](<#/doc/container/multimap/insert>) |  insere elementos ou nós(desde C++17)   
(public member function)