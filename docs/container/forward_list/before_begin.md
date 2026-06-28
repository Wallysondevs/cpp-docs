# std::forward_list&lt;T,Allocator&gt;::before_begin, cbefore_begin

```cpp
iterator before_begin() noexcept;  // (desde C++11)
const_iterator before_begin() const noexcept;  // (desde C++11)
const_iterator cbefore_begin() const noexcept;  // (desde C++11)
```

  
Retorna um iterator para o elemento antes do primeiro elemento do container. Este elemento atua como um placeholder, tentar acessá-lo resulta em comportamento indefinido. Os únicos casos de uso são nas funções [insert_after()](<#/doc/container/forward_list/insert_after>), [emplace_after()](<#/doc/container/forward_list/emplace_after>), [erase_after()](<#/doc/container/forward_list/erase_after>), [splice_after()](<#/doc/container/forward_list/splice_after>) e no operador de incremento: incrementar o iterator `before-begin` resulta exatamente no mesmo iterator obtido de [begin()](<#/doc/container/forward_list/begin>)/[cbegin()](<#/doc/container/forward_list/begin>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o elemento antes do primeiro elemento. 

### Complexidade

Constante. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ begincbegin](<#/doc/container/forward_list/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/container/forward_list/end>) |  retorna um iterator para o fim   
(função membro pública)