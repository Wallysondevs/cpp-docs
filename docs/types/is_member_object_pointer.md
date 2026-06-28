# std::is_member_object_pointer

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_member_object_pointer;
```

`std::is_member_object_pointer` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um ponteiro para membro de objeto não estático. Fornece a constante membro `value` que é igual a `true` se `T` for um tipo de ponteiro para membro de objeto não estático. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_member_object_pointer` ou `std::is_member_object_pointer_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_member_object_pointer_v = is_member_object_pointer<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um ponteiro para membro de objeto, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    template<class T>
    struct is_member_object_pointer : std::integral_constant<
                                          bool,
                                          std::is_member_pointer<T>::value &&
                                          !std::is_member_function_pointer<T>::value
                                      > {};
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
     
    int main()
    {
        class C {};
        std::cout << "Is member object pointer?\n" << std::boolalpha
                  << std::is_member_object_pointer_v<int(C::*)>
                  << ": int(C::*)\n"
                  << std::is_member_object_pointer_v<int(C::*)()>
                  << ": int(C::*)()\n";
    }
```

Saída:
```
    Is member object pointer?
    true: int(C::*)
    false: int(C::*)()
```

### Veja também

[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo de ponteiro
(modelo de classe)
[ is_member_pointer](<#/doc/types/is_member_pointer>)(C++11) | verifica se um tipo é um ponteiro para uma função membro não estática ou objeto
(modelo de classe)
[ is_member_function_pointer](<#/doc/types/is_member_function_pointer>)(C++11) | verifica se um tipo é um ponteiro para função membro não estática
(modelo de classe)