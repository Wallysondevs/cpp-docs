# std::is_void

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)` | | (desde C++11)

```c
template< class T >
struct is_void;
```

`std::is_void` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo `void`. Fornece a constante membro `value` que é igual a `true` se `T` for o tipo `void`, `const void`, `volatile void`, ou `const volatile void`. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_void` ou `std::is_void_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_void_v = is_void<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for o tipo `void` (possivelmente cv-qualificado), `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    template<class T>
    struct is_void : std::is_same<void, typename std::remove_cv<T>::type> {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    void foo();
    
    static_assert
    (
        std::is_void_v<void> == true and
        std::is_void_v<const void> == true and
        std::is_void_v<volatile void> == true and
        std::is_void_v<void*> == false and
        std::is_void_v<int> == false and
        std::is_void_v<decltype(foo)> == false and
        std::is_void_v<std::is_void<void>> == false
    );
    
    int main() {}
```

### Veja também

[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(modelo de classe)
[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo ponteiro
(modelo de classe)
[ is_enum](<#/doc/types/is_enum>)(C++11) | verifica se um tipo é um tipo de enumeração
(modelo de classe)
[ is_union](<#/doc/types/is_union>)(C++11) | verifica se um tipo é um tipo union
(modelo de classe)
[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-union
(modelo de classe)
[ is_function](<#/doc/types/is_function>)(C++11) | verifica se um tipo é um tipo de função
(modelo de classe)
[ is_object](<#/doc/types/is_object>)(C++11) | verifica se um tipo é um tipo de objeto
(modelo de classe)