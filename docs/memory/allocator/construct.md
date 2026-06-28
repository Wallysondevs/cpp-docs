# std::allocator&lt;T&gt;::construct

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
void construct( pointer p, const_reference val );
template< class U, class... Args >
void construct( U* p, Args&&... args );
(obsoleto desde C++17)
(removido desde C++20)
```

  
Constrói um objeto do tipo `T` em armazenamento alocado não inicializado apontado por p, usando placement-new global. 

1) Chama ::new((void*)p) T(val).

2) Chama ::new((void*)p) U([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).

### Parâmetros

p  |  \-  |  ponteiro para armazenamento alocado não inicializado   
---|---|---
val  |  \-  |  o valor a ser usado como argumento do construtor de cópia   
args...  |  \-  |  os argumentos do construtor a serem usados   
  
### Valor de retorno

(nenhum) 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 402](<https://cplusplus.github.io/LWG/issue402>) | C++98  | se T::[operator new](<#/doc/memory/new/operator_new>) existir, o programa pode ser malformado  | usa replacement-new global em vez disso   
  
### Ver também

[ construct](<#/>)[static] |  constrói um objeto no armazenamento alocado   
(modelo de função)  
[ construct_at](<#/doc/memory/construct_at>)(C++20) |  cria um objeto em um endereço fornecido   
(modelo de função)  
[ operator newoperator new[]](<#/doc/memory/new/operator_new>) |  funções de alocação   
(função)