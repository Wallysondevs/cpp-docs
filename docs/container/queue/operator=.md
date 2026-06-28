# std::queue&lt;T,Container&gt;::operator=

```cpp
queue& operator=( const queue& other ); |  (1)  |  (declarado implicitamente)
queue& operator=( queue&& other );  // (2) (desde C++11)
(declarado implicitamente)
```

  
Substitui o conteúdo do adaptador de container pelo conteúdo do argumento fornecido.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de other. Efetivamente chama c = other.c;.

2) Operador de atribuição por movimento. Substitui o conteúdo pelo de other usando move semantics. Efetivamente chama c = std::move(other.c);.

### Parâmetros

other  |  \-  |  outro adaptador de container a ser usado como fonte   
  
### Valor de retorno

*this

### Complexidade

1,2) Equivalente à do operator= do container subjacente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (constructor)](<#/doc/container/queue/queue>) |  constrói a `queue`   
(função membro pública)  