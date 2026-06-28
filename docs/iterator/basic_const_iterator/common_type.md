# std::common_type&lt;std::basic_const_iterator&gt;

Definido no header `[<iterator>](<#/doc/header/iterator>)`

```cpp
template< class T, std::common_with<T> U >
requires std::input_iterator<std::common_type_t<T, U>>
struct common_type<std::basic_const_iterator<T>, U>;  // (1) (desde C++23)
template< class T, std::common_with<T> U >
requires std::input_iterator<std::common_type_t<T, U>>
struct common_type<U, std::basic_const_iterator<T>>;  // (2) (desde C++23)
template< class T, std::common_with<T> U >
requires std::input_iterator<std::common_type_t<T, U>>
struct common_type<std::basic_const_iterator<T>,
std::basic_const_iterator<U>>;  // (3) (desde C++23)
```

  
O tipo comum de dois `basic_const_iterator`s ou de um `basic_const_iterator` e outro tipo de iterator é um `basic_const_iterator` do tipo subjacente comum.

O tipo comum é definido apenas se T e U compartilharem um tipo comum que modela [`input_iterator`](<#/doc/iterator/input_iterator>).

### Tipos de membros

Tipo de membro  |  Definição   
---|---
`type` |  [std::basic_const_iterator](<#/doc/iterator/basic_const_iterator>)<[std::common_type_t](<#/doc/types/common_type>)<T, U>> ([1-3](<#/doc/iterator/basic_const_iterator/common_type>))  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ common_type](<#/doc/types/common_type>)(C++11) |  determina o tipo comum de um grupo de tipos   
(modelo de classe)  