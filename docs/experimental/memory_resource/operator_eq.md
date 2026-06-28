# operator==, operator!= (std::experimental::pmr::memory_resource)

bool operator==( const memory_resource& a, const memory_resource& b ) noexcept; |  (1)  |  (library fundamentals TS)  
---|---|---
bool operator!=( const memory_resource& a, const memory_resource& b ) noexcept; |  (2)  |  (library fundamentals TS)  

  
Compara os `memory_resource`s a e b quanto à igualdade. Dois `memory_resource`s são considerados iguais se e somente se a memória alocada de um `memory_resource` puder ser desalocada pelo outro e vice-versa. 

### Valor de retorno

1) &a == &b || a.is_equal(b)

2) !(a == b)

### Veja também

[ is_equal](<#/doc/experimental/memory_resource/is_equal>) |  compara quanto à igualdade com outro `memory_resource`   
(função membro pública)  