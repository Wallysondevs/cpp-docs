# std::function&lt;R(Args...)&gt;::assign

```cpp
template< class F, class Alloc >
void assign( F&& f, const Alloc& alloc );  // (desde C++11)
(removido em C++17)
```

  
Inicializa o _target_ com `f`. O `alloc` é usado para alocar memória para quaisquer estruturas de dados internas que a `function` possa usar. 

Equivalente a function([std::allocator_arg](<#/doc/memory/allocator_arg_t>), alloc, [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)).swap(*this);. 

### Parâmetros

f  |  \-  |  função invocável para inicializar o _target_ com   
---|---|---
alloc  |  \-  |  alocador a ser usado para alocar memória para as estruturas de dados internas   
  
### Valor de retorno

(nenhum) 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Veja também

[ operator=](<#/>) |  atribui um novo target   
(função membro pública)  