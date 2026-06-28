# std::remove_cvref

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`

```cpp
template< class T >
struct remove_cvref;  // (desde C++20)
```

Se o tipo `T` for um tipo de referência, fornece o typedef de membro `type` que é o tipo referenciado por `T` com seus qualificadores cv de nível superior removidos. Caso contrário, `type` é `T` com seus qualificadores cv de nível superior removidos.

Se o programa adicionar especializações para `std::remove_cvref`, o comportamento é indefinido.

### Tipos de membro

Nome | Definição
---|---
`type` | o tipo referenciado por `T` ou o próprio `T` se não for uma referência, com qualificadores cv de nível superior removidos

### Tipos auxiliares

```cpp
template< class T >
using remove_cvref_t = remove_cvref<T>::type;  // (desde C++20)
```

### Implementação possível
```cpp
    template<class T>
    struct remove_cvref
    {
        using type = std::remove_cv_t<std::remove_reference_t<T>>;
    };
```

---

### Observações

[Macro de teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_remove_cvref`](<#/doc/feature_test>) | [`201711L`](<#/>) | (C++20) | `std::remove_cvref`

### Exemplo

Execute este código
```cpp
    #include <type_traits>
     
    int main()
    {
        static_assert(std::is_same_v<std::remove_cvref_t<int>, int>);
        static_assert(std::is_same_v<std::remove_cvref_t<int&>, int>);
        static_assert(std::is_same_v<std::remove_cvref_t<int&&>, int>);
        static_assert(std::is_same_v<std::remove_cvref_t<const int&>, int>);
        static_assert(std::is_same_v<std::remove_cvref_t<const int[2]>, int[2]>);
        static_assert(std::is_same_v<std::remove_cvref_t<const int(&)[2]>, int[2]>);
        static_assert(std::is_same_v<std::remove_cvref_t<int(int)>, int(int)>);
    }
```

### Veja também

[ remove_cvremove_constremove_volatile](<#/doc/types/remove_cv>)(C++11)(C++11)(C++11) | remove os especificadores const e/ou volatile do tipo fornecido
(modelo de classe)
[ remove_reference](<#/doc/types/remove_reference>)(C++11) | remove uma referência do tipo fornecido
(modelo de classe)
[ decay](<#/doc/types/decay>)(C++11) | aplica transformações de tipo como ao passar um argumento de função por valor
(modelo de classe)