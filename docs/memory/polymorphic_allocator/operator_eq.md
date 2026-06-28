# std::pmr::operator==, std::pmr::operator!=

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
template< class T1, class T2 >
bool operator==( const std::pmr::polymorphic_allocator<T1>& lhs,
const std::pmr::polymorphic_allocator<T2>& rhs ) noexcept;
friend bool operator==( const polymorphic_allocator& lhs,
const polymorphic_allocator& rhs ) noexcept;
template< class T1, class T2 >
bool operator!=( const std::pmr::polymorphic_allocator<T1>& lhs,
const std::pmr::polymorphic_allocator<T2>& rhs ) noexcept;
(até C++20)
friend bool operator!=( const polymorphic_allocator& lhs,
const polymorphic_allocator& rhs ) noexcept;
(até C++20)
```

  
Compara dois allocators polimórficos. Dois allocators polimórficos são considerados iguais se seus recursos de memória subjacentes forem iguais.

1) Retorna *lhs.resource() == *rhs.resource().

2) O mesmo que (1), permitindo a conversão para `polymorphic_allocator`.  
Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando std::pmr::polymorphic_allocator é uma classe associada dos argumentos.

3) Retorna !(lhs == rhs).

4) O mesmo que (3), permitindo a conversão para `polymorphic_allocator`.  
Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando std::pmr::polymorphic_allocator é uma classe associada dos argumentos.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

lhs, rhs  |  \-  |  allocators polimórficos para comparar   
  
### Valor de retorno

1,2) *lhs.resource() == *rhs.resource()

3,4) !(lhs == rhs)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3683](<https://cplusplus.github.io/LWG/issue3683>) | C++17  | `polymorphic_allocator` não podia ser comparado com tipos conversíveis a ele  | sobrecarga adicionada