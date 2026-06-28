# std::experimental::parallel::is_execution_policy

Definido no header `[<experimental/execution_policy>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/execution_policy&action=edit&redlink=1> "cpp/header/experimental/execution policy \(page does not exist\)")`

```cpp
template< class T >
struct is_execution_policy;
```

  
Verifica se `T` é um tipo de execution policy padrão ou definido pela implementação.

Fornece a constante membro `value` que é igual a true, se `T` for `execution_policy`, `sequential_execution_policy`, `parallel_execution_policy`, `parallel_vector_execution_policy`, ou um tipo de execution policy definido pela implementação. Caso contrário, `value` é igual a false.

O comportamento de um programa que adiciona especializações para `is_execution_policy` é indefinido.

### Parâmetros de template

T  |  \-  |  um tipo a ser verificado   
  
### Template auxiliar 

Definido no header `[<experimental/execution_policy>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/execution_policy&action=edit&redlink=1> "cpp/header/experimental/execution policy \(page does not exist\)")`

```cpp
template< class T >
constexpr bool is_execution_policy_v = is_execution_policy<T>::value;
```

  
## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] |  true se `T` for um tipo de execution policy padrão ou definido pela implementação, false caso contrário   
(constante membro estática pública)  
  
### Funções membro

operator bool |  converte o objeto para bool, retorna value   
(função membro pública)  
operator()(C++14) |  retorna value   
(função membro pública)  
  
### Tipos membro

Tipo  |  Definição   
---|---
`value_type` |  bool  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>