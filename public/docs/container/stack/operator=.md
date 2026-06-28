# std::stack&lt;T,Container&gt;::operator=

```cpp
stack& operator=( const stack& other ); |  (1)  |  (implicitamente declarado)
stack& operator=( stack&& other );  // (2) (desde C++11)
(implicitamente declarado)
```

  
Substitui o conteúdo do adaptador de container com o conteúdo do argumento fornecido.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de `other`. Efetivamente chama `c = other.c;`.

2) Operador de atribuição por movimento. Substitui o conteúdo pelos de `other` usando *move semantics*. Efetivamente chama `c = std::move(other.c);`.

### Parâmetros

other  |  \-  |  outro adaptador de container a ser usado como fonte   
  
### Valor de retorno

`*this`

### Complexidade

1,2) Equivalente à do `operator=` do container subjacente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (construtor)](<#/doc/container/stack/stack>) |  constrói a `stack`   
(função membro pública)  