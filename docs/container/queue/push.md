# std::queue&lt;T,Container&gt;::push

```cpp
void push( const value_type& value );  // (1)
void push( value_type&& value );  // (2) (desde C++11)
```

  
Adiciona o valor do elemento fornecido ao final da fila.

1) Equivalente a: c.push_back(value).

2) Equivalente a: c.push_back(std::move(value)).

### Parâmetros

value  |  \-  |  o valor do elemento a ser adicionado   
  
### Valor de retorno

(nenhum) 

### Complexidade

Igual à complexidade de Container::push_back. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ emplace](<#/doc/container/queue/emplace>)(C++11) |  constrói o elemento no local no final   
(função membro pública)  
[ pop](<#/doc/container/queue/pop>) |  remove o primeiro elemento   
(função membro pública)