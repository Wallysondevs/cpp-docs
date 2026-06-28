# std::experimental::ranges::DerivedFrom

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T, class U >
concept bool DerivedFrom =
std::is_base_of<U, T>::value &&
std::is_convertible<std::remove_cv_t<T>*, std::remove_cv_t<U>*>::value;
```

  
O concept DerivedFrom<T, U> é satisfeito se e somente se `U` é um tipo de classe que é `T` ou uma base pública e não ambígua de `T`. 

Apesar do uso de [std::is_base_of](<#/doc/types/is_base_of>) e [std::is_convertible](<#/doc/types/is_convertible>) em sua descrição acima, `DerivedFrom` não é obrigado a usá-los em sua implementação. Assim, não é necessário que haja qualquer relação de subsunção entre DerivedFrom<T, U> e [std::is_base_of](<#/doc/types/is_base_of>)<U,T>::value ou [std::is_convertible](<#/doc/types/is_convertible>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;*, [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;U&gt;*>::value. 

### Ver também

[ is_base_of](<#/doc/types/is_base_of>)(C++11) |  verifica se um tipo é base do outro tipo   
(modelo de classe)  
[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) |  verifica se um tipo pode ser convertido para o outro tipo   
(modelo de classe)