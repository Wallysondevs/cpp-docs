# std::priority_queue&lt;T,Container,Compare&gt;::operator=

```cpp
priority_queue& operator=( const priority_queue& other ); |  (1)  |  (declarado implicitamente)
priority_queue& operator=( priority_queue&& other );  // (2) (desde C++11)
(declarado implicitamente)
```

  
Substitui o conteúdo do adaptador de container com o conteúdo do argumento fornecido.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de other. Efetivamente chama c = other.c; comp = other.comp;.

2) Operador de atribuição por movimento. Substitui o conteúdo pelos de other usando move semantics. Efetivamente chama c = std::move(other.c); comp = std::move(other.comp);.

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

[ (construtor)](<#/doc/container/priority_queue/priority_queue>) |  constrói a `priority_queue`   
(função membro pública)  